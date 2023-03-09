class FontResult extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const fontString = this.getAttribute("font");
    const font = fontString ? JSON.parse(fontString) : {};
    const { family, category, variants, subsets, lineNumber, tags, slug, id } =
      font;
    const previewName = this.subsetFamily(font);

    this.addFontToHead({ previewName, ...font });

    this.innerHTML = `<div id="family-${id}" class="family">
    <div class="family-link">
      <div id="family-name" class="family-title ${id}" style="${this.familyStyle(
      { previewName, ...font }
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
  }

  addFontToHead({ previewName, family, variants, slug }) {
    const googleFont = document.createElement("link");
    googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall(
      { previewName, family, variants, slug }
    )}`;
    googleFont.rel = "stylesheet";
    googleFont.setAttribute("data-family", family);
    document.head.appendChild(googleFont);
  }

  // Refactor this function
  fontCall({ previewName, variants, slug }) {
    //get font name
    let font = slug;

    // get selectedVariants
    const selectedVariant = document.querySelector("#select-variants").value;

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
      // if no regular variant
      if (!variants.includes("regular") && variants.includes("italic")) {
        font += `:wght@${variants[0]}`;
      }

      // if no regular or italic?
      if (!variants.includes("regular") && !variants.includes("italic")) {
        font += `:wght@${variants[0]}`;
      }
    }

    // otherwise get this text for the font
    font += `&text=${encodeURIComponent(previewName)}`;

    font += `&display=swap`;

    return font;
  }

  familyStyle({ previewName, subsets, family }) {
    let style = `font-family: '${family}';`;
    if (
      subsets.filter((f) => rtlLanguages.includes(f)).length > 0 &&
      family !== previewName
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

  subsetFamily({ family, subsets }) {
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
      (languages[selectedSubset] || languages[subsets[0]])
    ) {
      return languages[selectedSubset] || languages[subsets[0]];
    }
    if (!subsets.includes("latin") && !languages[subsets]) {
      return "";
    }
    return family;
  }
}

customElements.define("font-result", FontResult);
