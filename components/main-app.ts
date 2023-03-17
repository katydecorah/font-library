import filters from "../data/filters.json";

class MainApp extends HTMLElement {
  selectedTag: string;
  selectedCategory: string;
  selectedSubset: string;
  selectedVariant: string;
  search: string;
  selectedVariable: boolean;

  constructor() {
    super();

    this.selectedTag = "";
    this.selectedCategory = "";
    this.selectedSubset = "";
    this.selectedVariant = "";
    this.search = "";
    this.selectedVariable;

    // Event listeners
    this.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.tag)
    );
    this.addEventListener("clear-filter", this.clearFilter);

    // Radio button on click
    const radios = document.querySelectorAll("[name='tag']");
    radios.forEach((radio) => {
      radio.addEventListener("click", (e) => {
        const target = e.target as HTMLInputElement;
        this.selectTag(target.value);
      });
    });

    for (const { select, param, selectVar } of filters) {
      if (select === "#select-tags" || select === "#input-search") continue;
      this.getUrlParams(param, selectVar, select);
      const filterElement = document.querySelector(select);
      filterElement.addEventListener("change", (e) =>
        this.handleFilter(e, selectVar, param)
      );
    }

    // Tags
    this.getUrlParams("tag", "selectedTag", "#select-tags");
    document.querySelector("#select-tags").addEventListener("change", (e) => {
      this.selectTag((e.target as HTMLSelectElement).value);
    });

    // Search
    document.querySelector("#input-search").addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      this.search = target.value.replace(/[^a-zA-Z0-9\- ]/g, "");
      // this.curPage = 1;
      this.render();
    });
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
      search,
      selectedVariable,
    } = this;
    fontResults.innerHTML = `<font-results selected-category="${selectedCategory}" selected-subset="${selectedSubset}" selected-variant="${selectedVariant}" selected-tag="${selectedTag}" search="${search}" selected-variable="${selectedVariable}"></font-results>`;
  }

  getUrlParams(param: string, selectVar: string, selectElement: string) {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(param)) return;
    let newValue: string = urlParams.get(param);
    newValue = newValue.replace(/[^a-zA-Z0-9\- ]/g, "");

    const elm = document.querySelector(selectElement) as
      | HTMLSelectElement
      | HTMLInputElement;

    if (elm instanceof HTMLSelectElement) {
      if (!elm.options.namedItem(newValue)) return;
      Object.assign(this, {
        [selectVar]: newValue,
      });
      elm.value = newValue;
    }

    if (elm instanceof HTMLInputElement) {
      const checked = newValue === "true" ? true : false;
      Object.assign(this, {
        [selectVar]: checked,
      });
      elm.checked = checked;
    }

    if (selectElement === "#select-tags") {
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
    for (const { select, selectVar } of filters) {
      Object.assign(this, {
        [selectVar]: "",
      });

      const elm = document.querySelector(select) as
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
    const { select, selectVar } = filters.find((f) => f.param === filter);
    Object.assign(this, {
      [selectVar]: "",
    });
    const elm = document.querySelector(select) as
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
    (document.querySelector("#select-tags") as HTMLSelectElement).value = tag;
    this.setRadio(tag);
  }

  scrollToContent() {
    const contentElement = document.querySelector("#content");
    contentElement.scrollIntoView();
  }

  handleFilter({ target }: Event, selectVar: string, param: string) {
    const elm = target as HTMLInputElement | HTMLSelectElement;
    const newValue =
      elm.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : (target as HTMLSelectElement).value;

    Object.assign(this, {
      [selectVar]: newValue,
    });
    // this.curPage = 1;
    this.render();
    this.setUrlParams(param, newValue);
  }
}

// Define the new element
customElements.define("main-app", MainApp);
