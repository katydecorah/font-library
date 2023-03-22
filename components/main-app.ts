import filters from "../_data/metadata.json";
export type Filters = typeof filters;

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

    // Event listeners
    this.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.value)
    );
    document.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.value)
    );
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("filter-select", this.handleFilter);
    this.addEventListener("filter-variable", this.handleVariable);

    for (const { param, selectVar } of filters) {
      if (selectVar === "selectedSearch") continue;
      this.getUrlParams(param, selectVar);
    }

    document
      .querySelector("#selectedSearch")
      .addEventListener("input", this.handleSearch);
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

  getUrlParams(param: string, selectVar: string) {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(param)) return;
    let newValue: string = urlParams.get(param);
    newValue = newValue.replace(/[^a-zA-Z0-9\- ]/g, "");

    const elm = document.querySelector(`#${selectVar}`) as
      | HTMLSelectElement
      | HTMLInputElement;

    if (elm instanceof HTMLSelectElement) {
      if (!elm.options.namedItem(newValue)) return;
      Object.assign(this, {
        [selectVar]: newValue,
      });
    }

    if (elm instanceof HTMLInputElement) {
      const checked = newValue === "true" ? true : false;
      Object.assign(this, {
        [selectVar]: checked,
      });
    }
  }

  clearFilter({ detail: { filter } }: CustomEvent<{ filter: string }>) {
    if (filter) {
      this.removeSingleFilter(filter);
    } else {
      this.removeAllFilters();
    }
    // this.curPage = 1;
    this.render();
  }

  removeAllFilters() {
    for (const { selectVar } of filters) {
      Object.assign(this, {
        [selectVar]: "",
      });

      const elm = document.querySelector(`#${selectVar}`) as
        | HTMLInputElement
        | HTMLSelectElement;

      if (elm.value) {
        elm.value = "";
      }
      if (elm instanceof HTMLInputElement && elm.checked) {
        elm.checked = false;
      }
    }
    // Reset radio buttons
    this.resetRadioTags();
    // Reset URL
    window.history.pushState({}, "", `${window.location.pathname}`);
  }

  removeSingleFilter(filter: string) {
    const { selectVar } = filters.find((f) => f.param === filter);
    Object.assign(this, {
      [selectVar]: "",
    });
    const elm = document.querySelector(`#${selectVar}`) as
      | HTMLInputElement
      | HTMLSelectElement;

    if (elm.value) {
      elm.value = "";
    }
    if (elm instanceof HTMLInputElement && elm.checked) {
      elm.checked = false;
    }

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(filter);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
    if (filter === "tag") {
      this.resetRadioTags();
    }
  }

  resetRadioTags() {
    // Reset radio buttons
    const radios = document.querySelectorAll("[name='tag']");
    radios.forEach((radio: HTMLInputElement) => {
      radio.checked = false;
    });
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.render();
    this.scrollToContent();
    (document.querySelector("#selectedTag") as HTMLSelectElement).value = tag;
    // set radio button
    const radio = document.querySelector(
      `[value='${tag}']`
    ) as HTMLInputElement;
    radio.checked = true;
  }

  scrollToContent() {
    const contentElement = document.querySelector("#content");
    contentElement.scrollIntoView();
  }

  handleFilter(event: CustomEvent) {
    const { id, value } = event.detail;
    Object.assign(this, {
      [id]: value,
    });
    this.render();
  }

  handleVariable(event: CustomEvent) {
    const { value } = event.detail;
    Object.assign(this, {
      selectedVariable: value,
    });
    this.render();
  }

  handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this.selectedSearch = target.value.replace(/[^a-zA-Z0-9\- ]/g, "");
    this.render();
  }
}

// Define the new element
customElements.define("main-app", MainApp);
