class TagButton extends HTMLButtonElement {
  constructor() {
    super();
    this.onclick = this.onClick;

    // Get init value from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get("tag");
    if (tag === this.getAttribute("value")) {
      // eslint-disable-next-line wc/no-self-class
      this.classList.add("active");

      // Wait for main-app to load before dispatching event
      window.addEventListener("main-app-loaded", () => {
        this.onClick();
      });
    }
  }
  connectedCallback() {
    const tag = this.getAttribute("value");
    const selectedTag = this.getAttribute("selected-tag");

    // eslint-disable-next-line wc/no-self-class
    this.classList.add("family-tag", `tag-${tag.replace(/ /g, "-")}`);

    if (selectedTag === tag) {
      // eslint-disable-next-line wc/no-self-class
      this.classList.add("active");
    } else {
      // eslint-disable-next-line wc/no-self-class
      this.classList.remove("active");
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

    this.setUrlParam();
  }

  setUrlParam() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("tag", this.getAttribute("value"));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }
}

customElements.define("tag-button", TagButton, { extends: "button" });
