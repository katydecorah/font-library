import "../components/filter-select";

describe("filter-select", () => {
  document.body.innerHTML = `<select is="filter-select" id="selected-tag" class="filter-select">
    <option value="all">All</option>
    <option value="tag1">Tag 1</option>
    <option value="tag2">Tag 2</option>
  </select>`;
  const filterSelect: HTMLSelectElement = document.querySelector(
    "select[is=filter-select]"
  );

  it("fires a custom event on change", () => {
    const mockFn = jest.fn();
    filterSelect.addEventListener("tag-button-selected", mockFn);
    filterSelect.value = "tag1";
    filterSelect.dispatchEvent(new Event("change"));
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn.mock.calls[0][0].detail).toMatchInlineSnapshot(`
      {
        "id": "selectedTag",
        "value": "tag1",
      }
    `);
  });
});
