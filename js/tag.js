class Tag extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const tag = this.getAttribute("value");

    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("tag-button-selected-tag", {
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
