class FilterSelect extends HTMLSelectElement {
  constructor() {
    super();
    this.onchange = this.onChange;

    // Get initial value from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initValue = urlParams.get(this.dataset.param);
    if (initValue) {
      if (!this.options.namedItem(initValue)) return;
      this.value = initValue;

      // Wait for main-app to load before dispatching event
      window.addEventListener("main-app-loaded", () => {
        this.onChange();
      });
    }

    // Listen for events to clear filter
    window.addEventListener("remove-select", (e: CustomEvent) => {
      if (e.detail.filter === this.id) {
        this.value = "";
        this.onChange();
      }
    });

    // Listen for changes by other tag elements (radio, button)
    window.addEventListener("tag-button-selected", (e: CustomEvent) => {
      if (this.id === "selectedTag" && this.value !== e.detail.value) {
        this.value = e.detail.value;
      }
    });
  }

  onChange() {
    const eventName =
      this.id === "selectedTag" ? "tag-button-selected" : "handle-filter";
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: { id: this.id, value: this.value },
      })
    );

    this.setUrlParam();
  }

  setUrlParam() {
    const param = this.dataset.param;
    const urlParams = new URLSearchParams(window.location.search);
    if (!this.value) {
      urlParams.delete(param);
    } else {
      urlParams.set(param, this.value.toString());
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
