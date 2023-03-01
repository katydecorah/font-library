class FontResult extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: "open",
    });
    const wrapper = document.createElement("div");
    wrapper.classList.add("family");
    shadow.appendChild(wrapper);
    this.render();
  }
  render() {
    // Apply external styles to the shadow DOM
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "css/style.css");
    // Attach the created element to the shadow DOM
    this.shadowRoot.appendChild(linkElem);

    const wrapper = this.shadowRoot.querySelector(".family");
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

    // Add Google Font to document head
    const googleFont = document.createElement("link");
    googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall(
      {
        family: this.family,
        variants: this.variants,
        subsets: this.subsets,
        slug: this.slug,
      }
    )}`;
    googleFont.rel = "stylesheet";
    googleFont.setAttribute("data-family", this.family);
    document.head.appendChild(googleFont);

    wrapper.innerHTML = `<div id="family-${this.slug}">
    <div class="family-link">
      <div id="family-name" class="family-title" style="${this.familyStyle({
        family: this.family,
        variants: this.variants,
      })}">
        ${this.subsetFamily({ subsets: this.subsets })}
        <span class="family-name">${this.family}</span>
      </div>
      <div class="family-meta">
        <span>${this.category}</span>
        &bull;
        <span aria-label="${this.variants}"
          >${this.variants.length} variants</span
        >
        &bull;
        <span aria-label="${this.subsets}">${this.subsets.length} subsets</span>
      </div>
    </div>
    <div class="family-tags">
      <div class="family-tags-container">${this.tags
        .map(
          (tag) =>
            `<button is="tag-button" class="family-tag" value="${tag}">${tag}</button>`
        )
        .join("")}</div>
      <div class="family-meta-links">
        <a
          href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L${
            this.lineNumber
          }"
          target="_blank"
          aria-label="Edit tags for ${this.family}"
          >Edit tags</a
        >
           <a
          href="https://fonts.google.com/specimen/${this.slug}"
          target="_blank"
          aria-label="Visit ${this.family} on Google Fonts"
          >Google Fonts &rarr;</a
        >
      </div>
    </div>
  </div>`;
  }

  fontCall({ family, variants, subsets, slug }) {
    //get font name
    let font = slug;

    // if no regular variant
    if (!variants.includes("regular") && variants.includes("italic")) {
      font += `:${variants[0]}`;
    }
    // get selected variant
    if (this.selectedVariant !== undefined) {
      font += `:${this.electedVariant}`;
    }
    // if no regular or italic?
    if (!variants.includes("regular") && !variants.includes("italic")) {
      font += `:${variants[0]}`;
    }

    // otherwise get this text for the font
    font += `&text=${encodeURIComponent(family)}`;

    for (const key in this.languages) {
      if (this.selectedSubset == key || subsets.indexOf("latin") < 0) {
        font += encodeURIComponent(this.languages[key]);
      }
    }
    // set the subset
    if (this.selectedSubset !== undefined) {
      font += `&subset=${this.selectedSubset}`;
    }

    font += `&display=swap`;

    return font;
  }

  familyStyle({ family, variants }) {
    let style = `font-family: '${family}';`;

    if (!variants.includes("regular") && variants.includes("italic")) {
      style += "font-style: italic;";
    }

    if (!variants.includes("regular") && !variants.includes("italic")) {
      style += `font-weight: ${variants[0]};`;
    }

    return style;
  }

  subsetFamily({ subsets }) {
    if (!subsets.includes("latin")) {
      return this.languages[subsets];
    }
    return "";
  }
}

customElements.define("font-result", FontResult);
