import sampleSubsets from "../data/samples.json";
import rtlSubsets from "../data/rtl.json";
import swaps from "../data/swaps.json";

export type SampleSubsets = typeof sampleSubsets;
export type RtlSubsets = typeof rtlSubsets;
export type Swaps = typeof swaps;

class FontItem extends HTMLElement {
  selectedSubset: string;
  selectedVariant: string;
  selectedTag: string;
  id: string;
  slug: string;
  previewName: string;
  subset: string;
  font: {
    family: string;
    category: string;
    variants: string[];
    subsets: string[];
    lineNumber: string;
    tags: string[];
    variable?: boolean;
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.font = JSON.parse(this.getAttribute("font"));
    const { family, category, variants, subsets, lineNumber, tags, variable } =
      this.font;
    this.selectedTag = this.getAttribute("selected-tag");
    this.selectedSubset = this.getAttribute("selected-subset");
    this.selectedVariant = this.getAttribute("selected-variant");
    this.subset = this.selectedSubset;
    this.id = family.toLowerCase().replace(/ /g, "-");
    this.slug = family.replace(/ /g, "+");
    this.previewName = this.createPreviewName();

    this.addFontToHead();

    const familyStyle = this.familyStyle();

    this.innerHTML = `<div id="family-${this.id}" class="family">
    <div class="family-link">
      <div id="family-name" class="family-title ${
        this.id
      }" style="${familyStyle}">
        ${this.previewName}
      </div>
      <div class="family-meta-container">
     <span class="family-title-small">${
       this.previewName == family ? "" : family
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
            `<button is="tag-button" selected-tag="${this.selectedTag}" value="${tag}">${tag}</button>`
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

  addFontToHead(): void {
    const { family } = this.font;
    const googleFont = document.createElement("link");
    googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall()}`;
    googleFont.rel = "stylesheet";
    googleFont.setAttribute("data-family", family);
    document.head.appendChild(googleFont);
  }

  fontCall(): string {
    const { variants } = this.font;
    let fontCallStr = this.slug;
    const hasItalic = this.selectedVariant.includes("italic");
    const variantNumber = this.selectedVariant.match(/\d+/g); // get number from selectedVariant

    if (this.selectedVariant && this.selectedVariant !== "regular") {
      const variants = [];
      if (hasItalic) {
        variants.push("ital@1");
      }
      if (variantNumber && variantNumber[0]) {
        variants.push(`wght@${hasItalic ? "1," : ""}${variantNumber[0]}`);
      }
      fontCallStr += `:${variants.join(",")}`;
    }

    // if font doesn't have regular variant, add subset to font call
    if (!this.selectedVariant && !variants.includes("regular")) {
      // get first variant
      const firstVariant = variants[0];
      if (firstVariant.match(/\d+/g)) {
        fontCallStr += `:wght@${firstVariant}`;
      } else if (firstVariant.includes("italic")) {
        fontCallStr += `:ital@1`;
      }
    }

    fontCallStr += `&text=${encodeURIComponent(this.previewName)}&display=swap`;

    return fontCallStr;
  }

  familyStyle(): string {
    const { family } = this.font;
    let style = `font-family: '${family}';`;
    if (rtlSubsets.includes(this.subset) && family !== this.previewName) {
      style += "direction: rtl;";
    }
    if (this.selectedVariant.includes("italic")) {
      style += "font-style: italic;";
    }
    return style;
  }

  createPreviewName(): string {
    const { family, subsets } = this.font;
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
