class TagButton extends HTMLButtonElement {
  constructor() {
    super();
    this.eventName = "tag-button-selected-tag";
    if (this.hasAttribute("data-event")) {
      this.eventName = this.getAttribute("data-event");
    }
    this.addEventListener("click", (e) => {
      this.dispatchEvent(
        new CustomEvent(this.eventName, {
          bubbles: true,
          composed: true,
          detail: {
            tag: e.target.value,
          },
        })
      );
    });
  }
}

customElements.define("tag-button", TagButton, { extends: "button" });

// https://www.raymondcamden.com/2022/05/23/building-table-sorting-and-pagination-in-a-web-component

class FontResults extends HTMLElement {
  constructor() {
    super();

    this.src = "http://127.0.0.1:4000/font-library/generated/data.json";
    this.selectedTag = "";
    this.resultsLength;
    this.pageSize = 5;
    this.curPage = 1;
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

    // Bind functions
    this.selectTag = this.selectTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    // If tag is in URL, set it
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("tag")) {
      this.selectedTag = urlParams.get("tag");
    }

    // Event listeners
    document.addEventListener("tag-button-selected-tag", this.selectTag);
    this.addEventListener("tag-button-selected-tag", this.selectTag);
    document.addEventListener("tag-button-remove-tag", this.removeTag);
    this.addEventListener("tag-button-remove-tag", this.removeTag);

    // Create component
    this.createComponent();

    // Load data
    this.load();
  }

  createComponent() {
    const shadow = this.attachShadow({
      mode: "open",
    });
    // Main
    const fontContainer = document.createElement("div");
    // Search status
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("search-status");
    // Families
    const fontBody = document.createElement("div");
    fontBody.classList.add("families");
    fontContainer.append(statusContainer, fontBody);
    // Pagination
    const nav = document.createElement("div");
    nav.classList.add("pagination");
    const prevButton = document.createElement("button");
    prevButton.classList.add("btn");
    prevButton.disabled = true;
    prevButton.id = "btn-prev";
    prevButton.innerHTML = "Previous page";
    const pageCount = document.createElement("div");
    pageCount.classList.add("page-count");
    pageCount.id = "page-count";
    const nextButton = document.createElement("button");
    nextButton.classList.add("btn");
    nextButton.innerHTML = "Next page";
    nextButton.id = "btn-next";
    nav.append(prevButton, pageCount, nextButton);
    nextButton.addEventListener("click", this.nextPage, false);
    prevButton.addEventListener("click", this.previousPage, false);

    shadow.append(fontContainer, nav);
  }

  async load() {
    console.log("load", this.src);
    // error handling needs to be done :|
    const result = await fetch(this.src);
    this.data = await result.json();
    this.render();
  }

  render() {
    this.renderStatus();
    this.renderBody();

    // Apply external styles to the shadow DOM
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "css/style.css");
    // Attach the created element to the shadow DOM
    this.shadowRoot.appendChild(linkElem);
  }

  renderBody() {
    const fontBody = this.shadowRoot.querySelector(".families");
    let result = "";
    let filteredData = this.data;

    if (this.selectedTag && this.selectedTag !== "need tags") {
      filteredData = filteredData.filter((row) =>
        row.tags.includes(this.selectedTag)
      );
    }
    if (this.selectedTag === "need tags") {
      filteredData = filteredData.filter((row) => {
        return row.tags.length === 0;
      });
    }

    this.resultsLength = filteredData.length;
    this.renderStatus();

    // pagination
    this.shadowRoot.querySelector("#page-count").innerHTML = `${
      this.curPage
    } of ${Math.ceil(this.resultsLength / this.pageSize)}`;

    if (this.curPage * this.pageSize >= this.resultsLength) {
      this.shadowRoot.querySelector("#btn-next").disabled = true;
    } else {
      this.shadowRoot.querySelector("#btn-next").disabled = false;
    }

    filteredData = filteredData.filter((row, index) => {
      const start = (this.curPage - 1) * this.pageSize;
      const end = this.curPage * this.pageSize;
      if (index >= start && index < end) return true;
    });

    for (const font of filteredData) {
      const googleFont = document.createElement("link");
      googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall(
        font
      )}`;
      googleFont.rel = "stylesheet";
      googleFont.setAttribute("data-family", font.family);
      document.head.appendChild(googleFont);

      const r = this.fontTemplate(font);
      result += r;
    }

    fontBody.innerHTML = result;
  }

  fontTemplate(font) {
    const { slug, family, category, variants, subsets, lineNumber, tags } =
      font;
    return `<div class="family" id="family-${slug}">
    <div class="family-link ${this.fontIsRtl({ subsets })}">
      <div id="family-name" class="family-title" style="${this.familyStyle({
        family,
        variants,
      })}">
        ${this.subsetFamily({ subsets })}
        <span class="family-name${this.showLatinName({
          subsets,
        })}">${family}</span>
      </div>
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
    <div class="family-tags">
      <div class="family-tags-container">${tags
        .map(
          (tag) =>
            `<button is="tag-button" class="family-tag" value="${tag}">${tag}</button>`
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
          href="https://fonts.google.com/specimen/${slug}"
          target="_blank"
          aria-label="Visit ${family} on Google Fonts"
          >Google Fonts &rarr;</a
        >
      </div>
    </div>
  </div>`;
  }

  selectTag({ detail: { tag } }) {
    this.selectedTag = tag;
    this.curPage = 1;
    this.renderBody();
    // set URL query string with tag
    const encodeTag = tag.replace(/\s/g, "+");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?tag=${encodeTag}`
    );
  }

  removeTag() {
    this.selectedTag = "";
    this.renderBody();
    window.history.pushState({}, "", `${window.location.pathname}`);
  }

  showLatinName({ subsets }) {
    return (
      ((subsets.indexOf("latin") < 0 ||
        (this.selectedSubset && !this.selectedSubset.includes("latin"))) &&
        " family-title-small") ||
      ""
    );
  }

  nextPage() {
    this.cleanUpFonts();
    if (this.curPage * this.pageSize < this.resultsLength) this.curPage++;
    if (this.curPage * this.pageSize >= this.resultsLength) {
      this.shadowRoot.querySelector("#btn-next").disabled = true;
    }
    this.shadowRoot.querySelector("#btn-prev").disabled = false;
    this.renderBody();
  }

  previousPage() {
    this.cleanUpFonts();
    if (this.curPage > 1) this.curPage--;
    if (this.curPage === 1) {
      this.shadowRoot.querySelector("#btn-prev").disabled = true;
    }
    this.shadowRoot.querySelector("#btn-next").disabled = false;
    this.renderBody();
  }

  renderStatus() {
    const status = this.shadowRoot.querySelector(".search-status");

    let elm = "";
    elm += `Found ${this.resultsLength} fonts`;
    if (this.selectedTag) {
      elm += this.selectedTag === "need tags" ? ` that ` : ` for `;
      elm += `<button is="tag-button" data-event='tag-button-remove-tag' class="family-tag active" value="${this.selectedTag}">${this.selectedTag}</button>`;
    }
    status.innerHTML = elm;
  }

  fontIsRtl({ subsets }) {
    if (!this.selectedSubset) return;
    if (
      (!this.selectedSubset.includes("hebrew") &&
        !subsets.includes("arabic")) ||
      (!this.selectedSubset.includes("arabic") && !subsets.includes("hebrew"))
    ) {
      return "";
    }

    return "language-rtl";
  }

  subsetFamily({ subsets }) {
    let sample = "";

    if (!subsets.includes("latin")) {
      sample = this.languages[subsets];
    } else {
      for (const key in this.languages) {
        if (this.selectedSubset == key) {
          sample = this.languages[key];
        }
      }
    }
    return sample || "";
  }

  familyStyle({ family, variants }) {
    let style = `font-family: '${family}';`;

    if (!variants.includes("regular") && variants.includes("italic")) {
      style += "font-style: italic;";
    }

    if (!variants.includes("regular") && !variants.includes("italic")) {
      style += `font-weight: ${variants[0]};`;
    }

    // when users filters by variant
    if (this.selectedVariant !== undefined) {
      if (this.selectedVariant.match("italic") == "italic") {
        style += "font-style: italic;";
      }
      if (
        this.selectedVariant.match("italic") == "italic" &&
        this.selectedVariant > 0
      ) {
        style += `font-weight: ${this.selectedVariant};`;
      }
    }

    return style;
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

  cleanUpFonts() {
    // remove data-font element from document head
    const fonts = document.querySelectorAll("link[data-family]");
    fonts.forEach((font) => {
      document.head.removeChild(font);
    });
  }
}

// Define the new element
customElements.define("font-results", FontResults);
