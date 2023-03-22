class FilterCheckbox extends HTMLInputElement {
  constructor() {
    super();
    this.onchange = this.onChange;

    // Get init value from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const variable = urlParams.get("variable");
    if (variable === "true") {
      this.checked = true;
    }
  }

  onChange() {
    this.dispatchEvent(
      new CustomEvent("filter-variable", {
        bubbles: true,
        composed: true,
        detail: {
          value: this.checked,
        },
      })
    );
    this.setUrlParam();
  }

  setUrlParam() {
    const urlParams = new URLSearchParams(window.location.search);
    // only set variable if it's true
    if (this.checked === false) {
      urlParams.delete("variable");
    } else {
      urlParams.set("variable", "true");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }
}

customElements.define("filter-checkbox", FilterCheckbox, { extends: "input" });
