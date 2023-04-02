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
  sortBy: string;

  constructor() {
    super();

    this.selectedTag = "";
    this.selectedCategory = "";
    this.selectedSubset = "";
    this.selectedVariant = "";
    this.selectedSearch = "";
    this.selectedVariable;
    this.sortBy = "family";

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
    const {
      selectedCategory,
      selectedSubset,
      selectedVariant,
      selectedTag,
      selectedSearch,
      selectedVariable,
      sortBy,
    } = this;
    fontResults.innerHTML = `<font-results sort-by="${sortBy}" selected-category="${selectedCategory}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-tag="${selectedTag}" selected-search="${selectedSearch}" selected-variable="${selectedVariable}"></font-results>`;
  }

  clearFilter({ detail: { filter } }: CustomEvent<{ filter: string }>) {
    if (filter) this.removeSingleFilter(filter);
    else this.removeAllFilters();
    this.render();
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
    this.selectedSearch = (event.target as HTMLInputElement).value.replaceAll(
      /[^\d A-Za-z-]/g,
      ""
    );
    this.render();
    this.scrollToContent();
  }

  handleSortBy(event: CustomEvent) {
    this.sortBy = event.detail.sortBy;
    this.render();
  }
}

// Define the new element
customElements.define("main-app", MainApp);
