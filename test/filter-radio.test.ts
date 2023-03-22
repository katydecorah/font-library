import "./components";

describe("filter-radio", () => {
  document.body.innerHTML = `<input type="radio" is="filter-radio" id="selectedTag" class="filter-radio" name="tag" value="tag1" />`;
  const filterRadio: HTMLInputElement = document.querySelector(
    "input[is=filter-radio]"
  );

  it("fires a custom event on change", () => {
    const mockFn = jest.fn();
    filterRadio.addEventListener("tag-button-selected", mockFn);
    filterRadio.checked = true;
    filterRadio.dispatchEvent(new Event("change"));
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn.mock.calls[0][0].detail).toMatchInlineSnapshot(`
      {
        "value": "tag1",
      }
    `);
  });

  it("sets initial value if param is in url", () => {
    const location = {
      ...window.location,
      search: "?tag=tag1",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = `<input type="radio" is="filter-radio" id="selectedTag" class="filter-radio" name="tag" value="tag1" />`;
    const filterRadio: HTMLInputElement = document.querySelector(
      "input[is=filter-radio]"
    );
    expect(filterRadio.checked).toBe(true);
  });
});
