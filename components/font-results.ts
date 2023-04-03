import generatedData from "../data/data.json";
import filter from "./filter";
export type GeneratedData = typeof generatedData;

class FontResults extends HTMLElement {
  resultsLength: number;
  pageSize: number;
  currentPage: number;

  constructor() {
    super();
    this.addEventListener("next-page", this.handlePage);
    this.addEventListener("previous-page", this.handlePage);
    this.renderFontItem = this.renderFontItem.bind(this);
  }

  get selectedTag() {
    return this.getAttribute("selected-tag");
  }

  get selectedCategory() {
    return this.getAttribute("selected-category");
  }

  get selectedSubset() {
    return this.getAttribute("selected-subset");
  }

  get selectedVariant() {
    return this.getAttribute("selected-variant");
  }

  get selectedSearch() {
    return this.getAttribute("selected-search");
  }

  get selectedVariable() {
    return this.getAttribute("selected-variable") === "true";
  }

  get sortBy() {
    return this.getAttribute("sort-by");
  }

  connectedCallback() {
    this.resultsLength;
    this.pageSize = 10;
    this.currentPage = 1;
    this.render();
  }

  render() {
    const [resultsLength, paginatedData] = filter(this, generatedData);
    this.resultsLength = resultsLength;

    this.innerHTML = `${this.renderSearchStatus()}
<sort-by sort-by=${this.sortBy}></sort-by>
<ul class="families">${paginatedData
      .map((font) => this.renderFontItem(font))
      .join("\n")}</ul>
<pagination-buttons results-length="${resultsLength}" page-size="${
      this.pageSize
    }" current-page="${this.currentPage}"></pagination-buttons>`;
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
    const stringSelectedVariable = selectedVariable ? "true" : "";

    return `<search-status class="search-status" results-length="${resultsLength}" selected-category="${selectedCategory}" selected-tag="${selectedTag}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-search="${selectedSearch}" selected-variable="${stringSelectedVariable}"></search-status>`;
  }

  renderFontItem(font: GeneratedData[number]) {
    const { selectedVariant, selectedSubset, selectedTag } = this;
    return `<li is="font-item" selected-variant='${selectedVariant}' selected-subset='${selectedSubset}' selected-tag='${selectedTag}' font='${JSON.stringify(
      font
    )}'></li>`;
  }

  handlePage({ type }: CustomEvent) {
    if (
      type === "next-page" &&
      this.currentPage * this.pageSize < this.resultsLength
    ) {
      this.currentPage++;
    }
    if (type === "previous-page" && this.currentPage > 1) {
      this.currentPage--;
    }
    this.render();
    // scroll to #content
    document.querySelector("#content").scrollIntoView();
  }
}

// Define the new element
customElements.define("font-results", FontResults);
