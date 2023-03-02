class Tag extends HTMLButtonElement {
  constructor() {
    super();
    this.eventName = "tag-button-selected-tag";
    if (this.hasAttribute("data-event")) {
      this.eventName = this.getAttribute("data-event");
    }
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent(this.eventName, {
          bubbles: true,
          composed: true,
          detail: {
            tag: this.innerHTML,
          },
        })
      );
    });
  }
  connectedCallback() {
    this.classList.add("family-tag");
  }
}

customElements.define("tag-button", Tag, { extends: "button" });
