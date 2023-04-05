import generatedData from "../data/data.json";
import filter from "./filter";
import { setAttributes } from "./set-attributes";
export type GeneratedData = typeof generatedData;

class FontResults extends HTMLElement {
  resultsLength: number;
  pageSize: number;
  currentPage: number;

  constructor() {
    super();
    this.addEventListener("next-page", this.handlePage);
    this.addEventListener("previous-page", this.handlePage);
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
<ul class="families">${this.renderFontItems(paginatedData)}</ul>
<pagination-buttons results-length="${resultsLength}" page-size="${
      this.pageSize
    }" current-page="${this.currentPage}"></pagination-buttons>`;
  }

  renderSearchStatus() {
    const searchStatus = document.createElement("search-status");
    setAttributes(searchStatus, {
      "results-length": this.resultsLength.toString(),
      "selected-category": this.selectedCategory,
      "selected-subset": this.selectedSubset,
      "selected-variant": this.selectedVariant,
      "selected-tag": this.selectedTag,
      "selected-search": this.selectedSearch,
      "selected-variable": this.selectedVariable === true ? "true" : "",
    });
    return searchStatus.outerHTML;
  }

  renderFontItems(paginatedData: GeneratedData) {
    const items = [];
    for (const font of paginatedData) {
      const fontItem = document.createElement("li");
      setAttributes(fontItem, {
        is: "font-item",
        font: JSON.stringify(font),
        variant: this.selectedVariant,
        subset: this.selectedSubset,
      });
      items.push(fontItem.outerHTML);
    }
    return items.join("\n");
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
