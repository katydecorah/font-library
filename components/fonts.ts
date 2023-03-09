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
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

    // Event listeners
    document.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.tag)
    );
    this.addEventListener("tag-button-selected", (e: CustomEvent) =>
      this.selectTag(e.detail.tag)
    );
    document.addEventListener("clear-filter", this.clearFilter);
    this.addEventListener("clear-filter", this.clearFilter);

    for (const { select, param, selectVar } of filters) {
      if (select === "#select-tags" || select === "#input-search") continue;
      this.getUrlParams(param, selectVar, select);
      document.querySelector(select).addEventListener("change", (e) => {
        const newValue = (e.target as HTMLSelectElement).value;
        Object.assign(this, {
          [selectVar]: newValue,
        });
        this.curPage = 1;
        this.renderStatus();
        this.renderBody();
        this.setUrlParams(param, newValue);
      });
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
      this.renderStatus();
      this.renderBody();
    });

    // Pagination
    const nextButton = document.querySelector("#btn-next");
    const prevButton = document.querySelector("#btn-prev");
    nextButton.addEventListener("click", this.nextPage, false);
    prevButton.addEventListener("click", this.previousPage, false);
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

    if (selectElement === "#select-tags") {
      this.addActiveTag(newValue);
    }
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
    // Reset tags
    this.removeActiveTag();
    // Reset URL
    window.history.pushState({}, "", `${window.location.pathname}`);
    // Re-render
    this.renderStatus();
    this.renderBody();
  }

  connectedCallback() {
    this.renderStatus();
    this.renderBody();
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
    return filteredData;
  }

  performPagination(data: GeneratedData) {
    const totalPages = Math.ceil(this.resultsLength / this.pageSize);
    this.querySelector(
      "#page-count"
    ).innerHTML = `${this.curPage} of ${totalPages}`;
    if (totalPages === 0) {
      // add "hide" class to #pagination
      this.querySelector(".pagination").classList.add("hide");
    }

    this.setNextPageState();
    this.setPrevPageState();

    return data.filter((row, index) => {
      const start = (this.curPage - 1) * this.pageSize;
      const end = this.curPage * this.pageSize;
      if (index >= start && index < end) return true;
    });
  }

  renderBody() {
    const fontBody = this.querySelector(".families");
    const filteredData = this.performFilter();
    this.renderStatus();
    this.cleanUpFonts();
    const paginatedData = this.performPagination(filteredData);

    let result = "";
    for (const font of paginatedData) {
      result += `<font-result font='${JSON.stringify(font)}'></font-result>`;
    }
    fontBody.innerHTML = `${result}`;
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.curPage = 1;
    this.renderBody();
    // set URL query string with tag
    this.setUrlParams("tag", tag);
    // remove tag from .family-tag.active
    this.removeActiveTag();
    // add active tage
    this.addActiveTag(tag);
    this.scrollToContent();
    (document.querySelector("#select-tags") as HTMLSelectElement).value = tag;
  }

  scrollToContent() {
    const contentElement = document.querySelector("#content");
    contentElement.scrollIntoView();
  }

  removeActiveTag() {
    const prevActiveTag = document.querySelectorAll(".family-tag.active");
    prevActiveTag.forEach((activeTagButton) =>
      activeTagButton.classList.remove("active")
    );
  }

  addActiveTag(newTag: string) {
    const nextActiveTags = document.querySelectorAll(
      `.tag-${newTag.replace(/ /g, "-")}`
    );
    if (nextActiveTags.length === 0) return;
    nextActiveTags.forEach((tagButton) => tagButton.classList.add("active"));
  }

  nextPage() {
    this.cleanUpFonts();
    if (this.curPage * this.pageSize < this.resultsLength) this.curPage++;
    this.setNextPageState();
    this.renderBody();
    this.scrollToContent();
  }

  setNextPageState() {
    const elm = this.querySelector("#btn-next") as HTMLButtonElement;
    if (this.curPage * this.pageSize >= this.resultsLength) {
      elm.disabled = true;
    } else {
      elm.disabled = false;
    }
  }

  previousPage() {
    this.cleanUpFonts();
    if (this.curPage > 1) this.curPage--;
    this.setPrevPageState();
    this.renderBody();
    this.scrollToContent();
  }

  setPrevPageState() {
    const elm = this.querySelector("#btn-prev") as HTMLButtonElement;
    if (this.curPage === 1) {
      elm.disabled = true;
    } else {
      elm.disabled = false;
    }
  }

  renderStatus() {
    const status = this.querySelector("#search-status");
    status.innerHTML = `<search-status class="search-status" resultsLength="${this.resultsLength}" selectedCategory="${this.selectedCategory}" selectedTag="${this.selectedTag}" selectedSubset="${this.selectedSubset}" selectedVariant="${this.selectedVariant}" search="${this.search}" resultsLength="${this.resultsLength}"></search-status>`;
  }

  cleanUpFonts() {
    // remove data-font element from document head
    const fonts = document.querySelectorAll("link[data-family]");
    fonts.forEach((font) => {
      document.head.removeChild(font);
    });
  }
}

// Define the new element
customElements.define("font-results", FontResults);
