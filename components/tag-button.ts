import { tags } from "../_data/metadata.json";

class TagButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
    this.handleInitialValue();

    // find name in tags
    const tagData = tags.find((t) => t.name === this.value);

    if (tagData) {
      if (this.value === "icons") {
        this.innerHTML = `<i>&hearts;</i> icons`;
      } else {
        this.style.fontFamily = `"${tagData.sample}"`;
      }
    }

    // Listen for changes from other tag elements
    window.addEventListener("tag-button-selected", (event: CustomEvent) => {
      if (this.value === event.detail.value) {
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
          value: this.value,
        },
      })
    );

    this.setUrlParam();
  }

  setUrlParam() {
    const urlParameters = new URLSearchParams(window.location.search);
    urlParameters.set("tag", this.value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParameters.toString()}`
    );
  }

  handleInitialValue() {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get("tag");
    if (initialValue === this.value) {
      this.classList.add("active");
    }
  }
}

customElements.define("tag-button", TagButton, { extends: "button" });
