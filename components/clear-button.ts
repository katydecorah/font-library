import customEvent from "./custom-event";

const CLICK = "click";
const CLEAR_FILTER = "clear-filter";

class ClearButton extends HTMLButtonElement {
  public connectedCallback(): void {
    this.addEventListener(CLICK, this.onClick);
    this.classList.add("clear-button");
  }

  public disconnectedCallback(): void {
    this.removeEventListener(CLICK, this.onClick);
  }

  private onClick(): void {
    this.dispatchEvent(
      customEvent(CLEAR_FILTER, {
        value: this.value,
      }),
    );
  }
}

customElements.define("clear-button", ClearButton, { extends: "button" });
