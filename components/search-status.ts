import iconClose from "../svg/close.svg";

class SearchStatus extends HTMLElement {
  private get resultsLength(): string {
    return this.getAttribute("results-length");
  }

  private get selectedFilters(): {
    label: string;
    value: string;
    id: string;
  }[] {
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

  private render(): void {
    const hasSelectedFilters = this.selectedFilters.length > 0;

    const elm = [
      `<div>Found ${this.resultsLength} fonts${
        hasSelectedFilters ? ": " : ""
      }</div>`,
    ];

    if (hasSelectedFilters) {
      elm.push(
        this.selectedFilters
          .map((filter): string => SearchStatus.renderFilter(filter))
          .join(""),
        `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`,
      );
    }

    this.innerHTML = `${elm.join("\n")}`;
  }

  private static renderFilter({
    label,
    value,
    id,
  }: {
    label: string;
    value: string | boolean;
    id: string;
  }): string {
    const filterValue =
      label === "variable" ? "" : `: <strong>${value}</strong>`;

    return `<div class="search-filter">${label}${filterValue}<button is="clear-button" aria-label="remove ${label}" value="${id}">${iconClose}</button></div>`;
  }

  public static get observedAttributes(): string[] {
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

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    nextValue: string,
  ): void {
    if (oldValue === nextValue) return;
    this.render();
  }
}

customElements.define("search-status", SearchStatus);
