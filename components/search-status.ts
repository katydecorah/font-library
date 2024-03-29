import iconClose from "../svg/close.svg";

class SearchStatus extends HTMLElement {
  constructor() {
    super();
  }

  get resultsLength() {
    return this.getAttribute("results-length");
  }

  get selectedFilters() {
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
        value: this.getAttribute("selected-variable"),
        id: "selectedVariable",
      },
    ].filter(({ value }) => value && value !== "");
  }

  render() {
    const hasSelectedFilters = this.selectedFilters.length > 0;

    const elm = [
      `<div>Found ${this.resultsLength} fonts${
        hasSelectedFilters ? ": " : ""
      }</div>`,
    ];

    if (hasSelectedFilters) {
      elm.push(
        this.selectedFilters
          .map((filter) => this.renderFilter(filter))
          .join(""),
        `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`,
      );
    }

    this.innerHTML = `${elm.join("\n")}`;
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

  static get observedAttributes() {
    return [
      "selected-category",
      "selected-subset",
      "selected-variant",
      "selected-tag",
      "selected-search",
      "selected-variable",
      "results-length",
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, nextValue: string) {
    if (oldValue === nextValue) return;
    this.render();
  }
}

customElements.define("search-status", SearchStatus);
