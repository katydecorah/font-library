import generatedData from "../data/data.json";
export type GeneratedData = typeof generatedData;

class FontResults extends HTMLElement {
  selectedTag: string;
  selectedCategory: string;
  selectedSubset: string;
  selectedVariant: string;
  selectedSearch: string;
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
    this.selectedSearch = this.getAttribute("selected-search");
    this.selectedVariable = this.getAttribute("selected-variable") === "true";
    this.resultsLength;
    this.pageSize = 10;
    this.curPage = 1;

    this.render();
  }

  render() {
    const paginatedData = this.performFilter();
    this.cleanUpFonts();
    const {
      selectedTag,
      selectedCategory,
      selectedSubset,
      selectedVariant,
      selectedSearch,
      selectedVariable,
      resultsLength,
      pageSize,
      curPage,
    } = this;
    const strSelectedVariable = selectedVariable ? "true" : "";

    const searchStatus = `<search-status class="search-status" results-length="${resultsLength}" selected-category="${selectedCategory}" selected-tag="${selectedTag}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-search="${selectedSearch}" selected-variable="${strSelectedVariable}"></search-status>`;

    const fontItems = paginatedData
      .map(
        (font) =>
          `<font-item selected-variant='${selectedVariant}' selected-subset='${selectedSubset}' selected-tag='${selectedTag}' font='${JSON.stringify(
            font
          )}'></font-item>`
      )
      .join("\n");

    const paginationButtons = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${curPage}"></pagination-buttons>`;

    this.innerHTML = `${searchStatus}
<div class="families">${fontItems}</div>
${paginationButtons}`;
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

    if (this.selectedSearch) {
      filteredData = filteredData.filter((row) =>
        row.family.toLowerCase().includes(this.selectedSearch.toLowerCase())
      );
    }

    if (this.selectedTag && this.selectedTag !== "need tags") {
      filteredData = filteredData.filter((row) =>
        row.tags.includes(this.selectedTag)
      );
    }
    if (this.selectedTag === "need tags") {
      filteredData = filteredData.filter((row) => row.tags.length === 0);
    }
    if (this.selectedCategory) {
      filteredData = filteredData.filter(
        (row) => row.category === this.selectedCategory
      );
    }
    if (this.selectedSubset) {
      filteredData = filteredData.filter((row) =>
        row.subsets.includes(this.selectedSubset)
      );
    }
    if (this.selectedVariant) {
      filteredData = filteredData.filter((row) =>
        row.variants.includes(this.selectedVariant)
      );
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
