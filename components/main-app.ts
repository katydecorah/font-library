import customEvent from "./custom-event";
import { setAttributes } from "./set-attributes";

type SelectTypes =
  | "selectedCategory"
  | "selectedSubset"
  | "selectedVariant"
  | "selectedTag"
  | "selectedSearch";

class MainApp extends HTMLElement {
  get selectedCategory() {
    return this.getAttribute("selected-category") || "";
  }

  set selectedCategory(value: string) {
    this.setAttribute("selected-category", value);
  }

  get selectedSubset() {
    return this.getAttribute("selected-subset") || "";
  }

  set selectedSubset(value: string) {
    this.setAttribute("selected-subset", value);
  }

  get selectedVariant() {
    return this.getAttribute("selected-variant") || "";
  }

  set selectedVariant(value: string) {
    this.setAttribute("selected-variant", value);
  }

  get selectedTag() {
    return this.getAttribute("selected-tag") || "";
  }

  set selectedTag(value: string) {
    this.setAttribute("selected-tag", value);
  }

  get selectedSearch() {
    return this.getAttribute("selected-search") || "";
  }

  set selectedSearch(value: string) {
    this.setAttribute("selected-search", value);
  }

  get selectedVariable() {
    return this.getAttribute("selected-variable") === "true";
  }

  set selectedVariable(value: boolean) {
    this.setAttribute("selected-variable", value.toString());
  }

  get sortBy() {
    return this.getAttribute("sort-by") || "family";
  }

  set sortBy(value: string) {
    this.setAttribute("sort-by", value);
  }

  constructor() {
    super();

    // Bind methods
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    // Event listeners
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("tag-button-selected", this.handleFilter);
    document.addEventListener("tag-button-selected", this.handleFilter);
    this.addEventListener("handle-filter", this.handleFilter);
    document
      .querySelector("#selectedSearch")
      .addEventListener("input", this.handleSearch);
    this.addEventListener("sort-by", this.handleSortBy);

    // Dispatch main-app-loaded
    window.dispatchEvent(new Event("main-app-loaded"));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const fontResults = document.querySelector("#font-results");

    const fontResultsElm = document.createElement("font-results");

    setAttributes(fontResultsElm, {
      "sort-by": this.sortBy,
      "selected-category": this.selectedCategory,
      "selected-subset": this.selectedSubset,
      "selected-variant": this.selectedVariant,
      "selected-tag": this.selectedTag,
      "selected-search": this.selectedSearch,
      "selected-variable": this.selectedVariable === true ? "true" : "",
    });

    fontResults.innerHTML = fontResultsElm.outerHTML;
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
    (document.querySelector("#selectedSearch") as HTMLInputElement).value = "";
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
    const contentElement = document.querySelector("#content");
    contentElement.scrollIntoView();
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

  handleSortBy(event: CustomEvent) {
    this.sortBy = event.detail.value;
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
    ];
  }

  attributeChangedCallback(
    name: string,
    previousValue: string,
    nextValue: string
  ) {
    if (previousValue === nextValue) return;
    this.render();
  }
}

// Define the new element
customElements.define("main-app", MainApp);
