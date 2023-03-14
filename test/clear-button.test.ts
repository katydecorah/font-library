import "../components/clear-button";

describe("clear-button", () => {
  document.body.innerHTML = `<clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>`;
  const clearButton = document.querySelector("clear-button");
  it("renders", () => {
    expect(clearButton).toMatchInlineSnapshot(`
      <clear-button
        aria-label="remove all filters"
        class="btn btn-clear"
        role="button"
      >
        Clear
      </clear-button>
    `);
  });
  it("fires a custom event when clicked", () => {
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const clickHandler = jest.fn();
    clearButton.addEventListener("click", clickHandler);
    clearButton.dispatchEvent(clickEvent);
    expect(clickHandler).toHaveBeenCalled();
  });
});
