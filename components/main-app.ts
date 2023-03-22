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
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    // Event listeners
    this.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.value)
    );
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("filter-select", this.handleFilter);

    // Radio button on click
    const radios = document.querySelectorAll("[name='tag']");
    radios.forEach((radio) => {
      radio.addEventListener("click", (e) => {
        const target = e.target as HTMLInputElement;
        this.selectTag(target.value);
      });
    });

    for (const { param, selectVar } of filters) {
      if (selectVar === "selectedSearch") continue;
      this.getUrlParams(param, selectVar);
    }

    document
      .querySelector("#selectedSearch")
      .addEventListener("input", this.handleSearch);

    document
      .querySelector("#selectedVariable")
      .addEventListener("change", this.handleCheckbox);
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
      selectedSearch: search,
      selectedVariable,
    } = this;
    fontResults.innerHTML = `<font-results selected-category="${selectedCategory}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-tag="${selectedTag}" search="${search}" selected-variable="${selectedVariable}"></font-results>`;
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
      elm.checked = checked;
    }

    if (param === "tag") {
      this.setRadio(newValue);
    }
  }

  setRadio(tag: string) {
    // set radio button
    const radio = document.querySelector(
      `[value='${tag}']`
    ) as HTMLInputElement;
    radio.checked = true;
  }

  setUrlParams(param: string, value: string | boolean) {
    const urlParams = new URLSearchParams(window.location.search);
    // only set variable if it's true
    if (param === "variable" && value === false) {
      urlParams.delete(param);
    } else {
      urlParams.set(param, value.toString());
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
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
    // this.curPage = 1;
    this.render();
    // set URL query string with tag
    this.setUrlParams("tag", tag);
    this.scrollToContent();
    (document.querySelector("#selectedTag") as HTMLSelectElement).value = tag;
    this.setRadio(tag);
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

  handleCheckbox() {
    const value = (
      document.querySelector("#selectedVariable") as HTMLInputElement
    ).checked;
    Object.assign(this, {
      selectedVariable: value,
    });
    this.render();
    this.setUrlParams("variable", value);
  }

  handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this.selectedSearch = target.value.replace(/[^a-zA-Z0-9\- ]/g, "");
    this.render();
  }
}

// Define the new element
customElements.define("main-app", MainApp);
