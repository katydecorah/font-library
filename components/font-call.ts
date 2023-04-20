import { GeneratedData } from "./main-app";
import rtlSubsets from "../data/rtl.json";

export default function fontCall({
  variants,
  slug,
  selectedVariant,
  previewName,
}: {
  variants: GeneratedData[number]["variants"];
  slug: string;
  selectedVariant: string;
  previewName: string;
}): string {
  let fontCallString = slug;

  if (selectedVariant && selectedVariant !== "regular") {
    fontCallString += fontCallSelectedVariant(selectedVariant);
  }
  // if font doesn't have regular variant, add subset to font call
  if (!selectedVariant && !variants.includes("regular")) {
    fontCallString += fontCallVariant(variants);
  }

  fontCallString += `&text=${encodeURIComponent(previewName)}&display=swap`;

  return `https://fonts.googleapis.com/css2?family=${fontCallString}`;
}

function fontCallVariant(variants: GeneratedData[number]["variants"]): string {
  const [firstVariant] = variants;
  if (/\d+/g.test(firstVariant)) {
    return `:wght@${firstVariant}`;
  } else if (firstVariant.includes("italic")) {
    return `:ital@1`;
  }
}

function fontCallSelectedVariant(selectedVariant: string): string {
  const hasItalic = selectedVariant.includes("italic");
  const variantNumber = selectedVariant.match(/\d+/g); // get number from selectedVariant

  const variants = [];
  if (selectedVariant === "italic") {
    variants.push("ital@1");
  } else if (hasItalic) {
    variants.push("ital");
  }
  if (variantNumber && variantNumber[0]) {
    variants.push(`wght@${hasItalic ? "1," : ""}${variantNumber[0]}`);
  }
  return `:${variants.join(",")}`;
}

export function familyStyle({
  family,
  selectedVariant,
  previewName,
  subset,
}: {
  family: GeneratedData[number]["family"];
  selectedVariant: string;
  previewName: string;
  subset: string;
}) {
  let style = `font-family: '${family}';`;
  if (rtlSubsets.includes(subset) && family !== previewName) {
    style += "direction: rtl;";
  }
  if (selectedVariant.includes("italic")) {
    style += "font-style: italic;";
  }
  // get variant number from selectedVariant
  const variantNumber = selectedVariant.match(/\d+/g);
  if (variantNumber && variantNumber[0]) {
    style += `font-weight: ${variantNumber[0]};`;
  }
  return style;
}
