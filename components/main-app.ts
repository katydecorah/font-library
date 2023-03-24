type SelectTypes =
  | "selectedCategory"
  | "selectedSubset"
  | "selectedVariant"
  | "selectedTag"
  | "selectedSearch";

class MainApp extends HTMLElement {
  selectedTag: string;
  selectedCategory: string;
  selectedSubset: string;
  selectedVariant: string;
  selectedSearch: string;
  selectedVariable: boolean;

  constructor() {
    super();

    this.selectedTag = "";
    this.selectedCategory = "";
    this.selectedSubset = "";
    this.selectedVariant = "";
    this.selectedSearch = "";
    this.selectedVariable;

    // Bind methods
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    // Event listeners
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("tag-button-selected", this.handleFilter);
    document.addEventListener("tag-button-selected", this.handleFilter);
    this.addEventListener("filter-select", this.handleFilter);
    this.addEventListener("filter-variable", this.handleFilter);
    document
      .querySelector("#selectedSearch")
      .addEventListener("input", this.handleSearch);

    // Dispatch main-app-loaded
    window.dispatchEvent(new Event("main-app-loaded"));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const fontResults = document.querySelector("#font-results");
    const {
      selectedCategory,
      selectedSubset,
      selectedVariant,
      selectedTag,
      selectedSearch,
      selectedVariable,
    } = this;
    fontResults.innerHTML = `<font-results selected-category="${selectedCategory}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-tag="${selectedTag}" selected-search="${selectedSearch}" selected-variable="${selectedVariable}"></font-results>`;
  }

  clearFilter({ detail: { filter } }: CustomEvent<{ filter: string }>) {
    if (filter) this.removeSingleFilter(filter);
    else this.removeAllFilters();
    this.render();
  }

  removeSingleFilter(filter: string) {
    switch (filter) {
      case "category":
        this.removeSelect("selectedCategory");
        break;
      case "subset":
        this.removeSelect("selectedSubset");
        break;
      case "variant":
        this.removeSelect("selectedVariant");
        break;
      case "tag":
        this.removeSelect("selectedTag");
        break;
      case "search":
        this.removeSearch();
        break;
      case "variable":
        this.removeCheckbox();
        break;
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

  removeSelect(filter: string) {
    window.dispatchEvent(
      new CustomEvent("remove-select", {
        detail: {
          filter,
        },
      })
    );
  }

  removeCheckbox() {
    window.dispatchEvent(new CustomEvent("remove-checkbox"));
  }

  scrollToContent() {
    const contentElement = document.querySelector("#content");
    contentElement.scrollIntoView();
  }

  handleFilter(event: CustomEvent) {
    const { id, value } = event.detail;
    this[id as SelectTypes] = value;
    this.render();
    this.scrollToContent();
  }

  handleSearch(event: Event) {
    this.selectedSearch = (event.target as HTMLInputElement).value.replace(
      /[^a-zA-Z0-9\- ]/g,
      ""
    );
    this.render();
    this.scrollToContent();
  }
}

// Define the new element
customElements.define("main-app", MainApp);
