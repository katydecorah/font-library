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
    class="feather feather-x"
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

    let elm = "";
    elm += `<div>Found ${resultsLength} fonts`;

    if (hasFilters) {
      elm += selectedTag === "need tags" ? ` that ` : ` for `;
    }

    elm += `</div>`;

    if (search) {
      elm += `<div class="search-filter">search: <strong>${search}</strong> <clear-button aria-label="remove search" value="search">${iconClose}</clear-button></div>`;
    }

    if (selectedSubset) {
      elm += `<div class="search-filter">subset: <strong>${selectedSubset}</strong> <clear-button aria-label="remove subset" value="subset">${iconClose}</clear-button></div>`;
    }

    if (selectedCategory) {
      elm += `<div class="search-filter">category: <strong>${selectedCategory}</strong> <clear-button aria-label="remove category" value="category">${iconClose}</clear-button></div>`;
    }
    if (selectedVariant) {
      elm += `<div class="search-filter">variant: <strong>${selectedVariant}</strong> <clear-button aria-label="remove variant" value="variant">${iconClose}</clear-button></div>`;
    }
    if (selectedTag) {
      elm += `<div class="search-filter">tag: <strong>${selectedTag}</strong> <clear-button aria-label="remove tag" value="tag">${iconClose}</clear-button></div>`;
    }
    if (hasFilters) {
      elm += `<clear-button  aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>`;
    }

    this.innerHTML = `${elm}`;
  }
}

customElements.define("search-status", SearchStatus);
