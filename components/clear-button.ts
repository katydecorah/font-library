class ClearButton extends HTMLButtonElement {
  constructor() {
    super();
    this.onclick = this.onClick;
    // add "clear-button" class
    this.classList.add("clear-button");
  }

  onClick() {
    this.dispatchEvent(
      new CustomEvent("clear-filter", {
        bubbles: true,
        composed: true,
        detail: {
          filter: this.getAttribute("value"),
        },
      })
    );
  }
}

customElements.define("clear-button", ClearButton, { extends: "button" });
