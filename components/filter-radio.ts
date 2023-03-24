class FilterRadio extends HTMLInputElement {
  constructor() {
    super();
    this.onchange = this.onChange;

    // Get init value from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get("tag");
    if (tag === this.value) {
      this.checked = true;

      // Wait for main-app to load before dispatching event
      window.addEventListener("main-app-loaded", () => {
        this.onChange();
      });
    }
  }

  onChange() {
    this.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
        },
      })
    );

    this.setUrlParam();
  }

  setUrlParam() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("tag", this.value.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }
}

customElements.define("filter-radio", FilterRadio, { extends: "input" });
