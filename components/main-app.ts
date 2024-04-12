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
  private paginationButtons: HTMLElement =
    this.querySelector("pagination-buttons");
  private searchStatus: HTMLElement = this.querySelector("search-status");
  private sortByElm: HTMLElement = this.querySelector("sort-by");
  private fontList: HTMLUListElement = this.querySelector("ul[is=font-list]");
  private content: HTMLElement = this.querySelector("#content");
  private selectedSearchElm: HTMLInputElement =
    this.querySelector("#selectedSearch");

  public get pageSize(): number {
    return 10;
  }

  public get currentPage(): number {
    return Number.parseInt(this.getAttribute("current-page"));
  }

  private set currentPage(value: number) {
    const elements = [this, this.paginationButtons];
    for (const element of elements) {
      element.setAttribute("current-page", value.toString());
    }
  }

  private set resultsLength(value: number) {
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

  private get resultsLength(): number {
    return Number.parseInt(this.getAttribute("results-length"));
  }

  public get selectedCategory(): string {
    return this.getAttribute("selected-category");
  }

  private set selectedCategory(value: string) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      element.setAttribute("selected-category", value);
    }
  }

  public get selectedSubset(): string {
    return this.getAttribute("selected-subset");
  }

  private set selectedSubset(value: string) {
    const elements = [this, this.searchStatus, this.fontList];
    for (const element of elements) {
      element.setAttribute("selected-subset", value);
    }
  }

  public get selectedVariant(): string {
    return this.getAttribute("selected-variant");
  }

  private set selectedVariant(value: string) {
    const elements = [this, this.searchStatus, this.fontList];
    for (const element of elements) {
      element.setAttribute("selected-variant", value);
    }
  }

  public get selectedTag(): string {
    return this.getAttribute("selected-tag");
  }

  private set selectedTag(value: string) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      element.setAttribute("selected-tag", value);
    }
  }

  public get selectedSearch(): string {
    return this.getAttribute("selected-search");
  }

  private set selectedSearch(value: string) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      element.setAttribute("selected-search", value);
    }
  }

  public get selectedVariable(): boolean {
    return this.getAttribute("selected-variable") === "true";
  }

  private set selectedVariable(value: boolean) {
    const elements = [this, this.searchStatus];
    for (const element of elements) {
      if (value === true) element.setAttribute("selected-variable", "true");
      else element.removeAttribute("selected-variable");
    }
  }

  public get sortBy(): string {
    return this.getAttribute("sort-by") || "family";
  }

  public constructor() {
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

  private render(): void {
    const [resultsLength, paginatedData] = filter(this, generatedData);

    if (this.resultsLength !== resultsLength) {
      this.resultsLength = resultsLength;
    }

    this.fontList.setAttribute("fonts", JSON.stringify(paginatedData));
  }

  private clearFilter({
    detail: { value },
  }: CustomEvent<{ value: string }>): void {
    if (value) this.removeSingleFilter(value);
    else this.removeAllFilters();
  }

  private removeSingleFilter(filter: string): void {
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

  private removeAllFilters(): void {
    if (this.selectedCategory) this.removeSelect("selectedCategory");
    if (this.selectedSubset) this.removeSelect("selectedSubset");
    if (this.selectedVariant) this.removeSelect("selectedVariant");
    if (this.selectedVariable) this.removeCheckbox();
    if (this.selectedTag) this.removeSelect("selectedTag");
    if (this.selectedSearch) this.removeSearch();
  }

  private removeSearch(): void {
    this.selectedSearch = "";
    (this.selectedSearchElm as HTMLInputElement).value = "";
  }

  private removeSelect(value: string): void {
    window.dispatchEvent(
      customEvent("remove-select", {
        value,
      }),
    );
  }

  private removeCheckbox(): void {
    window.dispatchEvent(customEvent("remove-checkbox"));
  }

  private scrollToContent(): void {
    this.content.scrollIntoView();
  }

  private handleFilter(event: CustomEvent): void {
    const { id, value } = event.detail;
    this[id as SelectTypes] = value;
    this.scrollToContent();
  }

  private handleSearch(event: Event): void {
    this.selectedSearch = (event.target as HTMLInputElement).value.replaceAll(
      /[^\d A-Za-z-]/g,
      "",
    );
    this.scrollToContent();
  }

  public static get observedAttributes(): string[] {
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

  public attributeChangedCallback(
    name: string,
    previousValue: string,
    nextValue: string,
  ): void {
    if (previousValue === nextValue) return;
    if (name !== "current-page" && this.currentPage !== 1) {
      this.currentPage = 1;
    }
    this.render();
  }
}

customElements.define("main-app", MainApp);
