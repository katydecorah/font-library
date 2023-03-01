// To do:
// add markup to TagButton

class TagButton extends HTMLButtonElement {
  constructor() {
    super();
    this.eventName = "tag-button-selected-tag";
    if (this.hasAttribute("data-event")) {
      this.eventName = this.getAttribute("data-event");
    }
    this.addEventListener("click", (e) => {
      this.dispatchEvent(
        new CustomEvent(this.eventName, {
          bubbles: true,
          composed: true,
          detail: {
            tag: e.target.value,
          },
        })
      );
    });
  }
}

customElements.define("tag-button", TagButton, { extends: "button" });
