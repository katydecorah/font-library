import iconClose from "../svg/close.svg";

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
    const selectedVariable = this.getAttribute("selectedVariable") === "true";

    const hasFilters =
      selectedCategory ||
      selectedTag ||
      selectedSubset ||
      selectedVariant ||
      selectedVariable ||
      search;

    const elm = [
      `<div>Found ${resultsLength} fonts${hasFilters ? ": " : ""}</div>`,
    ];

    const filterTags = {
      category: selectedCategory,
      tag: selectedTag,
      subset: selectedSubset,
      variant: selectedVariant,
      search: search,
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
