// https://www.raymondcamden.com/2022/05/23/building-table-sorting-and-pagination-in-a-web-component

// const svgClose = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

class FontResults extends HTMLElement {
  constructor() {
    super();

    // eslint-disable-next-line no-undef
    this.data = generatedData;
    this.selectedTag = "";
    this.selectedCategory = "";
    this.selectedSubset = "";
    this.selectedVariant = "";
    this.resultsLength;
    this.pageSize = 5;
    this.curPage = 1;

    // Bind functions
    this.selectTag = this.selectTag.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

    // Event listeners
    document.addEventListener("tag-button-selected", this.selectTag);
    this.addEventListener("tag-button-selected", this.selectTag);
    document.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("clear-filter", this.clearFilter);

    // Filter event listeners and set initial values
    this.filters = [
      {
        select: "#select-categories",
        param: "category",
        selectVar: "selectedCategory",
      },
      {
        select: "#select-subsets",
        param: "subset",
        selectVar: "selectedSubset",
      },
      {
        select: "#select-variants",
        param: "variant",
        selectVar: "selectedVariant",
      },
      {
        select: "#select-tags",
        param: "tag",
        selectVar: "selectedTag",
      },
    ];

    for (const { select, param, selectVar } of this.filters) {
      if (select === "#select-tags") continue;
      this.getUrlParams(param, selectVar, select);
      document.querySelector(select).addEventListener("change", (e) => {
        this[selectVar] = e.target.value;
        this.renderStatus();
        this.renderBody();
        this.setUrlParams(param, e.target.value);
      });
    }

    this.getUrlParams("tag", "selectedTag", "#select-tags");
    document.querySelector("#select-tags").addEventListener("change", (e) => {
      this.selectTag({ detail: { tag: e.target.value } });
    });
  }

  getUrlParams(param, selectVar, selectElement) {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(param)) return;
    const newValue = urlParams.get(param);
    this[selectVar] = newValue;
    const select = document.querySelector(selectElement);
    select.value = newValue;

    if (selectElement === "#select-tags") {
      this.addActiveTag(newValue);
    }
  }

  setUrlParams(param, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(param, value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }

  clearFilter() {
    // Reset selects
    for (const { select, selectVar } of this.filters) {
      this[selectVar] = "";
      document.querySelector(select).value = "";
    }
    this.removeActiveTag();
    // Reset URL
    window.history.pushState({}, "", `${window.location.pathname}`);
    // Re-render
    this.renderStatus();
    this.renderBody();
  }

  connectedCallback() {
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
    fontContainer.append(nav);

    this.appendChild(fontContainer);

    this.renderStatus();
    this.renderBody();
  }

  performFilter() {
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
    if (this.selectedCategory) {
      filteredData = filteredData.filter((row) => {
        return row.category === this.selectedCategory;
      });
    }
    if (this.selectedSubset) {
      filteredData = filteredData.filter((row) => {
        return row.subsets.includes(this.selectedSubset);
      });
    }
    if (this.selectedVariant) {
      filteredData = filteredData.filter((row) => {
        return row.variants.includes(this.selectedVariant);
      });
    }

    this.resultsLength = filteredData.length;
    return filteredData;
  }

  performPagination(data) {
    const totalPages = Math.ceil(this.resultsLength / this.pageSize);
    this.querySelector(
      "#page-count"
    ).innerHTML = `${this.curPage} of ${totalPages}`;
    if (totalPages === 0) {
      // add "hide" class to #pagination
      this.querySelector(".pagination").classList.add("hide");
    }

    this.setNextPageState();
    this.setPrevPageState();

    return data.filter((row, index) => {
      const start = (this.curPage - 1) * this.pageSize;
      const end = this.curPage * this.pageSize;
      if (index >= start && index < end) return true;
    });
  }

  renderBody() {
    const fontBody = this.querySelector(".families");
    const filteredData = this.performFilter();
    this.renderStatus();
    this.cleanUpFonts();
    const paginatedData = this.performPagination(filteredData);

    let result = "";
    for (const font of paginatedData) {
      const { slug, family, category, variants, subsets, lineNumber, tags } =
        font;
      result += `<font-result slug="${slug}" family="${family}" category="${category}" variants="${variants}" subsets="${subsets}" lineNumber="${lineNumber}" tags="${tags}"></font-result>`;
    }
    fontBody.innerHTML = result;
  }

  selectTag({ detail: { tag } }) {
    this.selectedTag = tag;
    this.curPage = 1;
    this.renderBody();
    // set URL query string with tag
    this.setUrlParams("tag", tag);
    // remove tag from .family-tag.active
    this.removeActiveTag();
    // add active tage
    this.addActiveTag(tag);
    this.scrollToContent();
    const select = document.querySelector("#select-tags");
    select.value = tag;
  }

  scrollToContent() {
    const contentElement = document.querySelector("#content");
    contentElement.scrollIntoView();
  }

  removeActiveTag() {
    const prevActiveTag = document.querySelectorAll(".family-tag.active");
    prevActiveTag.forEach((activeTagButton) =>
      activeTagButton.classList.remove("active")
    );
  }

  addActiveTag(newTag) {
    const nextActiveTags = document.querySelectorAll(
      `.tag-${newTag.replace(/ /g, "-")}`
    );
    nextActiveTags.forEach((tagButton) => tagButton.classList.add("active"));
  }

  nextPage() {
    this.cleanUpFonts();
    if (this.curPage * this.pageSize < this.resultsLength) this.curPage++;
    this.setNextPageState();
    this.renderBody();
    this.scrollToContent();
  }

  setNextPageState() {
    if (this.curPage * this.pageSize >= this.resultsLength) {
      this.querySelector("#btn-next").disabled = true;
    } else {
      this.querySelector("#btn-next").disabled = false;
    }
  }

  previousPage() {
    this.cleanUpFonts();
    if (this.curPage > 1) this.curPage--;
    this.setPrevPageState();
    this.renderBody();
    this.scrollToContent();
  }

  setPrevPageState() {
    if (this.curPage === 1) {
      this.querySelector("#btn-prev").disabled = true;
    } else {
      this.querySelector("#btn-prev").disabled = false;
    }
  }

  renderStatus() {
    const status = this.querySelector(".search-status");
    const hasFilters =
      this.selectedCategory ||
      this.selectedTag ||
      this.selectedSubset ||
      this.selectedVariant;
    let elm = "";
    elm += `<div>Found ${this.resultsLength} fonts`;

    if (hasFilters) {
      elm += this.selectedTag === "need tags" ? ` that ` : ` for `;
    }

    elm += `</div>`;

    if (this.selectedSubset) {
      elm += `<div class="search-filter">subset: <strong>${this.selectedSubset}</strong></div>`;
    }

    if (this.selectedCategory) {
      elm += `<div class="search-filter">category: <strong>${this.selectedCategory}</strong></div>`;
    }
    if (this.selectedVariant) {
      elm += `<div class="search-filter">variant: <strong>${this.selectedVariant}</strong></div>`;
    }
    if (this.selectedTag) {
      elm += `<div class="search-filter">tag: <strong>${this.selectedTag}</strong></div>`;
    }
    if (hasFilters) {
      elm += `<clear-button class="btn btn-clear">Clear</clear-butto>`;
    }

    status.innerHTML = elm;
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
