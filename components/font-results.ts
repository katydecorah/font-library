import generatedData from "../data/data.json";
import filter from "./filter";
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
  sortBy: string;

  constructor() {
    super();
    this.addEventListener("next-page", this.handlePage);
    this.addEventListener("previous-page", this.handlePage);
    this.renderfontItem = this.renderfontItem.bind(this);
  }

  connectedCallback() {
    this.selectedTag = this.getAttribute("selected-tag");
    this.selectedCategory = this.getAttribute("selected-category");
    this.selectedSubset = this.getAttribute("selected-subset");
    this.selectedVariant = this.getAttribute("selected-variant");
    this.selectedSearch = this.getAttribute("selected-search");
    this.selectedVariable = this.getAttribute("selected-variable") === "true";
    this.sortBy = this.getAttribute("sort-by");
    this.resultsLength;
    this.pageSize = 10;
    this.curPage = 1;
    this.render();
  }

  render() {
    const [resultsLength, paginatedData] = filter(this, generatedData);
    this.resultsLength = resultsLength;

    this.innerHTML = `${this.renderSearchStatus()}
<sort-by sort-by=${this.sortBy}></sort-by>
<div class="families">${paginatedData.map(this.renderfontItem).join("\n")}</div>
<pagination-buttons results-length="${resultsLength}" page-size="${
      this.pageSize
    }" current-page="${this.curPage}"></pagination-buttons>`;
  }

  renderSearchStatus() {
    const {
      selectedTag,
      selectedCategory,
      selectedSubset,
      selectedVariant,
      selectedSearch,
      selectedVariable,
      resultsLength,
    } = this;
    const strSelectedVariable = selectedVariable ? "true" : "";

    return `<search-status class="search-status" results-length="${resultsLength}" selected-category="${selectedCategory}" selected-tag="${selectedTag}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-search="${selectedSearch}" selected-variable="${strSelectedVariable}"></search-status>`;
  }

  renderfontItem(font: GeneratedData[number]) {
    const { selectedVariant, selectedSubset, selectedTag } = this;
    return `<font-item selected-variant='${selectedVariant}' selected-subset='${selectedSubset}' selected-tag='${selectedTag}' font='${JSON.stringify(
      font
    )}'></font-item>`;
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
}

// Define the new element
customElements.define("font-results", FontResults);
