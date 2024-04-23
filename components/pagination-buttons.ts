export type ButtonType = MouseEvent & { target: HTMLButtonElement };

const NEXT_PAGE = "next-page";
const PREVIOUS_PAGE = "previous-page";

class PaginationButtons extends HTMLElement {
  private mainApp = document.querySelector("main-app");

  private pageSize = 10;

  public constructor() {
    super();
    this.handlePage = this.handlePage.bind(this);
  }

  public connectedCallback(): void {
    this.handleInitialValue();
  }

  public get currentPage(): number {
    return Number.parseInt(this.getAttribute("current-page"), 10);
  }

  private set currentPage(value: number) {
    this.setAttribute("current-page", value.toString());
    this.setUrlParam();
    if (this.mainApp) {
      this.mainApp.setAttribute("current-page", value.toString());
    }
  }

  private get resultsLength(): number {
    return Number.parseInt(this.getAttribute("results-length"), 10);
  }

  private get totalPages(): number {
    return Math.ceil(this.resultsLength / this.pageSize);
  }

  private get nextPageDisabledState(): string {
    return this.currentPage * this.pageSize >= this.resultsLength
      ? "disabled"
      : "";
  }

  private get prevPageDisabledState(): string {
    return this.currentPage === 1 ? "disabled" : "";
  }

  public render(): void {
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

    this.innerHTML = `<button data-event="${PREVIOUS_PAGE}" class="btn" id="btn-prev" ${prevPageDisabledState}>Previous page</button>
<div class="page-count" id="page-count">${currentPage} of ${totalPages}</div>
<button data-event="${NEXT_PAGE}" class="btn" id="btn-next" ${nextPageDisabledState}>Next page</button>`;

    for (const button of this.querySelectorAll("[data-event]")) {
      button.addEventListener("click", handlePage);
    }
  }

  private handlePage({
    target: {
      dataset: { event },
    },
  }: ButtonType): void {
    if (
      event === NEXT_PAGE &&
      this.currentPage * this.pageSize < this.resultsLength
    ) {
      this.currentPage += 1;
      return;
    }
    if (event === PREVIOUS_PAGE && this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  private setUrlParam(): void {
    const urlParameters = new URLSearchParams(window.location.search);
    if (this.currentPage === 1) {
      urlParameters.delete("page");
    } else {
      urlParameters.set("page", this.currentPage.toString());
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParameters.toString()}`,
    );
  }

  public disconnectedCallback(): void {
    for (const button of this.querySelectorAll("[data-event]")) {
      button.removeEventListener("click", this.handlePage);
    }
  }

  public static get observedAttributes(): string[] {
    return ["current-page", "results-length"];
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    nextValue: string,
  ): void {
    if (oldValue === nextValue) return;
    this.render();
    this.setUrlParam();
  }

  private handleInitialValue(): void {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get("page");
    if (initialValue) {
      const parsedValue = Number.parseInt(initialValue, 10);
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
