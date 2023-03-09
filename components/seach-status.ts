import { Fonts } from "./fonts";

class SearchStatus extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const selectedCategory = this.getAttribute("selectedCategory");
    const selectedTag = this.getAttribute("selectedTag");
    const selectedSubset = this.getAttribute("selectedSubset");
    const selectedVariant = this.getAttribute("selectedVariant");
    const search = this.getAttribute("search");
    const resultsLength = this.getAttribute("resultsLength");

    const hasFilters =
      selectedCategory ||
      selectedTag ||
      selectedSubset ||
      selectedVariant ||
      search;
    let elm = "";
    elm += `<div>Found ${resultsLength} fonts`;

    if (hasFilters) {
      elm += selectedTag === "need tags" ? ` that ` : ` for `;
    }

    elm += `</div>`;

    if (search) {
      elm += `<div class="search-filter">search: <strong>${search}</strong></div>`;
    }

    if (selectedSubset) {
      elm += `<div class="search-filter">subset: <strong>${selectedSubset}</strong></div>`;
    }

    if (selectedCategory) {
      elm += `<div class="search-filter">category: <strong>${selectedCategory}</strong></div>`;
    }
    if (selectedVariant) {
      elm += `<div class="search-filter">variant: <strong>${selectedVariant}</strong></div>`;
    }
    if (selectedTag) {
      elm += `<div class="search-filter">tag: <strong>${selectedTag}</strong></div>`;
    }
    if (hasFilters) {
      elm += `<clear-button class="btn btn-clear">Clear</clear-butto>`;
    }

    this.innerHTML = `${elm}`;
  }
}

customElements.define("search-status", SearchStatus);
