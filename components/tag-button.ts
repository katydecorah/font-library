import { tags } from "../_data/metadata.json";

class TagButton extends HTMLButtonElement {
  constructor() {
    super();
    this.onclick = this.onClick;

    // Get init value from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const urlTag = urlParams.get("tag");
    const tag = this.getAttribute("value");

    if (urlTag === tag) {
      this.classList.add("active");
    }

    // find name in tags
    const tagData = tags.find((t) => t.name === tag);

    if (tagData) {
      if (tag === "icons") {
        this.innerHTML = `<i>&hearts;</i> icons`;
      } else {
        this.style.fontFamily = `"${tagData.sample}"`;
      }
    }

    // Listen for changes from other tag elements
    window.addEventListener("tag-button-selected", (e: CustomEvent) => {
      if (this.value === e.detail.value) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    });
  }

  onClick() {
    this.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        bubbles: true,
        composed: true,
        detail: {
          id: "selectedTag",
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
