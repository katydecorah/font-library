import { GeneratedData } from "./font-results";

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
