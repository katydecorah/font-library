import { GeneratedData } from "./main-app";
import rtlSubsets from "../data/rtl.json";

export function fontCallVariant(
  variants: GeneratedData[number]["variants"],
): string {
  if (variants.length === 0) {
    return "";
  }

  const [firstVariant] = variants;
  if (/\d+/g.test(firstVariant)) {
    return `:wght@${firstVariant}`;
  }
  if (firstVariant.includes("italic")) {
    return `:ital@1`;
  }
  return "";
}

export function fontCallSelectedVariant(selectedVariant: string): string {
  const variantNumber = selectedVariant.match(/\d+/g); // get number from selectedVariant

  const variants = [];
  if (selectedVariant.includes("italic")) {
    variants.push(selectedVariant === "italic" ? "ital@1" : "ital");
  }
  if (variantNumber && variantNumber[0]) {
    variants.push(
      `wght@${variants.includes("ital") ? "1," : ""}${variantNumber[0]}`,
    );
  }
  return `:${variants.join(",")}`;
}

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
}): string {
  const styleParts = [`font-family: '${family}'`];
  if (rtlSubsets.includes(subset) && family !== previewName) {
    styleParts.push("direction: rtl");
  }
  if (selectedVariant.includes("italic")) {
    styleParts.push("font-style: italic");
  }
  // get variant number from selectedVariant
  const variantNumber = selectedVariant.match(/\d+/g);
  if (variantNumber && variantNumber[0]) {
    styleParts.push(`font-weight: ${variantNumber[0]}`);
  }
  return `${styleParts.join(";")};`;
}
