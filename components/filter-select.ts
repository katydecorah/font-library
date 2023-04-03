class FilterSelect extends HTMLSelectElement {
  constructor() {
    super();
    this.addEventListener("change", this.onChange);
    this.handleInitialValue();

    // Listen for events to clear filter
    window.addEventListener("remove-select", (event: CustomEvent) => {
      if (event.detail.filter === this.id) {
        this.value = "";
        this.onChange();
      }
    });

    // Listen for changes by other tag elements
    window.addEventListener("tag-button-selected", (event: CustomEvent) => {
      if (this.id === "selectedTag" && this.value !== event.detail.value) {
        this.value = event.detail.value;
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
    const urlParameters = new URLSearchParams(window.location.search);
    if (this.value) {
      urlParameters.set(param, this.value.toString());
    } else {
      urlParameters.delete(param);
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParameters.toString()}`
    );
  }

  handleInitialValue() {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get(this.dataset.param);
    if (initialValue) {
      if (!this.options.namedItem(initialValue)) return;
      this.value = initialValue;

      // Wait for main-app to load before dispatching event
      window.addEventListener("main-app-loaded", () => {
        this.onChange();
      });
    }
  }
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
