export type ButtonType = MouseEvent & { target: HTMLButtonElement };

class PaginationButtons extends HTMLElement {
  mainApp = document.querySelector("main-app");
  constructor() {
    super();
    this.handlePage = this.handlePage.bind(this);
    this.handleInitialValue();
  }

  get currentPage() {
    return Number.parseInt(this.getAttribute("current-page"));
  }

  set currentPage(value: number) {
    this.setAttribute("current-page", value.toString());
    this.setUrlParam();
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

    this.innerHTML = `<button data-event="previous-page" class="btn" id="btn-prev" ${prevPageDisabledState}>Previous page</button>
<div class="page-count" id="page-count">${currentPage} of ${totalPages}</div>
<button data-event="next-page" class="btn" id="btn-next" ${nextPageDisabledState}>Next page</button>`;

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

  setUrlParam() {
    const urlParameters = new URLSearchParams(window.location.search);
    if (this.currentPage === 1) {
      urlParameters.delete("page");
    } else {
      urlParameters.set("page", this.currentPage.toString());
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParameters.toString()}`
    );
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
    this.setUrlParam();
  }

  handleInitialValue() {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get("page");
    if (initialValue) {
      const parsedValue = Number.parseInt(initialValue);
      if (Number.isNaN(parsedValue)) {
        this.currentPage = 1;
        return;
      }
      if (parsedValue > this.totalPages) {
        this.currentPage = this.totalPages;
        return;
      }
      this.currentPage = parsedValue;
    }
  }
}

customElements.define("pagination-buttons", PaginationButtons);
