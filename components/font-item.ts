import sampleSubsets from "../data/samples.json";
import rtlSubsets from "../data/rtl.json";
import swaps from "../data/swaps.json";
import { GeneratedData } from "./font-results";

export type SampleSubsets = typeof sampleSubsets;
export type RtlSubsets = typeof rtlSubsets;
export type Swaps = typeof swaps;

class FontItem extends HTMLElement {
  subset: string;

  constructor() {
    super();
  }

  get font(): GeneratedData[number] {
    return JSON.parse(this.getAttribute("font"));
  }

  get selectedSubset(): string {
    return this.getAttribute("selected-subset");
  }

  get selectedVariant(): string {
    return this.getAttribute("selected-variant");
  }

  get previewName(): string {
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

  get id(): string {
    return this.font.family.toLowerCase().replaceAll(' ', "-");
  }

  get slug(): string {
    return this.font.family.replaceAll(' ', "+");
  }

  connectedCallback() {
    const { family, category, variants, subsets, lineNumber, tags, variable } =
      this.font;
    this.subset = this.selectedSubset;

    this.addFontToHead();

    const familyStyle = this.familyStyle();

    const tagButtons = tags
      .map(
        (tag: string) =>
          `<button is="tag-button" class="family-tag" title="${tag}" value="${tag}">${tag}</button>`
      )
      .join("");

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
      <div class="family-tags-container">${tagButtons}</div>
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
    const linkElement = document.createElement("link");
    linkElement.href = this.fontCall();
    linkElement.rel = "stylesheet";
    linkElement.dataset.family = family;
    document.head.append(linkElement);
  }

  fontCall(): string {
    const { variants } = this.font;
    let fontCallString = this.slug;

    if (this.selectedVariant && this.selectedVariant !== "regular") {
      fontCallString += this.fontCallSelectedVariant();
    }
    // if font doesn't have regular variant, add subset to font call
    if (!this.selectedVariant && !variants.includes("regular")) {
      fontCallString += this.fontCallVariant();
    }

    fontCallString += `&text=${encodeURIComponent(
      this.previewName
    )}&display=swap`;

    return `https://fonts.googleapis.com/css2?family=${fontCallString}`;
  }

  fontCallVariant(): string {
    const firstVariant = this.font.variants[0];
    if (/\d+/g.test(firstVariant)) {
      return `:wght@${firstVariant}`;
    } else if (firstVariant.includes("italic")) {
      return `:ital@1`;
    }
  }

  fontCallSelectedVariant() {
    const hasItalic = this.selectedVariant.includes("italic");
    const variantNumber = this.selectedVariant.match(/\d+/g); // get number from selectedVariant

    const variants = [];
    if (this.selectedVariant === "italic") {
      variants.push("ital@1");
    } else if (hasItalic) {
      variants.push("ital");
    }
    if (variantNumber && variantNumber[0]) {
      variants.push(`wght@${hasItalic ? "1," : ""}${variantNumber[0]}`);
    }
    return `:${variants.join(",")}`;
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

  disconnectedCallback() {
    const linkElement = document.querySelector(
      `link[data-family="${this.font.family}"]`
    );
    if (linkElement) linkElement.remove();
  }
}

customElements.define("font-item", FontItem);
