import { tags } from "../_data/metadata.json";
import customEvent from "./custom-event";

const CLICK = "click";
const TAG_BUTTON_SELECTED = "tag-button-selected";
const ACTIVE = "active";

class TagButton extends HTMLButtonElement {
  private tagButtonSelectedHandler;

  public constructor() {
    super();
    this.tagButtonSelectedHandler = (event: CustomEvent): void => {
      if (this.value === event.detail.value) {
        this.classList.add(ACTIVE);
      } else {
        this.classList.remove(ACTIVE);
      }
    };
  }

  public connectedCallback(): void {
    this.addEventListener(CLICK, this.onClick);
    this.handleInitialValue();
    window.addEventListener(TAG_BUTTON_SELECTED, this.tagButtonSelectedHandler);

    // find name in tags
    const tagData = tags.find((t) => t.name === this.value);

    if (tagData) {
      if (this.value === "icons") {
        this.innerHTML = `<i>&hearts;</i> icons`;
      } else {
        this.style.fontFamily = `"${tagData.sample}"`;
      }
    }
  }

  public disconnectedCallback(): void {
    this.removeEventListener(CLICK, this.onClick);
    window.removeEventListener(
      TAG_BUTTON_SELECTED,
      this.tagButtonSelectedHandler,
    );
  }

  private onClick = (): void => {
    this.dispatchEvent(
      customEvent(TAG_BUTTON_SELECTED, {
        id: "selectedTag",
        value: this.value,
      }),
    );

    this.setUrlParam();
  };

  private setUrlParam(): void {
    const urlParameters = new URLSearchParams(window.location.search);
    urlParameters.set("tag", this.value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParameters.toString()}`,
    );
  }

  private handleInitialValue(): void {
    const urlParameters = new URLSearchParams(window.location.search);
    const initialValue = urlParameters.get("tag");
    if (initialValue === this.value) {
      this.classList.add(ACTIVE);
    }
  }
}

customElements.define("tag-button", TagButton, { extends: "button" });
