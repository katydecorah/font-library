import subsetSamples from "./samples.json";
import rtlSubsets from "./rtl.json";

export type SubsetSamples = typeof subsetSamples;
export type RtlSubsets = typeof rtlSubsets;

class FontResult extends HTMLElement {
  slug: string;
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
  lineNumber: string;
  tags: string[];

  constructor() {
    super();
  }

  connectedCallback() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("family");
    this.slug = this.getAttribute("slug");
    this.family = this.getAttribute("family");
    this.category = this.getAttribute("category");
    this.variants = this.getAttribute("variants").split(",");
    this.subsets = this.getAttribute("subsets").split(",");
    this.lineNumber = this.getAttribute("lineNumber");

    // get tags json parse
    this.tags = this.getAttribute("tags")
      .split(",")
      .filter((tag) => tag);

    const { slug, family, category, variants, subsets, lineNumber, tags } =
      this;

    const previewName = this.subsetFamily();

    // Add Google Font to document head
    const googleFont = document.createElement("link");
    googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall(
      previewName
    )}`;
    googleFont.rel = "stylesheet";
    googleFont.setAttribute("data-family", family);
    document.head.appendChild(googleFont);

    const id = `${family.toLowerCase().replace(/ /g, "-")}`;

    wrapper.innerHTML = `<div id="family-${id}">
    <div class="family-link">
      <div id="family-name" class="family-title ${id}" style="${this.familyStyle(
      previewName
    )}">
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
          >${variants.length} variants</span
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
        .map((tag) => `<tag-button value="${tag}">${tag}</tag-button>`)
        .join("")}</div>
      <div class="family-meta-links">
        <a
          href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L${lineNumber}"
          target="_blank"
          aria-label="Edit tags for ${family}"
          >Edit tags</a
        >
           <a
          href="https://fonts.google.com/specimen/${slug}"
          target="_blank"
          aria-label="Visit ${family} on Google Fonts"
          >Google Fonts &rarr;</a
        >
      </div>
    </div>
  </div>`;
    this.appendChild(wrapper);
  }

  // Refactor this function
  fontCall(familyName: string) {
    const { variants, slug } = this;
    //get font name
    let font = slug;

    // get selectedVariants
    const variantSelect = document.querySelector(
      "#select-variants"
    ) as HTMLSelectElement;
    const selectedVariant = variantSelect.value;

    if (selectedVariant && selectedVariant !== "regular") {
      const variants = [];
      const hasItalic = selectedVariant.includes("italic");
      if (hasItalic) {
        variants.push("ital");
      }
      // get number form selectedVariant
      const variantNumber = selectedVariant.match(/\d+/g);
      if (variantNumber && variantNumber[0]) {
        variants.push(`wght@${hasItalic ? "1," : ""}${variantNumber[0]}`);
      }
      if (selectedVariant === "italic") {
        variants.push(`wght@1,400`);
      }
      font += `:${variants.join(",")}`;
    } else {
      if (!variants.includes("regular")) {
        font += `:wght@${variants[0]}`;
      }
    }

    // otherwise get this text for the font
    font += `&text=${encodeURIComponent(familyName)}`;

    font += `&display=swap`;

    return font;
  }

  familyStyle(familyName: string) {
    let style = `font-family: '${this.family}';`;
    if (
      this.subsets.filter((f) => rtlSubsets.includes(f)).length > 0 &&
      this.family !== familyName
    ) {
      style += "direction: rtl;";
    }
    // add italic style
    const selectedVariant = document.querySelector("#select-variants").value;
    if (selectedVariant.includes("italic")) {
      style += "font-style: italic;";
    }

    return style;
  }

  subsetFamily() {
    const { subsets, family } = this;
    const selectedSubset = document.querySelector("#select-subsets").value;

    // if family starts with materials icons
    if (
      family.startsWith("Material Icons") ||
      family.startsWith("Material Symbols")
    ) {
      return "favorite add delete settings search";
    }

    if (
      (!subsets.includes("latin") || family.startsWith("Noto")) &&
      (subsetSamples[selectedSubset] || subsetSamples[subsets[0]])
    ) {
      return subsetSamples[selectedSubset] || subsetSamples[subsets[0]];
    }
    if (!subsets.includes("latin") && !subsetSamples[subsets]) {
      return "";
    }
    return family;
  }
}

customElements.define("font-result", FontResult);
