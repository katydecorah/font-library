export type ButtonType = MouseEvent & { target: HTMLButtonElement };

class PaginationButtons extends HTMLElement {
  mainApp = document.querySelector("main-app");
  constructor() {
    super();
    this.handlePage = this.handlePage.bind(this);
  }

  get currentPage() {
    return Number.parseInt(this.getAttribute("current-page")) || 1;
  }

  set currentPage(value: number) {
    this.setAttribute("current-page", value.toString());
    if (this.mainApp) {
      this.mainApp.setAttribute("current-page", value.toString());
    }
  }

  get resultsLength() {
    return Number.parseInt(this.getAttribute("results-length"));
  }

  get pageSize() {
    return 10;
  }

  get totalPages() {
    return Math.ceil(this.resultsLength / this.pageSize);
  }

  get nextPageDisabledState() {
    return this.currentPage * this.pageSize >= this.resultsLength
      ? "disabled"
      : "";
  }

  get prevPageDisabledState() {
    return this.currentPage === 1 ? "disabled" : "";
  }

  render() {
    const {
      currentPage,
      prevPageDisabledState,
      totalPages,
      nextPageDisabledState,
      handlePage,
    } = this;

    if (totalPages < 2) {
      this.innerHTML = "";
      return;
    }

    this.innerHTML = `<div class="pagination">
  <button data-event="previous-page" class="btn" id="btn-prev" ${prevPageDisabledState}>Previous page</button>
  <div class="page-count" id="page-count">${currentPage} of ${totalPages}</div>
  <button data-event="next-page" class="btn" id="btn-next" ${nextPageDisabledState}>Next page</button>
</div>`;

    for (const button of this.querySelectorAll("[data-event]")) {
      button.addEventListener("click", handlePage);
    }
  }

  handlePage({
    target: {
      dataset: { event },
    },
  }: ButtonType) {
    if (
      event === "next-page" &&
      this.currentPage * this.pageSize < this.resultsLength
    ) {
      this.currentPage++;
      return;
    }
    if (event === "previous-page" && this.currentPage > 1) {
      this.currentPage--;
      return;
    }
  }

  disconnectedCallback() {
    for (const button of this.querySelectorAll("[data-event]")) {
      button.removeEventListener("click", this.handlePage);
    }
  }

  static get observedAttributes() {
    return ["current-page", "results-length"];
  }

  attributeChangedCallback(name: string, oldValue: string, nextValue: string) {
    if (oldValue === nextValue) return;
    this.render();
  }
}

customElements.define("pagination-buttons", PaginationButtons);
