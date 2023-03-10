class Tag extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const tag = this.getAttribute("value");
    const selectedTag = this.getAttribute("selectedTag");

    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("tag-button-selected", {
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

    if (selectedTag === tag) {
      // eslint-disable-next-line wc/no-self-class
      this.classList.add("active");
    }
  }
}

customElements.define("tag-button", Tag);
