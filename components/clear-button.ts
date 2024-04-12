import customEvent from "./custom-event";

class ClearButton extends HTMLButtonElement {
  public constructor() {
    super();
    this.addEventListener("click", this.onClick);
    this.classList.add("clear-button");
  }

  private onClick(): void {
    this.dispatchEvent(
      customEvent("clear-filter", {
        value: this.value,
      }),
    );
  }
}

customElements.define("clear-button", ClearButton, { extends: "button" });
