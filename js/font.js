class FontResult extends HTMLElement {
  constructor() {
    super();
    this.languages = {
      arabic: "مرحبا بالعالم",
      bengali: "ওহে বিশ্ব",
      cyrillic: "привет мир",
      "cyrillic-ext": "привет мир",
      devanagari: "हैलो वर्ल्ड",
      greek: "γειά σου Κόσμε",
      "greek-ext": "γειά σου Κόσμε",
      gujarati: "હેલો વર્લ્ડ",
      hebrew: "שלום עולם",
      khmer: "ជំរាបសួរពិភពលោក",
      tamil: "வணக்கம் உலக",
      telugu: "హలో వరల్డ్",
      thai: "สวัสดีชาวโลก",
      vietnamese: "xin chào",
    };
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
        subsets: this.subsets,
      })}">
        ${this.subsetFamily({ subsets: this.subsets, family: this.family })}
      </div>
      <div class="family-meta-container">
     <span class="family-title-small">${
       !this.subsets.includes("latin") ? this.family : ""
     }</span>
      <div class="family-meta">
        <span>${this.category}</span>
        &bull;
        <span aria-label="${this.variants.join(", ")}"
          >${this.variants.length} variants</span
        >
        &bull;
        <span aria-label="${this.subsets.join(", ")}">${
      this.subsets.length
    } subsets</span>
      </div>
      </div>
    </div>
    <div class="family-tags">
      <div class="family-tags-container">${this.tags
        .map((tag) => `<button is="tag-button">${tag}</button>`)
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
    this.appendChild(wrapper);
  }

  // Refactor this function
  fontCall({ family, variants, subsets, slug }) {
    //get font name
    let font = slug;

    // if no regular variant
    if (!variants.includes("regular") && variants.includes("italic")) {
      font += `:${variants[0]}`;
    }

    // if no regular or italic?
    if (!variants.includes("regular") && !variants.includes("italic")) {
      font += `:${variants[0]}`;
    }

    // otherwise get this text for the font
    font += `&text=${encodeURIComponent(family)}`;

    for (const key in this.languages) {
      if (subsets.indexOf("latin") < 0) {
        font += encodeURIComponent(this.languages[key]);
      }
    }

    font += `&display=swap`;

    return font;
  }

  familyStyle({ family, variants, subsets }) {
    let style = `font-family: '${family}';`;

    if (!variants.includes("regular") && variants.includes("italic")) {
      style += "font-style: italic;";
    }

    if (!variants.includes("regular") && !variants.includes("italic")) {
      style += `font-weight: ${variants[0]};`;
    }

    if (
      (subsets.includes("hebrew") || subsets.includes("arabic")) &&
      !subsets.includes("latin")
    ) {
      style += "direction: rtl;";
    }

    return style;
  }

  subsetFamily({ subsets, family }) {
    if (!subsets.includes("latin")) {
      return this.languages[subsets];
    }
    return family;
  }
}

customElements.define("font-result", FontResult);
