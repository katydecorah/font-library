import "./components";

describe("filter-checkbox", () => {
  beforeEach(() => {
    const location = {
      ...window.location,
      search: "",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });
  });

  document.body.innerHTML = `<input type="checkbox" is="filter-checkbox" id="selectedVariable" class="filter-checkbox"  />`;
  const filterCheckbox: HTMLInputElement = document.querySelector(
    "input[is=filter-checkbox]"
  );

  it("fires a custom event on change", () => {
    expect(window.location.search).toBe("");
    const mockFn = jest.fn();
    filterCheckbox.addEventListener("filter-variable", mockFn);
    filterCheckbox.checked = true;
    filterCheckbox.dispatchEvent(new Event("change"));
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn.mock.calls[0][0].detail).toMatchInlineSnapshot(`
      {
        "value": true,
      }
    `);
  });

  it("sets initial value if param is in url", () => {
    const location = {
      ...window.location,
      search: "?variable=true",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = `<input type="checkbox" is="filter-checkbox" id="selectedVariable" class="filter-checkbox"  />`;
    const filterCheckbox: HTMLInputElement = document.querySelector(
      "input[is=filter-checkbox]"
    );
    expect(filterCheckbox.checked).toBe(true);
    // expect the event to fire after the main-app is loaded
    const mockFn = jest.fn();
    filterCheckbox.addEventListener("filter-variable", mockFn);
    window.dispatchEvent(new Event("main-app-loaded"));
    expect(mockFn).toHaveBeenCalled();
  });

  it("removes variable=false from query string", () => {
    filterCheckbox.checked = false;
    filterCheckbox.dispatchEvent(new Event("change"));
    expect(window.location.search).toBe("");
  });
});
