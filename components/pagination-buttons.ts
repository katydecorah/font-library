import customEvent from "./custom-event";

export type ButtonType = MouseEvent & { target: HTMLButtonElement };

class PaginationButtons extends HTMLElement {
  constructor() {
    super();
  }

  get currentPage() {
    return Number.parseInt(this.getAttribute("current-page"));
  }

  get resultsLength() {
    return Number.parseInt(this.getAttribute("results-length"));
  }

  get pageSize() {
    return Number.parseInt(this.getAttribute("page-size"));
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

  connectedCallback() {
    const {
      currentPage,
      prevPageDisabledState,
      totalPages,
      nextPageDisabledState,
      handlePage,
    } = this;

    this.innerHTML = `<div class="pagination ${totalPages < 2 ? "hide" : ""}">
  <button data-event="previous-page" class="btn" id="btn-prev" ${prevPageDisabledState}>Previous page</button>
  <div class="page-count" id="page-count">${currentPage} of ${totalPages}</div>
  <button data-event="next-page" class="btn" id="btn-next" ${nextPageDisabledState}>Next page</button>
</div>`;

    for (const button of this.querySelectorAll("[data-event]")) {
      button.addEventListener("click", handlePage);
    }
  }

  handlePage(event: ButtonType) {
    this.dispatchEvent(customEvent(event.target.dataset.event));
  }
}

customElements.define("pagination-buttons", PaginationButtons);
