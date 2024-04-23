import customEvent from "./custom-event";

const HANDLE_FILTER = "handle-filter";
const VARIABLE = "variable";

class FilterCheckbox extends HTMLInputElement {
  public constructor() {
    super();
    this.addEventListener("change", this.onChange);
  }

  public connectedCallback(): void {
    this.handleInitialValue();

    // Listen for events to clear filter
    window.addEventListener("remove-checkbox", this.removeCheckbox);
  }

  public disconnectedCallback(): void {
    window.removeEventListener("remove-checkbox", this.removeCheckbox);
  }

  private removeCheckbox = (): void => {
    this.checked = false;
    this.onChange();
  };

  private onChange(): void {
    this.dispatchEvent(
      customEvent(HANDLE_FILTER, {
        value: this.checked,
        id: this.id,
      }),
    );
    this.setUrlParam();
  }

  private setUrlParam(): void {
    const urlParameters = new URLSearchParams(window.location.search);
    // only set variable if it's true
    if (this.checked === false) {
      urlParameters.delete(VARIABLE);
    } else {
      urlParameters.set(VARIABLE, "true");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParameters.toString()}`,
    );
  }

  private handleInitialValue(): void {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get(VARIABLE);
    if (initialValue === "true") {
      this.checked = true;

      // Wait for main-app to load before dispatching event
      window.addEventListener("main-app-loaded", this.mainAppLoaded);
    }
  }

  private mainAppLoaded = (): void => {
    this.onChange();
    window.removeEventListener("main-app-loaded", this.mainAppLoaded);
  };
}

customElements.define("filter-checkbox", FilterCheckbox, { extends: "input" });
