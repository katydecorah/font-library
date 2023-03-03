class Tag extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
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

    // eslint-disable-next-line wc/no-self-class
    this.classList.add(
      "family-tag",
      `tag-${this.innerHTML.replace(/ /g, "-")}`
    );
  }
}

customElements.define("tag-button", Tag);
