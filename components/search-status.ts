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

    const filters = [
      {
        label: "category",
        value: selectedCategory,
        id: "selectedCategory",
      },
      {
        label: "tag",
        value: selectedTag,
        id: "selectedTag",
      },
      {
        label: "subset",
        value: selectedSubset,
        id: "selectedSubset",
      },
      {
        label: "variant",
        value: selectedVariant,
        id: "selectedVariant",
      },
      {
        label: "search",
        value: selectedSearch,
        id: "selectedSearch",
      },
      {
        label: "variable",
        value: selectedVariable,
        id: "selectedVariable",
      },
    ];

    const selectedFilters = filters.filter(({ value }) => value);
    const hasSelectedFilters = selectedFilters.length > 0;

    const elm = [
      `<div>Found ${resultsLength} fonts${
        hasSelectedFilters ? ": " : ""
      }</div>`,
    ];

    for (const { label, value, id } of selectedFilters) {
      elm.push(
        `<div class="search-filter">${label}${
          label === "variable" ? "" : `: <strong>${value}</strong>`
        }<button is="clear-button" aria-label="remove ${label}" value="${id}">${iconClose}</button></div>`
      );
    }

    if (hasSelectedFilters) {
      elm.push(
        `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`
      );
    }

    this.innerHTML = `${elm.join("\n")}`;
  }
}

customElements.define("search-status", SearchStatus);
