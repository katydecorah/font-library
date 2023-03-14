class PaginationButtons extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const currentPage = parseInt(this.getAttribute("currentPage"));
    const resultsLength = parseInt(this.getAttribute("resultsLength"));
    const pageSize = parseInt(this.getAttribute("pageSize"));

    const totalPages = Math.ceil(resultsLength / pageSize);
    const nextPageDisabledState =
      currentPage * pageSize >= resultsLength ? "disabled" : "";
    const prevPageDisabledState = currentPage === 1 ? "disabled" : "";

    this.innerHTML = `<div class="pagination ${totalPages < 2 ? "hide" : ""}">
  <button data-event="previous-page" class="btn" id="btn-prev" ${prevPageDisabledState}>Previous page</button>
  <div class="page-count" id="page-count">${currentPage} of ${totalPages}</div>
  <button data-event="next-page" class="btn" id="btn-next" ${nextPageDisabledState}>Next page</button>
</div>`;

    this.querySelectorAll("[data-event]").forEach((button) =>
      button.addEventListener("click", this.handlePage)
    );
  }

  handlePage({ target }: Event) {
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent(target.dataset.event, {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("pagination-buttons", PaginationButtons);
