class ClearButton extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // add aria-role
    this.setAttribute("role", "button");
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("clear-filter", {
          bubbles: true,
          composed: true,
          detail: {
            filter: this.getAttribute("value"),
          },
        })
      );
    });
  }
}

customElements.define("clear-button", ClearButton);
