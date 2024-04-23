import { setAttributes } from "./set-attributes";

const SELECTED_VARIANT = "selected-variant";
const SELECTED_SUBSET = "selected-subset";
const FONTS = "fonts";

class FontList extends HTMLUListElement {
  public get selectedVariant(): string {
    return this.getAttribute(SELECTED_VARIANT);
  }

  public get selectedSubset(): string {
    return this.getAttribute(SELECTED_SUBSET);
  }

  public get fonts(): string[] {
    return JSON.parse(this.getAttribute(FONTS)) as string[];
  }

  public connectedCallback(): void {
    this.render();
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    nextValue: string,
  ): void {
    if (oldValue === nextValue) return;
    this.render();
  }

  public static get observedAttributes(): string[] {
    return [SELECTED_VARIANT, SELECTED_SUBSET, FONTS];
  }

  private render(): void {
    if (!this.fonts) return;
    const items = [];
    for (const font of this.fonts) {
      const fontItem = document.createElement("li");
      setAttributes(fontItem, {
        is: "font-item",
        font: JSON.stringify(font),
        [SELECTED_VARIANT]: this.selectedVariant,
        [SELECTED_SUBSET]: this.selectedSubset,
      });
      items.push(fontItem.outerHTML);
    }
    this.innerHTML = items.join("\n");
  }
}

customElements.define("font-list", FontList, { extends: "ul" });
