class ClearButton extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("clear-filter", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("clear-button", ClearButton);
