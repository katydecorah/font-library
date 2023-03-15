// https://www.raymondcamden.com/2022/05/23/building-table-sorting-and-pagination-in-a-web-component
import generatedData from "../data/data.json";
export type GeneratedData = typeof generatedData;

const filters = [
  {
    select: "#select-categories",
    param: "category",
    selectVar: "selectedCategory",
  },
  {
    select: "#select-subsets",
    param: "subset",
    selectVar: "selectedSubset",
  },
  {
    select: "#select-variants",
    param: "variant",
    selectVar: "selectedVariant",
  },
  {
    select: "#select-tags",
    param: "tag",
    selectVar: "selectedTag",
  },
  {
    select: "#input-search",
    param: "search",
    selectVar: "search",
  },
  {
    select: "#checkbox-variable",
    param: "variable",
    selectVar: "selectedVariable",
  },
];

class FontResults extends HTMLElement {
  selectedTag: string;
  selectedCategory: string;
  selectedSubset: string;
  selectedVariant: string;
  search: string;
  resultsLength: number;
  pageSize: number;
  curPage: number;
  selectedVariable: boolean;

  constructor() {
    super();

    this.selectedTag = "";
    this.selectedCategory = "";
    this.selectedSubset = "";
    this.selectedVariant = "";
    this.search = "";
    this.resultsLength;
    this.pageSize = 10;
    this.curPage = 1;
    this.selectedVariable;

    // Event listeners
    this.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.tag)
    );
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("next-page", this.handlePage);
    this.addEventListener("previous-page", this.handlePage);

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
      this.curPage = 1;
      this.render();
    });
  }

  connectedCallback() {
    this.render();
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
    this.curPage = 1;
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

  performFilter(): GeneratedData {
    let filteredData = generatedData;

    if (this.search) {
      filteredData = filteredData.filter((row) =>
        row.family.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    if (this.selectedTag && this.selectedTag !== "need tags") {
      filteredData = filteredData.filter((row) =>
        row.tags.includes(this.selectedTag)
      );
    }
    if (this.selectedTag === "need tags") {
      filteredData = filteredData.filter((row) => {
        return row.tags.length === 0;
      });
    }
    if (this.selectedCategory) {
      filteredData = filteredData.filter((row) => {
        return row.category === this.selectedCategory;
      });
    }
    if (this.selectedSubset) {
      filteredData = filteredData.filter((row) => {
        return row.subsets.includes(this.selectedSubset);
      });
    }
    if (this.selectedVariant) {
      filteredData = filteredData.filter((row) => {
        return row.variants.includes(this.selectedVariant);
      });
    }

    if (this.selectedVariable === true) {
      filteredData = filteredData.filter((row) => row.variable);
    }

    this.resultsLength = filteredData.length;
    return filteredData.filter((row, index) => {
      const start = (this.curPage - 1) * this.pageSize;
      const end = this.curPage * this.pageSize;
      if (index >= start && index < end) return true;
    });
  }

  render() {
    const paginatedData = this.performFilter();
    this.cleanUpFonts();
    this.renderSearchStatus();
    this.renderPagination();

    this.querySelector("#families").innerHTML = paginatedData
      .map(
        (font) =>
          `<font-item selectedVariant='${
            this.selectedVariant
          }' selectedSubset='${this.selectedSubset}' selectedTag='${
            this.selectedTag
          }' font='${JSON.stringify(font)}'></font-item>`
      )
      .join("\n");
  }

  renderSearchStatus() {
    const {
      selectedTag,
      selectedCategory,
      selectedSubset,
      selectedVariant,
      selectedVariable,
      resultsLength,
      search,
    } = this;
    const strSelectedVariable = selectedVariable ? "true" : "";
    this.querySelector(
      "#search-status"
    ).innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}" selectedVariable="${strSelectedVariable}"></search-status>`;
  }

  renderPagination() {
    const { resultsLength, pageSize, curPage } = this;
    this.querySelector(
      "#pagination"
    ).innerHTML = `<pagination-buttons resultsLength="${resultsLength}" pageSize="${pageSize}" currentPage="${curPage}"></pagination-buttons>`;
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.curPage = 1;
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

  handlePage({ type }: CustomEvent) {
    if (
      type === "next-page" &&
      this.curPage * this.pageSize < this.resultsLength
    ) {
      this.curPage++;
    }
    if (type === "previous-page" && this.curPage > 1) {
      this.curPage--;
    }
    this.render();
    this.scrollToContent();
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
    this.curPage = 1;
    this.render();
    this.setUrlParams(param, newValue);
  }

  cleanUpFonts() {
    const fonts = document.querySelectorAll("link[data-family]");
    fonts.forEach((font) => document.head.removeChild(font));
  }
}

// Define the new element
customElements.define("font-results", FontResults);
