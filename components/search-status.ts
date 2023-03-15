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

    const hasFilters =
      selectedCategory ||
      selectedTag ||
      selectedSubset ||
      selectedVariant ||
      search;

    const elm = [
      `<div>Found ${resultsLength} fonts ${
        hasFilters ? (selectedTag === "need tags" ? "that" : "for") : ""
      }</div>`,
    ];

    const filterTags = {
      category: selectedCategory,
      tag: selectedTag,
      subset: selectedSubset,
      variant: selectedVariant,
      search: search,
    };

    for (const [key, value] of Object.entries(filterTags)) {
      if (value) {
        elm.push(this.filterTag(key, value));
      }
    }

    if (hasFilters) {
      elm.push(
        `<clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>`
      );
    }

    this.innerHTML = `${elm.join("\n")}`;
  }

  filterTag(param: string, value: string) {
    return `<div class="search-filter">${param}: <strong>${value}</strong><clear-button aria-label="remove ${param}" value="${param}">${iconClose}</clear-button></div>`;
  }
}

customElements.define("search-status", SearchStatus);
