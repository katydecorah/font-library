class FilterSelect extends HTMLSelectElement {
  constructor() {
    super();
    this.onchange = this.onChange;
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
  }
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
