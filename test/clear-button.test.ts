import "../components/clear-button";

describe("clear-button", () => {
  document.body.innerHTML = `<button is="clear-button" aria-label="remove all filters" class="btn btn-clear">Clear</button>`;
  const clearButton: HTMLButtonElement = document.querySelector(
    "button[is=clear-button]"
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
    const mockFn = jest.fn();
    clearButton.addEventListener("clear-filter", mockFn);
    clearButton.click();
    expect(mockFn).toHaveBeenCalled();
  });
});
