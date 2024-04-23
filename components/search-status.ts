import iconClose from "../svg/close.svg";

const SELECTED_CATEGORY = "selected-category";
const SELECTED_TAG = "selected-tag";
const SELECTED_SUBSET = "selected-subset";
const SELECTED_VARIANT = "selected-variant";
const SELECTED_SEARCH = "selected-search";
const SELECTED_VARIABLE = "selected-variable";

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
        value: this.getAttribute(SELECTED_CATEGORY),
        id: "selectedCategory",
      },
      {
        label: "tag",
        value: this.getAttribute(SELECTED_TAG),
        id: "selectedTag",
      },
      {
        label: "subset",
        value: this.getAttribute(SELECTED_SUBSET),
        id: "selectedSubset",
      },
      {
        label: "variant",
        value: this.getAttribute(SELECTED_VARIANT),
        id: "selectedVariant",
      },
      {
        label: "search",
        value: this.getAttribute(SELECTED_SEARCH),
        id: "selectedSearch",
      },
      {
        label: "variable",
        value: this.getAttribute(SELECTED_VARIABLE),
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
      SELECTED_CATEGORY,
      SELECTED_SUBSET,
      SELECTED_VARIANT,
      SELECTED_TAG,
      SELECTED_SEARCH,
      SELECTED_VARIABLE,
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

  public connectedCallback(): void {
    this.render();
  }
}

customElements.define("search-status", SearchStatus);
