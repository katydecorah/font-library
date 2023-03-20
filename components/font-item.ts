import sampleSubsets from "../data/samples.json";
import rtlSubsets from "../data/rtl.json";
import swaps from "../data/swaps.json";

export type SampleSubsets = typeof sampleSubsets;
export type RtlSubsets = typeof rtlSubsets;
export type Swaps = typeof swaps;

class FontItem extends HTMLElement {
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
  lineNumber: string;
  tags: string[];
  selectedSubset: string;
  subset: string;
  selectedVariant: string;
  id: string;
  slug: string;

  constructor() {
    super();
  }

  connectedCallback() {
    const fontString = this.getAttribute("font");
    const selectedTag = this.getAttribute("selectedTag");
    const selectedSubset = this.getAttribute("selectedSubset");
    this.selectedSubset = selectedSubset;
    const selectedVariant = this.getAttribute("selectedVariant");
    this.selectedVariant = selectedVariant;
    this.subset = this.selectedSubset;

    const font = JSON.parse(fontString);
    const { family, category, variants, subsets, lineNumber, tags, variable } =
      font;
    this.id = family.toLowerCase().replace(/ /g, "-");
    this.slug = family.replace(/ /g, "+");
    const previewName = this.subsetFamily(font);

    this.addFontToHead({ previewName, ...font });

    const familyStyle = this.familyStyle({ previewName, ...font });

    this.innerHTML = `<div id="family-${this.id}" class="family">
    <div class="family-link">
      <div id="family-name" class="family-title ${
        this.id
      }" style="${familyStyle}">
        ${previewName}
      </div>
      <div class="family-meta-container">
     <span class="family-title-small">${
       previewName == family ? "" : family
     }</span>
      <div class="family-meta">
        <span>${category}</span>
        &bull;
        <span aria-label="${variants.join(", ")}"
          >${variants.length} variants${variable ? " (variable)" : ""}</span
        >
        &bull;
        <span aria-label="${subsets.join(", ")}">${
      subsets.length
    } subsets</span>
      </div>
      </div>
    </div>
    <div class="family-tags">
      <div class="family-tags-container">${tags
        .map(
          (tag: string) =>
            `<button is="tag-button" selectedTag="${selectedTag}" value="${tag}">${tag}</button>`
        )
        .join("")}</div>
      <div class="family-meta-links">
        <a
          href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L${lineNumber}"
          target="_blank"
          aria-label="Edit tags for ${family}"
          >Edit tags</a
        >
        <a
          href="https://fonts.google.com/specimen/${this.slug}"
          target="_blank"
          aria-label="Visit ${family} on Google Fonts"
          >Google Fonts &rarr;</a
        >
      </div>
    </div>
  </div>`;
  }

  addFontToHead({
    previewName,
    family,
  }: {
    previewName: string;
    family: string;
  }): void {
    const googleFont = document.createElement("link");
    googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall(
      { previewName }
    )}`;
    googleFont.rel = "stylesheet";
    googleFont.setAttribute("data-family", family);
    document.head.appendChild(googleFont);
  }

  fontCall({ previewName }: { previewName: string }): string {
    let font = this.slug;

    const hasItalic = this.selectedVariant.includes("italic");
    const variantNumber = this.selectedVariant.match(/\d+/g); // get number from selectedVariant

    if (this.selectedVariant && this.selectedVariant !== "regular") {
      const variants = [];
      if (hasItalic) {
        variants.push("ital");
      }
      if (variantNumber && variantNumber[0]) {
        variants.push(`wght@${hasItalic ? "1," : ""}${variantNumber[0]}`);
      }
      font += `:${variants.join(",")}`;
    }

    font += `&text=${encodeURIComponent(previewName)}`;

    font += `&display=swap`;

    return font;
  }

  familyStyle({
    previewName,
    family,
  }: {
    previewName: string;
    subsets: string[];
    family: string;
  }): string {
    let style = `font-family: '${family}';`;
    if (rtlSubsets.includes(this.subset) && family !== previewName) {
      style += "direction: rtl;";
    }
    if (this.selectedVariant.includes("italic")) {
      style += "font-style: italic;";
    }
    return style;
  }

  subsetFamily({
    family,
    subsets,
  }: {
    family: string;
    subsets: string[];
  }): string {
    if (this.selectedSubset && this.selectedSubset in sampleSubsets) {
      return sampleSubsets[this.selectedSubset as keyof SampleSubsets];
    }

    if (family in swaps) {
      return swaps[family as keyof Swaps];
    }

    if (
      (!subsets.includes("latin") || family.startsWith("Noto")) &&
      sampleSubsets[subsets[0] as keyof SampleSubsets]
    ) {
      this.subset = subsets[0];
      return sampleSubsets[subsets[0] as keyof SampleSubsets];
    }
    return family;
  }
}

customElements.define("font-item", FontItem);
