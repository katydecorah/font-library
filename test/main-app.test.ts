import "./components";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "fs";

// get _site/index.html
const html = readFileSync("./_site/index.html", "utf8");
// extract body from html
const body = html.match(/<body>(.*)<\/body>/s)[1];

describe("MainApp", () => {
  let mainApp: HTMLElement;

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    const location = {
      ...window.location,
      search: "",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });
    window.history.replaceState = jest.fn();
    document.body.innerHTML = body;
    mainApp = document.querySelector("main-app");
  });

  test("renders correctly", () => {
    expect(mainApp).toMatchSnapshot();
  });

  test("fires a custom event when a font is selected", () => {
    mainApp.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { value: "cute" },
      })
    );
    // expect "cute" to be selected
    expect(
      (document.querySelector("#selectedTag") as HTMLSelectElement).value
    ).toBe("cute");
    // expect cute to show in search-results
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="15"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag="cute"
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 15 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          tag: 
          <strong>
            cute
          </strong>
          <button
            aria-label="remove tag"
            class="clear-button"
            is="clear-button"
            value="tag"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
    // expect cute radio to be checked
    expect(
      (document.querySelector("#tags input[value='cute']") as HTMLInputElement)
        .checked
    ).toBe(true);
  });

  test("filters fonts when a variant is selected", async () => {
    const selectVariant: HTMLSelectElement =
      document.querySelector("#selectedVariant");
    await userEvent.selectOptions(selectVariant, "300italic");

    expect(selectVariant.value).toBe("300italic");
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="136"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant="300italic"
      >
        <div>
          Found 136 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variant: 
          <strong>
            300italic
          </strong>
          <button
            aria-label="remove variant"
            class="clear-button"
            is="clear-button"
            value="variant"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("filters fonts when a subset is selected", async () => {
    const selectedSubset: HTMLSelectElement =
      document.querySelector("#selectedSubset");
    await userEvent.selectOptions(selectedSubset, "arabic");

    expect(selectedSubset.value).toBe("arabic");
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="42"
        search=""
        selectedcategory=""
        selectedsubset="arabic"
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 42 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          subset: 
          <strong>
            arabic
          </strong>
          <button
            aria-label="remove subset"
            class="clear-button"
            is="clear-button"
            value="subset"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("filters fonts when a category is selected", async () => {
    const selectedCategory: HTMLSelectElement =
      document.querySelector("#selectedCategory");
    await userEvent.selectOptions(selectedCategory, "display");

    expect(selectedCategory.value).toBe("display");
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="390"
        search=""
        selectedcategory="display"
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 390 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          category: 
          <strong>
            display
          </strong>
          <button
            aria-label="remove category"
            class="clear-button"
            is="clear-button"
            value="category"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("selects need tags tag", () => {
    mainApp.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { value: "need tags" },
      })
    );
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="524"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag="need tags"
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 524 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          tag: 
          <strong>
            need tags
          </strong>
          <button
            aria-label="remove tag"
            class="clear-button"
            is="clear-button"
            value="tag"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("removes tag", () => {
    // add tag first
    mainApp.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { value: "cute" },
      })
    );

    mainApp.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "tag" },
      })
    );

    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1495"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1495 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("font-item").length).toEqual(10);
  });

  test("filters fonts when search", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#selectedSearch");
    await userEvent.type(inputSearch, "are you serious");

    const searchStatus = document.querySelector("search-status");
    const resultsLength = parseInt(searchStatus.getAttribute("resultslength"));

    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1"
        search="are you serious"
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          search: 
          <strong>
            are you serious
          </strong>
          <button
            aria-label="remove search"
            class="clear-button"
            is="clear-button"
            value="search"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);

    // expect there two be resultsLength number of font-items
    expect(document.querySelectorAll("font-item").length).toEqual(
      resultsLength
    );
  });

  test("removes search filter", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#selectedSearch");
    await userEvent.type(inputSearch, "are you serious");

    mainApp.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "search" },
      })
    );
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1495"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1495 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("font-item").length).toEqual(10);
  });

  test("removes variable filter", async () => {
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#selectedVariable");
    await userEvent.click(checkboxVariable);

    mainApp.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "variable" },
      })
    );

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1495"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1495 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("font-item").length).toEqual(10);
  });

  test("removes all filters: tag, variable, search", async () => {
    mainApp.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { value: "modern" },
      })
    );
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#selectedVariable");
    await userEvent.click(checkboxVariable);

    const inputSearch: HTMLInputElement =
      document.querySelector("#selectedSearch");
    await userEvent.type(inputSearch, "cairo");

    mainApp.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: undefined },
      })
    );

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1495"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1495 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("font-item").length).toEqual(10);
  });

  test('filters based on tag "cute" in search query', async () => {
    const location = {
      ...window.location,
      search: "?tag=cute",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = body;

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="15"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag="cute"
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 15 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          tag: 
          <strong>
            cute
          </strong>
          <button
            aria-label="remove tag"
            class="clear-button"
            is="clear-button"
            value="tag"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);

    // expect tag to be selected
    expect(
      (document.querySelector("#selectedTag") as HTMLSelectElement).value
    ).toBe("cute");
  });

  test("filters when tag radio clicked", async () => {
    const radioButton: HTMLInputElement = document.querySelector(
      "#tags input[value='1980s']"
    );
    radioButton.click();
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="2"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag="1980s"
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 2 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          tag: 
          <strong>
            1980s
          </strong>
          <button
            aria-label="remove tag"
            class="clear-button"
            is="clear-button"
            value="tag"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("skips unknown tag in search query", async () => {
    const location = {
      ...window.location,
      search: "?tag=donuts123",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = body;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1495"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1495 fonts
        </div>
      </search-status>
    `);
  });

  test("filters fonts when a tag is selected", async () => {
    const selectedTag: HTMLSelectElement =
      document.querySelector("#selectedTag");
    await userEvent.selectOptions(selectedTag, "outline");

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="24"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag="outline"
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 24 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          tag: 
          <strong>
            outline
          </strong>
          <button
            aria-label="remove tag"
            class="clear-button"
            is="clear-button"
            value="tag"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("filters fonts when variable is checked and then unchecked", async () => {
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#selectedVariable");
    await userEvent.click(checkboxVariable);
    expect(window.history.replaceState).toHaveBeenNthCalledWith(
      1,
      {},
      "",
      "/?variable=true"
    );
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="293"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable="true"
        selectedvariant=""
      >
        <div>
          Found 293 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="variable"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);

    // uncheck
    await userEvent.click(checkboxVariable);
    expect(window.history.replaceState).toHaveBeenNthCalledWith(
      2,
      {},
      "",
      "/?"
    );
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="293"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable="true"
        selectedvariant=""
      >
        <div>
          Found 293 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="variable"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
  });

  test("filters based on variable=true in query string", async () => {
    const location = {
      ...window.location,
      search: "?variable=true",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = body;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="293"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable="true"
        selectedvariant=""
      >
        <div>
          Found 293 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="variable"
          >
            close.svg
          </button>
        </div>
        

        <button
          aria-label="remove all filters"
          class="btn btn-clear clear-button"
          is="clear-button"
        >
          Clear
        </button>
      </search-status>
    `);
    // expect variable to be checked
    expect(
      (document.querySelector("#selectedVariable") as HTMLInputElement).checked
    ).toBe(true);
  });

  test("does nothing when variable=false in query string", async () => {
    const location = {
      ...window.location,
      search: "?variable=false",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = body;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        class="search-status"
        resultslength="1495"
        search=""
        selectedcategory=""
        selectedsubset=""
        selectedtag=""
        selectedvariable=""
        selectedvariant=""
      >
        <div>
          Found 1495 fonts
        </div>
      </search-status>
    `);
    expect(
      (document.querySelector("#selectedVariable") as HTMLInputElement).checked
    ).toBe(false);
  });
});
