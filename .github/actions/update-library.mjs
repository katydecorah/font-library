import { exportVariable, setFailed, info } from "@actions/core";
import fetch from "node-fetch";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

async function library() {
  try {
    if (!process.env.GoogleToken) {
      setFailed("GoogleToken is not set.");
      return;
    }
    let commitMessage = [];
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GoogleToken}`
    );
    const libraryApi = await response.json();
    // build list of family names in Google Fonts API
    const fontsApi = libraryApi.items.map(({ family }) => family);

    // get list of families in font library
    let libraryLocal = JSON.parse(readFileSync("families.json", "utf-8"));

    let updateLocal = autoAddToLocal(libraryLocal);
    libraryLocal = updateLocal.local;
    if (updateLocal.commitMessage) {
      commitMessage.push(updateLocal.commitMessage);
    }

    const fontsLocal = Object.keys(libraryLocal);
    // get difference between remote and local libraries
    const familiesToAdd = fontsApi.filter((x) => !fontsLocal.includes(x));
    // get difference between local and remote library
    const familiesToRemove = fontsLocal.filter((x) => !fontsApi.includes(x));

    const { generatedMetadata, generatedFamilies } = combineLibraries(
      libraryApi.items,
      libraryLocal
    );
    const localGeneratedData = readFileSync("components/data.json", "utf-8");

    const hasFamiliesToAdd = familiesToAdd.length > 0;
    const hasFamiliesToRemove = familiesToRemove.length > 0;
    const hasGeneratedDataToUpdate = !arraysEqual(
      generatedFamilies,
      localGeneratedData
    );

    if (
      !hasFamiliesToAdd &&
      !hasFamiliesToRemove &&
      !hasGeneratedDataToUpdate &&
      !updateLocal.updatedLocalLibrary
    ) {
      exportVariable("UpdatedLibrary", false);
      info("Nothing to update.");
      return;
    }

    if (hasFamiliesToAdd) {
      familiesToAdd.map((font) =>
        libraryLocal.push({ family: font, tags: [] })
      );
      const added = `➕ Added: ${familiesToAdd.join(", ")}`;
      commitMessage.push(added);
      info(added);
      exportVariable("UpdatedLibrary", true);
    }

    if (hasFamiliesToRemove) {
      libraryLocal = libraryLocal.filter(
        (f) => !familiesToRemove.includes(f.family)
      );
      const removed = `✂️ Removed: ${familiesToRemove.join(", ")}`;
      commitMessage.push(removed);
      info(removed);
      exportVariable("UpdatedLibrary", true);
    }

    if (hasGeneratedDataToUpdate) {
      writeFileSync("components/data.json", generatedFamilies, "utf-8");
      writeFileSync(
        "_data/metadata.json",
        JSON.stringify(generatedMetadata, null, 2),
        "utf-8"
      );
      const updated = "📝 Updated generated data";
      commitMessage.push(updated);
      info(updated);
      exportVariable("UpdatedLibrary", true);
      execSync("npx prettier --write components/data.json _data/metadata.json");
    }

    if (hasFamiliesToAdd || hasFamiliesToRemove || updateLocal.commitMessage) {
      writeFileSync(
        "families.json",
        JSON.stringify(
          libraryLocal.sort((a, b) => (a.family > b.family ? 1 : -1))
        ),
        "utf-8"
      );
      // run prettier CLI on families.json
      execSync("npx prettier --write families.json");
    }

    exportVariable("LibraryCommitMessage", commitMessage.join("; "));
  } catch (error) {
    setFailed(error);
  }
}

function arraysEqual(a1, a2) {
  a1 = a1.replace(/\s/g, "");
  a2 = a2.replace(/\s/g, "");

  return JSON.stringify(a1) == JSON.stringify(a2);
}

function combineLibraries(remoteFonts, local) {
  const combineLibrary = [];
  for (const [
    index,
    { family, variants, subsets, category },
  ] of remoteFonts.entries()) {
    combineLibrary.push({
      family,
      slug: family.replace(/ /g, "+"),
      id: family.toLowerCase().replace(/ /g, "-"),
      variants,
      subsets,
      category,
      tags: local[family] || [],
      lineNumber: index + 2,
    });
  }

  return {
    generatedMetadata: {
      tags: getUnique(combineLibrary, "tags"),
      categories: getUnique(combineLibrary, "category"),
      subsets: getUnique(combineLibrary, "subsets"),
      variants: getUnique(combineLibrary, "variants"),
    },
    generatedFamilies: `${JSON.stringify(
      combineLibrary.sort((a, b) => (a.family > b.family ? 1 : -1))
    )}`,
  };
}

export default library();

function getUnique(arr, key) {
  const values = arr.map((f) => f[key]).flat();
  return [...new Set(values)].sort();
}

function autoAddToLocal(local) {
  let updatedLocalLibrary = false;
  // if family name has "SC" and does not have "small caps" tag, add it
  Object.keys(local).forEach((font) => {
    const tags = local[font];
    if (font.includes("SC") && !tags.includes("small caps")) {
      local[font].push("small caps");
      updatedLocalLibrary = true;
    }
  });

  return {
    local,
    commitMessage: updatedLocalLibrary
      ? "Updated local library with small caps tag"
      : undefined,
  };
}
