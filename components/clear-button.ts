import customEvent from "./custom-event";

class ClearButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
    this.classList.add("clear-button");
  }

  onClick() {
    this.dispatchEvent(
      customEvent("clear-filter", {
        value: this.value,
      }),
    );
  }
}

customElements.define("clear-button", ClearButton, { extends: "button" });
