import { setAttributes } from "./set-attributes";

class FontList extends HTMLUListElement {
  public get selectedVariant(): string {
    return this.getAttribute("selected-variant");
  }

  public get selectedSubset(): string {
    return this.getAttribute("selected-subset");
  }

  public get fonts(): string[] {
    return JSON.parse(this.getAttribute("fonts")) as string[];
  }

  public connectedCallback(): void {
    if (!this.fonts) return;
    const items = [];
    for (const font of this.fonts) {
      const fontItem = document.createElement("li");
      setAttributes(fontItem, {
        is: "font-item",
        font: JSON.stringify(font),
        "selected-variant": this.selectedVariant,
        "selected-subset": this.selectedSubset,
      });
      items.push(fontItem.outerHTML);
    }
    this.innerHTML = items.join("\n");
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    nextValue: string,
  ): void {
    if (oldValue === nextValue) return;
    this.connectedCallback();
  }

  public static get observedAttributes(): string[] {
    return ["selected-variant", "selected-subset", "fonts"];
  }
}

customElements.define("font-list", FontList, { extends: "ul" });
