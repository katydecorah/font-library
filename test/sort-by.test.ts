import "./components";

describe("sort-by", () => {
  it("renders", () => {
    const sortBy = "family";
    document.body.innerHTML = `<sort-by results-length="100" sort-by="${sortBy}"></sort-by>`;
    const sortByElement = document.querySelector("sort-by");
    expect(sortByElement).toMatchInlineSnapshot(`
      <sort-by
        results-length="100"
        sort-by="family"
      >
        <div
          class="label"
        >
          Sort by
        </div>
        <div
          class="btn-group"
        >
          <button
            class="active"
            data-sort="family"
          >
            Family
          </button>
          <button
            class=""
            data-sort="date"
          >
            Last modified
          </button>
        </div>
      </sort-by>
    `);
  });

  it("renders after attribute change", () => {
    document.body.innerHTML = `<sort-by results-length="100" sort-by="family"></sort-by>`;
    const sortByElement = document.querySelector("sort-by");
    sortByElement.setAttribute("sort-by", "date");
    expect(sortByElement).toMatchInlineSnapshot(`
      <sort-by
        results-length="100"
        sort-by="date"
      >
        <div
          class="label"
        >
          Sort by
        </div>
        <div
          class="btn-group"
        >
          <button
            class=""
            data-sort="family"
          >
            Family
          </button>
          <button
            class="active"
            data-sort="date"
          >
            Last modified
          </button>
        </div>
      </sort-by>
    `);
  });

  it("does not re-render when attribute is the same", () => {
    document.body.innerHTML = `<sort-by results-length="100" sort-by="family"></sort-by>`;
    const sortByElement = document.querySelector("sort-by");
    sortByElement.setAttribute("sort-by", "family");
    expect(sortByElement).toMatchInlineSnapshot(`
      <sort-by
        results-length="100"
        sort-by="family"
      >
        <div
          class="label"
        >
          Sort by
        </div>
        <div
          class="btn-group"
        >
          <button
            class="active"
            data-sort="family"
          >
            Family
          </button>
          <button
            class=""
            data-sort="date"
          >
            Last modified
          </button>
        </div>
      </sort-by>
    `);
  });

  it("do not show sort-by when results-length is 0", () => {
    document.body.innerHTML = `<sort-by results-length="0" sort-by="family"></sort-by>`;
    const sortByElement = document.querySelector("sort-by");
    expect(sortByElement).toMatchInlineSnapshot(`
      <sort-by
        results-length="0"
        sort-by="family"
      />
    `);
  });
});
