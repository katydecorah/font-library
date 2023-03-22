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
    }
  }

  onChange() {
    const eventName =
      this.id === "selectedTag" ? "tag-button-selected" : "filter-select";
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
    urlParams.set(param, this.value.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
