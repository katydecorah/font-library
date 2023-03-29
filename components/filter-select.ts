class FilterSelect extends HTMLSelectElement {
  constructor() {
    super();
    this.onchange = this.onChange;

    // Get initial value from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialValue = urlParams.get(this.dataset.param);
    if (initialValue) {
      if (!this.options.namedItem(initialValue)) return;
      this.value = initialValue;

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

    // Listen for changes by other tag elements
    window.addEventListener("tag-button-selected", (e: CustomEvent) => {
      if (this.id === "selectedTag" && this.value !== e.detail.value) {
        this.value = e.detail.value;
      }
    });
  }

  onChange() {
    const { id, value } = this;
    this.dispatchEvent(
      new CustomEvent(
        id === "selectedTag" ? "tag-button-selected" : "handle-filter",
        {
          bubbles: true,
          composed: true,
          detail: { id, value },
        }
      )
    );

    this.setUrlParam();
  }

  setUrlParam() {
    const { param } = this.dataset;
    const urlParams = new URLSearchParams(window.location.search);
    if (this.value) {
      urlParams.set(param, this.value.toString());
    } else {
      urlParams.delete(param);
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
