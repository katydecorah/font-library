const iconClose = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    role="img"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>`;

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

    let elm = `<div>Found ${resultsLength} fonts ${
      hasFilters ? (selectedTag === "need tags" ? ` that ` : ` for `) : ""
    }</div>`;

    if (search) {
      elm += this.filterTag("search", search);
    }
    if (selectedSubset) {
      elm += this.filterTag("subset", selectedSubset);
    }
    if (selectedCategory) {
      elm += this.filterTag("category", selectedCategory);
    }
    if (selectedVariant) {
      elm += this.filterTag("variant", selectedVariant);
    }
    if (selectedTag) {
      elm += this.filterTag("tag", selectedTag);
    }
    if (hasFilters) {
      elm += `<clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>`;
    }

    this.innerHTML = `${elm}`;
  }

  filterTag(param: string, value: string) {
    return `<div class="search-filter">${param}: <strong>${value}</strong><clear-button aria-label="remove ${param}" value="${param}">${iconClose}</clear-button></div>`;
  }
}

customElements.define("search-status", SearchStatus);
