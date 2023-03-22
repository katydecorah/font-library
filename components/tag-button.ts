class TagButton extends HTMLButtonElement {
  constructor() {
    super();
    this.onclick = this.onClick;
  }
  connectedCallback() {
    const tag = this.getAttribute("value");
    const selectedTag = this.getAttribute("selectedTag");

    // eslint-disable-next-line wc/no-self-class
    this.classList.add("family-tag", `tag-${tag.replace(/ /g, "-")}`);

    if (selectedTag === tag) {
      // eslint-disable-next-line wc/no-self-class
      this.classList.add("active");
    }
  }

  onClick() {
    this.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        bubbles: true,
        composed: true,
        detail: {
          value: this.getAttribute("value"),
        },
      })
    );
  }
}

customElements.define("tag-button", TagButton, { extends: "button" });
