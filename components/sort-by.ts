import { ButtonType } from "./pagination-buttons";

class SortBy extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="sort-by"><div class="label">Sort by</div><div class="btn-group"><button class="${this.isActive(
      "date"
    )}" data-sort="date">Last modified</button><button class="${this.isActive(
      "family"
    )}" data-sort="family">Family</button></div></div>`;

    this.querySelectorAll("[data-sort]").forEach((button) =>
      button.addEventListener("click", this.handleSort)
    );
  }

  isActive(sortBy: string) {
    return this.getAttribute("sort-by") === sortBy ? "active" : "";
  }

  handleSort(event: ButtonType) {
    const sortBy = (event.target as HTMLElement).dataset.sort;
    this.dispatchEvent(
      new CustomEvent("sort-by", {
        detail: { sortBy },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("sort-by", SortBy);
