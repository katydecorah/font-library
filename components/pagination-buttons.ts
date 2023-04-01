export type ButtonType = MouseEvent & { target: HTMLButtonElement };

class PaginationButtons extends HTMLElement {
  constructor() {
    super();
  }

  get currentPage() {
    return parseInt(this.getAttribute("current-page"));
  }

  get resultsLength() {
    return parseInt(this.getAttribute("results-length"));
  }

  get pageSize() {
    return parseInt(this.getAttribute("page-size"));
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
    } = this;

    this.innerHTML = `<div class="pagination ${totalPages < 2 ? "hide" : ""}">
  <button data-event="previous-page" class="btn" id="btn-prev" ${prevPageDisabledState}>Previous page</button>
  <div class="page-count" id="page-count">${currentPage} of ${totalPages}</div>
  <button data-event="next-page" class="btn" id="btn-next" ${nextPageDisabledState}>Next page</button>
</div>`;

    this.querySelectorAll("[data-event]").forEach((button) =>
      button.addEventListener("click", this.handlePage)
    );
  }

  handlePage(event: ButtonType) {
    this.dispatchEvent(
      new CustomEvent(event.target.dataset.event, {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("pagination-buttons", PaginationButtons);
