class ClearButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
    this.classList.add("clear-button");
  }

  onClick() {
    this.dispatchEvent(
      new CustomEvent("clear-filter", {
        bubbles: true,
        composed: true,
        detail: {
          filter: this.value,
        },
      })
    );
  }
}

customElements.define("clear-button", ClearButton, { extends: "button" });
