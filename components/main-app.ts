import customEvent from "./custom-event";
import filter from "./filter";
import generatedData from "../data/data.json";
export type GeneratedData = typeof generatedData;

type SelectTypes =
  | "selectedCategory"
  | "selectedSubset"
  | "selectedVariant"
  | "selectedTag"
  | "selectedSearch";

class MainApp extends HTMLElement {
  paginationButtons: HTMLElement = this.querySelector("pagination-buttons");
  searchStatus: HTMLElement = this.querySelector("search-status");
  sortByElm: HTMLElement = this.querySelector("sort-by");
  fontList: HTMLUListElement = this.querySelector("ul[is=font-list]");
  content: HTMLElement = this.querySelector("#content");
  selectedSearchElm: HTMLInputElement = this.querySelector("#selectedSearch");

  get pageSize() {
    return 10;
  }

  get currentPage() {
    return Number.parseInt(this.getAttribute("current-page"));
  }

  set currentPage(value: number) {
    const elements = [this, this.paginationButtons];
    for (const element of elements) {
      element.setAttribute("current-page", value.toString());
    }
  }

  set resultsLength(value: number) {
    const elements = [
      this,
      this.paginationButtons,
      this.searchStatus,
      this.sortByElm,
    ];
    for (const element of elements) {
      element.setAttribute("results-length", value.toString());
    }
  }

  get resultsLength() {
    return Number.parseInt(this.getAttribute("results-length"));
  }

  get selectedCategory() {
    return this.getAttribute("selected-category");
  }

  set selectedCategory(value: string) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      element.setAttribute("selected-category", value);
    }
  }

  get selectedSubset() {
    return this.getAttribute("selected-subset");
  }

  set selectedSubset(value: string) {
    const elements = [this, this.searchStatus, this.fontList];
    for (const element of elements) {
      element.setAttribute("selected-subset", value);
    }
  }

  get selectedVariant() {
    return this.getAttribute("selected-variant");
  }

  set selectedVariant(value: string) {
    const elements = [this, this.searchStatus, this.fontList];
    for (const element of elements) {
      element.setAttribute("selected-variant", value);
    }
  }

  get selectedTag() {
    return this.getAttribute("selected-tag");
  }

  set selectedTag(value: string) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      element.setAttribute("selected-tag", value);
    }
  }

  get selectedSearch() {
    return this.getAttribute("selected-search");
  }

  set selectedSearch(value: string) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      element.setAttribute("selected-search", value);
    }
  }

  get selectedVariable() {
    return this.getAttribute("selected-variable") === "true";
  }

  set selectedVariable(value: boolean) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      if (value === true) element.setAttribute("selected-variable", "true");
      else element.removeAttribute("selected-variable");
    }
  }

  get sortBy() {
    return this.getAttribute("sort-by") || "family";
  }

  constructor() {
    super();

    // Bind methods
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    // Event listeners
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("tag-button-selected", this.handleFilter);
    this.addEventListener("handle-filter", this.handleFilter);
    this.selectedSearchElm.addEventListener("input", this.handleSearch);

    // Dispatch main-app-loaded
    window.dispatchEvent(new Event("main-app-loaded"));
  }

  render() {
    const [resultsLength, paginatedData] = filter(this, generatedData);

    if (this.resultsLength !== resultsLength) {
      this.resultsLength = resultsLength;
    }

    this.fontList.setAttribute("fonts", JSON.stringify(paginatedData));
  }

  clearFilter({ detail: { value } }: CustomEvent<{ value: string }>) {
    if (value) this.removeSingleFilter(value);
    else this.removeAllFilters();
  }

  removeSingleFilter(filter: string) {
    switch (filter) {
      case "selectedSearch": {
        this.removeSearch();
        break;
      }
      case "selectedVariable": {
        this.removeCheckbox();
        break;
      }
      default: {
        this.removeSelect(filter);
      }
    }
  }

  removeAllFilters() {
    if (this.selectedCategory) this.removeSelect("selectedCategory");
    if (this.selectedSubset) this.removeSelect("selectedSubset");
    if (this.selectedVariant) this.removeSelect("selectedVariant");
    if (this.selectedVariable) this.removeCheckbox();
    if (this.selectedTag) this.removeSelect("selectedTag");
    if (this.selectedSearch) this.removeSearch();
  }

  removeSearch() {
    this.selectedSearch = "";
    (this.selectedSearchElm as HTMLInputElement).value = "";
  }

  removeSelect(value: string) {
    window.dispatchEvent(
      customEvent("remove-select", {
        value,
      })
    );
  }

  removeCheckbox() {
    window.dispatchEvent(customEvent("remove-checkbox"));
  }

  scrollToContent() {
    this.content.scrollIntoView();
  }

  handleFilter(event: CustomEvent) {
    const { id, value } = event.detail;
    this[id as SelectTypes] = value;
    this.scrollToContent();
  }

  handleSearch(event: Event) {
    this.selectedSearch = (event.target as HTMLInputElement).value.replaceAll(
      /[^\d A-Za-z-]/g,
      ""
    );
    this.scrollToContent();
  }

  static get observedAttributes() {
    return [
      "selected-category",
      "selected-subset",
      "selected-variant",
      "selected-tag",
      "selected-search",
      "selected-variable",
      "sort-by",
      "current-page",
      "results-length",
    ];
  }

  attributeChangedCallback(
    name: string,
    previousValue: string,
    nextValue: string
  ) {
    if (previousValue === nextValue) return;
    if (name !== "current-page" && this.currentPage !== 1) {
      this.currentPage = 1;
    }
    this.render();
  }
}

customElements.define("main-app", MainApp);
