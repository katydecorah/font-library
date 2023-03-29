import iconClose from "../svg/close.svg";

class SearchStatus extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const selectedFilters = this.selectedFilters();
    const hasSelectedFilters = selectedFilters.length > 0;

    const elm = [
      `<div>Found ${this.getAttribute("results-length")} fonts${
        hasSelectedFilters ? ": " : ""
      }</div>`,
    ];

    if (hasSelectedFilters) {
      elm.push(selectedFilters.map(this.renderFilter).join(""));
      elm.push(
        `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`
      );
    }

    this.innerHTML = `${elm.join("\n")}`;
  }

  selectedFilters() {
    return [
      {
        label: "category",
        value: this.getAttribute("selected-category"),
        id: "selectedCategory",
      },
      {
        label: "tag",
        value: this.getAttribute("selected-tag"),
        id: "selectedTag",
      },
      {
        label: "subset",
        value: this.getAttribute("selected-subset"),
        id: "selectedSubset",
      },
      {
        label: "variant",
        value: this.getAttribute("selected-variant"),
        id: "selectedVariant",
      },
      {
        label: "search",
        value: this.getAttribute("selected-search"),
        id: "selectedSearch",
      },
      {
        label: "variable",
        value: this.getAttribute("selected-variable") === "true",
        id: "selectedVariable",
      },
    ].filter(({ value }) => value);
  }

  renderFilter({
    label,
    value,
    id,
  }: {
    label: string;
    value: string | boolean;
    id: string;
  }) {
    const filterValue =
      label === "variable" ? "" : `: <strong>${value}</strong>`;

    return `<div class="search-filter">${label}${filterValue}<button is="clear-button" aria-label="remove ${label}" value="${id}">${iconClose}</button></div>`;
  }
}

customElements.define("search-status", SearchStatus);
