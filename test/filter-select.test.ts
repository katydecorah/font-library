import "./components";

describe("filter-select", () => {
  document.body.innerHTML = `<select is="filter-select" id="selectedTag" class="filter-select">
    <option value="all">All</option>
    <option value="tag1">Tag 1</option>
    <option value="tag2">Tag 2</option>
  </select>`;
  const filterSelect: HTMLSelectElement = document.querySelector(
    "select[is=filter-select]",
  );

  it("fires a custom event on change", () => {
    const mockFunction = jest.fn();
    filterSelect.addEventListener("tag-button-selected", mockFunction);
    filterSelect.value = "tag1";
    filterSelect.dispatchEvent(new Event("change"));
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction.mock.calls[0][0].detail).toMatchInlineSnapshot(`
      {
        "id": "selectedTag",
        "value": "tag1",
      }
    `);
  });
});
