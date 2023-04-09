import customEvent from "./custom-event";
import { ButtonType } from "./pagination-buttons";

class SortBy extends HTMLElement {
  constructor() {
    super();
    this.button = this.button.bind(this);
  }

  get sortBy() {
    return this.getAttribute("sort-by");
  }

  render() {
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
      .map((button) => this.button(button))
      .join("");

    this.innerHTML = `<div class="label">Sort by</div><div class="btn-group">${buttons}</div>`;

    for (const button of this.querySelectorAll("[data-sort]")) {
      button.addEventListener("click", this.handleSort);
    }
  }

  button({ label, value }: { label: string; value: string }) {
    const active = this.sortBy === value ? "active" : "";
    return `<button class="${active}" data-sort="${value}">${label}</button>`;
  }

  handleSort(event: ButtonType) {
    const value = (event.target as HTMLElement).dataset.sort;
    this.dispatchEvent(customEvent("sort-by", { value }));
  }

  disconnectedCallback() {
    for (const button of this.querySelectorAll("[data-sort]")) {
      button.removeEventListener("click", this.handleSort);
    }
  }

  static get observedAttributes() {
    return ["sort-by"];
  }

  attributeChangedCallback(name: string, oldValue: string, nextValue: string) {
    if (oldValue === nextValue) return;
    this.render();
  }
}

customElements.define("sort-by", SortBy);
