import { exportVariable, setFailed, info } from "@actions/core";
import fetch from "node-fetch";
import { readFileSync, writeFileSync } from "fs";
import stringify from "json-stringify-pretty-compact";

async function library() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GoogleToken}`
    );
    const library = await response.json();
    // build list of family names in Google Fonts API
    const remoteFonts = library.items.map(({ family }) => family);

    // get list of families in font library
    let local = JSON.parse(readFileSync("families.json", "utf-8"));
    const localFonts = local.map((font) => font.family);
    // get difference between remote and local libraries
    const familiesToAdd = remoteFonts.filter((x) => !localFonts.includes(x));
    // get difference between local and remote library
    const familiesToRemove = localFonts.filter((x) => !remoteFonts.includes(x));

    const commitMessage = [];

    const { generatedMetadata, generatedFamilies } = combineLibraries(
      library.items,
      local
    );
    const localGeneratedData = readFileSync("js/data.js", "utf-8");

    const hasFamiliesToAdd = familiesToAdd.length > 0;
    const hasFamiliesToRemove = familiesToRemove.length > 0;
    const hasGeneratedDataToUpdate = generatedFamilies !== localGeneratedData;

    if (
      !hasFamiliesToAdd &&
      !hasFamiliesToRemove &&
      !hasGeneratedDataToUpdate
    ) {
      exportVariable("UpdatedLibrary", false);
      info("Nothing to update.");
      return;
    }

    if (hasFamiliesToAdd) {
      familiesToAdd.map((font) => local.push({ family: font, tags: [] }));
      const added = `➕ Added: ${familiesToAdd.join(", ")}`;
      commitMessage.push(added);
      info(added);
      exportVariable("UpdatedLibrary", true);
    }

    if (hasFamiliesToRemove) {
      local = local.filter((f) => !familiesToRemove.includes(f.family));
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

    if (hasFamiliesToAdd || hasFamiliesToRemove) {
      writeFileSync(
        "families.json",
        stringify(
          local.sort((a, b) => (a.family > b.family ? 1 : -1)),
          { maxLength: 200 }
        ),
        "utf-8"
      );
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

    // Check for main variants
    const hasItalic = variants.includes("italic");
    const hasBold =
      variants.includes("500") ||
      variants.includes("600") ||
      variants.includes("700") ||
      variants.includes("800") ||
      variants.includes("900");
    const hasRegular = variants.includes("regular") || variants.includes("400");
    const fullVariant = hasBold && hasRegular && hasItalic;

    combineLibrary.push({
      family,
      slug: family.replace(/ /g, "+"),
      variants,
      hasItalic,
      hasBold,
      hasRegular,
      fullVariant,
      subsets,
      lastModified,
      category,
      tags: localFont ? localFont.tags : [],
      count: localFont ? localFont.tags.length : 0, // number of tags
      lineNumber: index + 2,
    });
  }

  const tagArr = combineLibrary.map((f) => f.tags).flat();
  const variantArr = combineLibrary.map((f) => f.variants).flat();
  const subsetArr = combineLibrary.map((f) => f.subsets).flat();
  const categoryArr = combineLibrary.map((f) => f.category);
  return {
    generatedMetadata: {
      uniqueTags: [...new Set(tagArr)].sort(),
      tags: groupBy(tagArr, "tag"),
      uniqueVariants: [...new Set(variantArr)].sort(),
      variants: groupBy(variantArr, "variant"),
      uniqueSubsets: [...new Set(subsetArr)].sort(),
      subsets: groupBy(subsetArr, "subset"),
      uniqueCategories: [...new Set(categoryArr)].sort(),
      categories: groupBy(categoryArr, "category"),
    },
    generatedFamilies: `const generatedData=${JSON.stringify(
      combineLibrary.sort((a, b) => (a.family > b.family ? 1 : -1))
    )}`,
  };
}

function groupBy(array, label) {
  const obj = array.reduce((obj, key) => {
    if (!obj[key]) obj[key] = 0;
    obj[key]++;
    return obj;
  }, {});

  return Object.keys(obj).map((key) => ({ [label]: key, value: obj[key] }));
}

export default library();
