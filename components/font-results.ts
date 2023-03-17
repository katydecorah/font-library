import generatedData from "../data/data.json";
export type GeneratedData = typeof generatedData;

class FontResults extends HTMLElement {
  selectedTag: string;
  selectedCategory: string;
  selectedSubset: string;
  selectedVariant: string;
  search: string;
  resultsLength: number;
  pageSize: number;
  curPage: number;
  selectedVariable: boolean;

  constructor() {
    super();

    this.addEventListener("next-page", this.handlePage);
    this.addEventListener("previous-page", this.handlePage);
  }

  connectedCallback() {
    this.selectedTag = this.getAttribute("selected-tag");
    this.selectedCategory = this.getAttribute("selected-category");
    this.selectedSubset = this.getAttribute("selected-subset");
    this.selectedVariant = this.getAttribute("selected-variant");
    this.search = this.getAttribute("search");
    this.selectedVariable = this.getAttribute("selected-variable") === "true";
    this.resultsLength;
    this.pageSize = 10;
    this.curPage = 1;

    this.innerHTML = `<div id="search-status"></div>
<div id="families" class="families"></div>
<div id="pagination"></div>`;

    this.render();
  }

  render() {
    const paginatedData = this.performFilter();
    this.cleanUpFonts();
    this.renderSearchStatus();
    this.renderPagination();

    this.querySelector("#families").innerHTML = paginatedData
      .map(
        (font) =>
          `<font-item selectedVariant='${
            this.selectedVariant
          }' selectedSubset='${this.selectedSubset}' selectedTag='${
            this.selectedTag
          }' font='${JSON.stringify(font)}'></font-item>`
      )
      .join("\n");
  }

  renderSearchStatus() {
    const {
      selectedTag,
      selectedCategory,
      selectedSubset,
      selectedVariant,
      selectedVariable,
      resultsLength,
      search,
    } = this;
    const strSelectedVariable = selectedVariable ? "true" : "";
    this.querySelector(
      "#search-status"
    ).innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}" selectedVariable="${strSelectedVariable}"></search-status>`;
  }

  renderPagination() {
    const { resultsLength, pageSize, curPage } = this;
    this.querySelector(
      "#pagination"
    ).innerHTML = `<pagination-buttons resultsLength="${resultsLength}" pageSize="${pageSize}" currentPage="${curPage}"></pagination-buttons>`;
  }

  handlePage({ type }: CustomEvent) {
    if (
      type === "next-page" &&
      this.curPage * this.pageSize < this.resultsLength
    ) {
      this.curPage++;
    }
    if (type === "previous-page" && this.curPage > 1) {
      this.curPage--;
    }
    this.render();
    // scroll to #content
    document.querySelector("#content").scrollIntoView();
  }

  performFilter(): GeneratedData {
    let filteredData = generatedData;

    if (this.search) {
      filteredData = filteredData.filter((row) =>
        row.family.toLowerCase().includes(this.search.toLowerCase())
      );
    }

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

    if (this.selectedVariable === true) {
      filteredData = filteredData.filter((row) => row.variable);
    }

    this.resultsLength = filteredData.length;
    return filteredData.filter((row, index) => {
      const start = (this.curPage - 1) * this.pageSize;
      const end = this.curPage * this.pageSize;
      if (index >= start && index < end) return true;
    });
  }

  cleanUpFonts() {
    const fonts = document.querySelectorAll("link[data-family]");
    fonts.forEach((font) => document.head.removeChild(font));
  }
}

// Define the new element
customElements.define("font-results", FontResults);
