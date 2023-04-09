import sampleSubsets from "../data/samples.json";
import swaps from "../data/swaps.json";
import fontCall, { familyStyle } from "./font-call";
import { GeneratedData } from "./main-app";

type SampleSubsets = typeof sampleSubsets;
type Swaps = typeof swaps;

class FontItem extends HTMLLIElement {
  subset: string;

  constructor() {
    super();
  }

  get font(): GeneratedData[number] {
    return JSON.parse(this.getAttribute("font"));
  }

  get selectedSubset(): string {
    return this.getAttribute("selected-subset") || "";
  }

  get selectedVariant(): string {
    return this.getAttribute("selected-variant") || "";
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
    return this.font.family.toLowerCase().replaceAll(" ", "-");
  }

  get slug(): string {
    return this.font.family.replaceAll(" ", "+");
  }

  get familyStyle(): string {
    const { font, selectedVariant, previewName, subset } = this;
    return familyStyle({
      family: font.family,
      selectedVariant,
      previewName,
      subset,
    });
  }

  connectedCallback() {
    const { family, category, variants, subsets, lineNumber, tags, variable } =
      this.font;
    this.subset = this.selectedSubset;

    this.addFontToHead();

    const tagButtons = tags
      .map(
        (tag: string) =>
          `<button is="tag-button" title="${tag}" value="${tag}">${tag}</button>`
      )
      .join("");

    this.innerHTML = `<div class="family-link">
      <div class="family-title ${this.id}" style="${this.familyStyle}">
        ${this.previewName}
      </div>
      <div class="family-meta-container">
        <span class="family-title-small">${
          this.previewName == family ? "" : family
        }</span>
        <div class="family-meta">
          <ul>
            <li>${category}</li>
            <li><span aria-label="${variants.join(", ")}">${
      variants.length
    } variants${variable ? " (variable)" : ""}</span></li>
            <li><span aria-label="${subsets.join(", ")}">${
      subsets.length
    } subsets</span></li>
          </ul>
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
    </div>`;
  }

  addFontToHead(): void {
    const { slug, selectedVariant, previewName, font } = this;
    const { family, variants } = font;

    const linkElement = document.createElement("link");
    linkElement.href = fontCall({
      variants,
      slug,
      selectedVariant,
      previewName,
    });
    linkElement.rel = "stylesheet";
    linkElement.dataset.family = family;
    document.head.append(linkElement);
  }

  disconnectedCallback() {
    const linkElement = document.querySelector(
      `link[data-family="${this.font.family}"]`
    );
    if (linkElement) linkElement.remove();
  }
}

customElements.define("font-item", FontItem, { extends: "li" });
