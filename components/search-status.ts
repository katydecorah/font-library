import iconClose from "../svg/close.svg";

class SearchStatus extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const selectedCategory = this.getAttribute("selected-category");
    const selectedTag = this.getAttribute("selected-tag");
    const selectedSubset = this.getAttribute("selected-subset");
    const selectedVariant = this.getAttribute("selected-variant");
    const selectedSearch = this.getAttribute("selected-search");
    const resultsLength = this.getAttribute("results-length");
    const selectedVariable = this.getAttribute("selected-variable") === "true";

    const hasFilters =
      selectedCategory ||
      selectedTag ||
      selectedSubset ||
      selectedVariant ||
      selectedVariable ||
      selectedSearch;

    const elm = [
      `<div>Found ${resultsLength} fonts${hasFilters ? ": " : ""}</div>`,
    ];

    const filterTags = {
      category: selectedCategory,
      tag: selectedTag,
      subset: selectedSubset,
      variant: selectedVariant,
      search: selectedSearch,
      variable: selectedVariable,
    };

    for (const [key, value] of Object.entries(filterTags)) {
      if (value) {
        elm.push(
          `<div class="search-filter">${key}${
            key === "variable" ? "" : `: <strong>${value}</strong>`
          }<button is="clear-button" aria-label="remove ${key}" value="${key}">${iconClose}</button></div>`
        );
      }
    }

    if (hasFilters) {
      elm.push(
        `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`
      );
    }

    this.innerHTML = `${elm.join("\n")}`;
  }
}

customElements.define("search-status", SearchStatus);
