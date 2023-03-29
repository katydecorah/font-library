import { ButtonType } from "./pagination-buttons";

class SortBy extends HTMLElement {
  constructor() {
    super();
    this.button = this.button.bind(this);
  }

  connectedCallback() {
    const buttons = [
      {
        label: "Family",
        value: "family",
      },
      {
        label: "Last modified",
        value: "date",
      },
    ]
      .map(this.button)
      .join("");

    this.innerHTML = `<div class="label">Sort by</div><div class="btn-group">${buttons}</div>`;

    this.querySelectorAll("[data-sort]").forEach((button) =>
      button.addEventListener("click", this.handleSort)
    );
  }

  button({ label, value }: { label: string; value: string }) {
    const active = this.getAttribute("sort-by") === value ? "active" : "";

    return `<button class="${active}" data-sort="${value}">${label}</button>`;
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
