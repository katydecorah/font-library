import customEvent from "./custom-event";

const HANDLE_FILTER = "handle-filter";
const TAG_BUTTON_SELECTED = "tag-button-selected";

class FilterSelect extends HTMLSelectElement {
  public constructor() {
    super();
    this.addEventListener("change", this.onChange);
  }

  public connectedCallback(): void {
    this.handleInitialValue();

    // Listen for events to clear filter
    window.addEventListener("remove-select", this.removeSelect);

    // Listen for changes by other tag elements
    window.addEventListener(TAG_BUTTON_SELECTED, this.tagButtonSelected);
  }

  public disconnectedCallback(): void {
    window.removeEventListener("remove-select", this.removeSelect);
    window.removeEventListener(TAG_BUTTON_SELECTED, this.tagButtonSelected);
  }

  private removeSelect = (event: CustomEvent): void => {
    if (event.detail.value === this.id) {
      this.value = "";
      this.onChange();
    }
  };

  private tagButtonSelected = (event: CustomEvent): void => {
    if (this.id === "selectedTag" && this.value !== event.detail.value) {
      this.value = event.detail.value;
    }
  };

  private onChange(): void {
    const { id, value } = this;
    this.dispatchEvent(
      customEvent(id === "selectedTag" ? TAG_BUTTON_SELECTED : HANDLE_FILTER, {
        value,
        id,
      }),
    );

    this.setUrlParam();
  }

  private setUrlParam(): void {
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
      `${window.location.pathname}?${urlParameters.toString()}`,
    );
  }

  private handleInitialValue(): string {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get(this.dataset.param);
    if (initialValue) {
      if (!this.options.namedItem(initialValue)) return;
      this.value = initialValue;

      // Wait for main-app to load before dispatching event
      window.addEventListener("main-app-loaded", this.mainAppLoaded);
    }
  }

  private mainAppLoaded = (): void => {
    this.onChange();
    window.removeEventListener("main-app-loaded", this.mainAppLoaded);
  };
}

customElements.define("filter-select", FilterSelect, { extends: "select" });
