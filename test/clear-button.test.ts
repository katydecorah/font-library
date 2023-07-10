import "./components";

describe("clear-button", () => {
  document.body.innerHTML = `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`;
  const clearButton: HTMLButtonElement = document.querySelector(
    "button[is=clear-button]",
  );
  it("renders", () => {
    expect(clearButton).toMatchInlineSnapshot(`
      <button
        aria-label="remove all filters"
        class="btn btn-clear clear-button"
        is="clear-button"
      >
        Clear
      </button>
    `);
  });
  it("fires a custom event onclick", () => {
    const mockFunction = jest.fn();
    clearButton.addEventListener("clear-filter", mockFunction);
    clearButton.click();
    expect(mockFunction).toHaveBeenCalled();
  });
});
