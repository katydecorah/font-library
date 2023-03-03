// https://www.raymondcamden.com/2022/05/23/building-table-sorting-and-pagination-in-a-web-component

class FontResults extends HTMLElement {
  constructor() {
    super();

    // eslint-disable-next-line no-undef
    this.data = generatedData;
    this.selectedTag = "";
    this.resultsLength;
    this.pageSize = 5;
    this.curPage = 1;

    // Bind functions
    this.selectTag = this.selectTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    // If tag is in URL, set it
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("tag")) {
      this.selectedTag = urlParams.get("tag");
    }

    // Event listeners
    document.addEventListener("tag-button-selected-tag", this.selectTag);
    this.addEventListener("tag-button-selected-tag", this.selectTag);
    document.addEventListener("tag-button-remove-tag", this.removeTag);
    this.addEventListener("tag-button-remove-tag", this.removeTag);
  }

  connectedCallback() {
    // Main
    const fontContainer = document.createElement("div");
    // Search status
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("search-status");
    // Families
    const fontBody = document.createElement("div");
    fontBody.classList.add("families");
    fontContainer.append(statusContainer, fontBody);
    // Pagination
    const nav = document.createElement("div");
    nav.classList.add("pagination");
    const prevButton = document.createElement("button");
    prevButton.classList.add("btn");
    prevButton.disabled = true;
    prevButton.id = "btn-prev";
    prevButton.innerHTML = "Previous page";
    const pageCount = document.createElement("div");
    pageCount.classList.add("page-count");
    pageCount.id = "page-count";
    const nextButton = document.createElement("button");
    nextButton.classList.add("btn");
    nextButton.innerHTML = "Next page";
    nextButton.id = "btn-next";
    nav.append(prevButton, pageCount, nextButton);
    nextButton.addEventListener("click", this.nextPage, false);
    prevButton.addEventListener("click", this.previousPage, false);
    fontContainer.append(nav);

    this.appendChild(fontContainer);

    this.renderStatus();
    this.renderBody();
  }

  performFilter() {
    let filteredData = this.data;

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

    this.resultsLength = filteredData.length;
    return filteredData;
  }

  performPagination(data) {
    // pagination
    this.querySelector("#page-count").innerHTML = `${
      this.curPage
    } of ${Math.ceil(this.resultsLength / this.pageSize)}`;

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
    const paginatedData = this.performPagination(filteredData);

    let result = "";
    for (const font of paginatedData) {
      const { slug, family, category, variants, subsets, lineNumber, tags } =
        font;
      result += `<font-result slug="${slug}" family="${family}" category="${category}" variants="${variants}" subsets="${subsets}" lineNumber="${lineNumber}" tags="${tags}"></font-result>`;
    }
    fontBody.innerHTML = result;
  }

  selectTag({ detail: { tag } }) {
    this.selectedTag = tag;
    this.curPage = 1;
    this.renderBody();
    // set URL query string with tag
    const encodeTag = tag.replace(/\s/g, "+");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?tag=${encodeTag}`
    );
    // remove tag from .family-tag.active
    this.removeActiveTag();

    const nextActiveTags = document.querySelectorAll(
      `.tag-${tag.replace(/ /g, "-")}`
    );
    nextActiveTags.forEach((tagButton) => tagButton.classList.add("active"));
    this.scrollToContent();
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

  removeTag() {
    this.selectedTag = "";
    this.renderBody();
    window.history.pushState({}, "", `${window.location.pathname}`);
    this.removeActiveTag();
  }

  nextPage() {
    this.cleanUpFonts();
    if (this.curPage * this.pageSize < this.resultsLength) this.curPage++;
    this.setNextPageState();
    this.renderBody();
    this.scrollToContent();
  }

  setNextPageState() {
    if (this.curPage * this.pageSize >= this.resultsLength) {
      this.querySelector("#btn-next").disabled = true;
    } else {
      this.querySelector("#btn-next").disabled = false;
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
    if (this.curPage === 1) {
      this.querySelector("#btn-prev").disabled = true;
    } else {
      this.querySelector("#btn-prev").disabled = false;
    }
  }

  renderStatus() {
    const status = this.querySelector(".search-status");
    let elm = "";
    elm += `Found ${this.resultsLength} fonts`;
    if (this.selectedTag) {
      elm += this.selectedTag === "need tags" ? ` that ` : ` for `;
      elm += `<button is="tag-button" data-event='tag-button-remove-tag' class="family-tag active" value="${this.selectedTag}">${this.selectedTag}</button>`;
    }
    status.innerHTML = elm;
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
