import { setAttributes } from "./set-attributes";

class FontList extends HTMLUListElement {
  subset: string;

  get selectedVariant() {
    return this.getAttribute("selected-variant");
  }
  get selectedSubset() {
    return this.getAttribute("selected-subset");
  }

  get fonts() {
    return JSON.parse(this.getAttribute("fonts"));
  }

  constructor() {
    super();
  }

  render() {
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

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, nextValue: string) {
    if (oldValue === nextValue) return;
    this.render();
  }

  static get observedAttributes() {
    return ["selected-variant", "selected-subset", "fonts"];
  }
}

customElements.define("font-list", FontList, { extends: "ul" });
