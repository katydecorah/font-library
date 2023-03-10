// https://www.raymondcamden.com/2022/05/23/building-table-sorting-and-pagination-in-a-web-component
import generatedData from "./data.json";
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
  constructor() {
    super();

    this.selectedTag = "";
    this.selectedCategory = "";
    this.selectedSubset = "";
    this.selectedVariant = "";
    this.search = "";
    this.resultsLength;
    this.pageSize = 5;
    this.curPage = 1;

    // Bind functions
    this.selectTag = this.selectTag.bind(this);

    // Event listeners
    document.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.tag)
    );
    this.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.tag)
    );
    this.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("next-page", this.handlePage);
    this.addEventListener("previous-page", this.handlePage);

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
    let newValue = urlParams.get(param);
    newValue = newValue.replace(/[^a-zA-Z0-9\- ]/g, "");

    const elm = document.querySelector(selectElement) as HTMLSelectElement;
    // if value doesn't exist in select, return
    if (!elm.options.namedItem(newValue)) {
      return;
    }
    Object.assign(this, {
      [selectVar]: newValue,
    });
    elm.value = newValue;
  }

  setUrlParams(param: string, value: string) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(param, value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }

  clearFilter() {
    // Reset selects
    for (const { select, selectVar } of filters) {
      Object.assign(this, {
        [selectVar]: "",
      });
      (document.querySelector(select) as HTMLSelectElement).value = "";
    }
    // Reset URL
    window.history.pushState({}, "", `${window.location.pathname}`);
    // Re-render
    this.render();
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
          `<font-result selectedTag='${
            this.selectedTag
          }' font='${JSON.stringify(font)}'></font-result>`
      )
      .join("");
  }

  renderSearchStatus() {
    const {
      selectedTag,
      selectedCategory,
      selectedSubset,
      selectedVariant,
      resultsLength,
      search,
    } = this;
    this.querySelector(
      "#search-status"
    ).innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
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
    const newValue = (target as HTMLSelectElement).value;
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
