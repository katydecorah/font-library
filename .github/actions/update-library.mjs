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

    const fontsLocal = libraryLocal.map((font) => font.family);
    // get difference between remote and local libraries
    const familiesToAdd = fontsApi.filter((x) => !fontsLocal.includes(x));
    // get difference between local and remote library
    const familiesToRemove = fontsLocal.filter((x) => !fontsApi.includes(x));

    const { generatedMetadata, generatedFamilies } = combineLibraries(
      libraryApi.items,
      libraryLocal
    );
    const localGeneratedData = readFileSync("js/data.js", "utf-8");

    const hasFamiliesToAdd = familiesToAdd.length > 0;
    const hasFamiliesToRemove = familiesToRemove.length > 0;
    const hasGeneratedDataToUpdate = generatedFamilies !== localGeneratedData;

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
      writeFileSync("js/data.js", generatedFamilies, "utf-8");
      writeFileSync(
        "_data/metadata.json",
        JSON.stringify(generatedMetadata, null, 2),
        "utf-8"
      );
      const updated = "📝 Updated generated data";
      commitMessage.push(updated);
      info(updated);
      exportVariable("UpdatedLibrary", true);
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

function combineLibraries(remoteFonts, local) {
  const combineLibrary = [];
  for (const [
    index,
    { family, variants, subsets, lastModified, category },
  ] of remoteFonts.entries()) {
    const localFont = local.find((f) => f.family === family);
    combineLibrary.push({
      family,
      slug: family.replace(/ /g, "+"),
      variants,
      subsets,
      lastModified,
      category,
      tags: localFont ? localFont.tags : [],
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
    generatedFamilies: `const generatedData=${JSON.stringify(
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
  local.forEach((font) => {
    if (font.family.includes("SC") && !font.tags.includes("small caps")) {
      font.tags.push("small caps");
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
