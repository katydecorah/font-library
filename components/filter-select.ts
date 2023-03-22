class FilterSelect extends HTMLSelectElement {
  constructor() {
    super();
    this.onchange = this.onChange;
  }

  onChange() {
    const id = this.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const eventName =
      id === "selectedTag" ? "tag-button-selected" : "filter-select";

    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: { id, value: this.value },
      })
    );
  }
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
