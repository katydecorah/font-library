class Tag extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const tag = this.getAttribute("value");

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
            tag,
          },
        })
      );
    });

    // eslint-disable-next-line wc/no-self-class
    this.classList.add("family-tag", `tag-${tag.replace(/ /g, "-")}`);
  }
}

customElements.define("tag-button", Tag);
