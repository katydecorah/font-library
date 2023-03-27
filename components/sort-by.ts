import { ButtonType } from "./pagination-buttons";

class SortBy extends HTMLElement {
  constructor() {
    super();
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
    ];

    this.innerHTML = `<div class="label">Sort by</div><div class="btn-group">${buttons
      .map(
        ({ value, label }) =>
          `<button class="${this.isActive(
            value
          )}" data-sort="${value}">${label}</button>`
      )
      .join("")}</div>`;

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
