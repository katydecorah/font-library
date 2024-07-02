import "./components";
import { userEvent } from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import customEvent from "../components/custom-event";

// get _site/index.html
const html = readFileSync("./_site/index.html", "utf8");
// extract body from html
const body = html.match(/<body>(.*)<\/body>/s)[1];

describe("MainApp", () => {
  let mainApp: HTMLElement;
  let user: ReturnType<typeof userEvent.setup>;

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    user = userEvent.setup();
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

  afterEach(() => {
    jest.clearAllMocks();

    // reset attributes from MainApp
    const attributes = [
      "selected-category",
      "selected-subset",
      "selected-variant",
      "selected-tag",
      "selected-search",
      "selected-variable",
      "sort-by",
    ];

    for (const attribute of attributes) {
      mainApp.removeAttribute(attribute);
    }
  });

  test("renders correctly", () => {
    expect(mainApp).toMatchSnapshot();
  });

  test("filters fonts when a variant is selected", async () => {
    const selectVariant: HTMLSelectElement =
      document.querySelector("#selectedVariant");
    await user.selectOptions(selectVariant, "300italic");

    expect(selectVariant.value).toBe("300italic");
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="150"
        selected-variant="300italic"
      >
        <div>
          Found 150 fonts: 
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
            value="selectedVariant"
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
    await user.selectOptions(selectedSubset, "arabic");

    expect(selectedSubset.value).toBe("arabic");
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="47"
        selected-subset="arabic"
      >
        <div>
          Found 47 fonts: 
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
            value="selectedSubset"
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
    await user.selectOptions(selectedCategory, "display");

    expect(selectedCategory.value).toBe("display");
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="435"
        selected-category="display"
      >
        <div>
          Found 435 fonts: 
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
            value="selectedCategory"
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
      customEvent("tag-button-selected", {
        value: "need tags",
        id: "selectedTag",
      })
    );
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="411"
        selected-tag="need tags"
      >
        <div>
          Found 411 fonts: 
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
            value="selectedTag"
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
      customEvent("tag-button-selected", {
        value: "cute",
        id: "selectedTag",
      })
    );

    mainApp.dispatchEvent(
      customEvent("clear-filter", {
        value: "selectedTag",
      })
    );

    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
        selected-tag=""
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
  });

  test("filters fonts when search", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#selectedSearch");
    await user.type(inputSearch, "are you serious");

    const searchStatus = document.querySelector("search-status");
    const resultsLength = Number.parseInt(
      searchStatus.getAttribute("results-length"),
      10
    );

    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="1"
        selected-search="are you serious"
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
            value="selectedSearch"
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
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(
      resultsLength
    );
  });

  test("removes search filter", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#selectedSearch");
    await user.type(inputSearch, "are you serious");

    mainApp.dispatchEvent(
      customEvent("clear-filter", {
        value: "selectedSearch",
      })
    );
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
        selected-search=""
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
  });

  test("removes variable filter", async () => {
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#selectedVariable");
    checkboxVariable.click();

    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="298"
        selected-variable="true"
      >
        <div>
          Found 298 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="selectedVariable"
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

    mainApp.dispatchEvent(
      customEvent("clear-filter", {
        value: "selectedVariable",
      })
    );

    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
  });

  test("removes category filter", async () => {
    await user.selectOptions(
      document.querySelector("#selectedCategory"),
      "display"
    );

    mainApp.dispatchEvent(
      customEvent("clear-filter", {
        value: "selectedCategory",
      })
    );

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
        selected-category=""
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
  });

  test("removes subset filter", async () => {
    await user.selectOptions(
      document.querySelector("#selectedSubset"),
      "hebrew"
    );

    mainApp.dispatchEvent(
      customEvent("clear-filter", {
        value: "selectedSubset",
      })
    );

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
        selected-subset=""
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
  });

  test("removes variant filter", async () => {
    await user.selectOptions(
      document.querySelector("#selectedVariant"),
      "100italic"
    );

    mainApp.dispatchEvent(
      customEvent("clear-filter", {
        value: "selectedVariant",
      })
    );

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
        selected-variant=""
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
  });

  test("adds and removes all filters: tag, variable, search, category, subset, variant", async () => {
    mainApp.dispatchEvent(
      customEvent("tag-button-selected", {
        value: "modern",
        id: "selectedTag",
      })
    );
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#selectedVariable");
    checkboxVariable.click();

    await user.type(document.querySelector("#selectedSearch"), "cairo");

    await user.selectOptions(
      document.querySelector("#selectedCategory"),
      "display"
    );

    await user.selectOptions(
      document.querySelector("#selectedSubset"),
      "hebrew"
    );

    await user.selectOptions(
      document.querySelector("#selectedVariant"),
      "100italic"
    );

    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="0"
        selected-category="display"
        selected-search="cairo"
        selected-subset="hebrew"
        selected-tag="modern"
        selected-variable="true"
        selected-variant="100italic"
      >
        <div>
          Found 0 fonts: 
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
            value="selectedCategory"
          >
            close.svg
          </button>
        </div>
        <div
          class="search-filter"
        >
          tag: 
          <strong>
            modern
          </strong>
          <button
            aria-label="remove tag"
            class="clear-button"
            is="clear-button"
            value="selectedTag"
          >
            close.svg
          </button>
        </div>
        <div
          class="search-filter"
        >
          subset: 
          <strong>
            hebrew
          </strong>
          <button
            aria-label="remove subset"
            class="clear-button"
            is="clear-button"
            value="selectedSubset"
          >
            close.svg
          </button>
        </div>
        <div
          class="search-filter"
        >
          variant: 
          <strong>
            100italic
          </strong>
          <button
            aria-label="remove variant"
            class="clear-button"
            is="clear-button"
            value="selectedVariant"
          >
            close.svg
          </button>
        </div>
        <div
          class="search-filter"
        >
          search: 
          <strong>
            cairo
          </strong>
          <button
            aria-label="remove search"
            class="clear-button"
            is="clear-button"
            value="selectedSearch"
          >
            close.svg
          </button>
        </div>
        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="selectedVariable"
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

    // click clear button
    await user.click(document.querySelector(".btn-clear"));

    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
        selected-category=""
        selected-search=""
        selected-subset=""
        selected-tag=""
        selected-variant=""
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(document.querySelectorAll("li[is='font-item']").length).toEqual(10);
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
    window.dispatchEvent(new Event("main-app-loaded"));

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="22"
        selected-tag="cute"
      >
        <div>
          Found 22 fonts: 
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
            value="selectedTag"
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
        results-length="1699"
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
  });

  test("filters fonts when a tag is selected", async () => {
    const selectedTag: HTMLSelectElement =
      document.querySelector("#selectedTag");
    await user.selectOptions(selectedTag, "outline");

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="30"
        selected-tag="outline"
      >
        <div>
          Found 30 fonts: 
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
            value="selectedTag"
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
    expect(checkboxVariable.checked).toBeFalsy();
    checkboxVariable.click();
    expect(checkboxVariable.checked).toBeTruthy();
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="298"
        selected-variable="true"
      >
        <div>
          Found 298 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="selectedVariable"
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
    checkboxVariable.click();
    expect(checkboxVariable.checked).toBeFalsy();
    expect(document.querySelector("search-status")).toMatchInlineSnapshot(`
      <search-status
        results-length="1699"
      >
        <div>
          Found 1699 fonts
        </div>
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
    window.dispatchEvent(new Event("main-app-loaded"));

    const searchStatus = document.querySelector("search-status");
    expect(searchStatus).toMatchInlineSnapshot(`
      <search-status
        results-length="298"
        selected-variable="true"
      >
        <div>
          Found 298 fonts: 
        </div>
        

        <div
          class="search-filter"
        >
          variable
          <button
            aria-label="remove variable"
            class="clear-button"
            is="clear-button"
            value="selectedVariable"
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
        results-length="1699"
      >
        <div>
          Found 1699 fonts
        </div>
      </search-status>
    `);
    expect(
      (document.querySelector("#selectedVariable") as HTMLInputElement).checked
    ).toBe(false);
  });

  test("sorts fonts when sort-by button is clicked", async () => {
    const sortByButton: HTMLButtonElement = document.querySelector(
      "sort-by button[data-sort='date']"
    );
    sortByButton.click();

    const sortBy = document.querySelector("sort-by");
    expect(sortBy).toMatchInlineSnapshot(`
      <sort-by
        results-length="1699"
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

  it("current page changes on click", () => {
    document.body.innerHTML = body;
    const nextButton: HTMLButtonElement = document.querySelector(
      "pagination-buttons #btn-next"
    );
    nextButton.click();
    mainApp = document.querySelector("main-app");
    expect(mainApp.getAttribute("current-page")).toBe("2");
    const paginationButtons = document.querySelector("pagination-buttons");
    expect(paginationButtons.getAttribute("current-page")).toBe("2");
  });

  it("current page changes on click, next then back", () => {
    document.body.innerHTML = body;
    const nextButton: HTMLButtonElement = document.querySelector(
      "pagination-buttons #btn-next"
    );
    nextButton.click();
    mainApp = document.querySelector("main-app");
    expect(mainApp.getAttribute("current-page")).toBe("2");
    const paginationButtons = document.querySelector("pagination-buttons");
    expect(paginationButtons.getAttribute("current-page")).toBe("2");

    const backButton: HTMLButtonElement = document.querySelector(
      "pagination-buttons #btn-prev"
    );
    backButton.click();
    expect(mainApp.getAttribute("current-page")).toBe("1");
    expect(paginationButtons.getAttribute("current-page")).toBe("1");
  });

  it("current page changes when a different filter is changed", () => {
    document.body.innerHTML = body;
    const nextButton: HTMLButtonElement = document.querySelector(
      "pagination-buttons #btn-next"
    );
    nextButton.click();
    mainApp = document.querySelector("main-app");
    expect(mainApp.getAttribute("current-page")).toBe("2");
    const paginationButtons = document.querySelector("pagination-buttons");
    expect(paginationButtons.getAttribute("current-page")).toBe("2");

    const checkboxVariable: HTMLInputElement =
      document.querySelector("#selectedVariable");
    checkboxVariable.click();

    expect(mainApp.getAttribute("current-page")).toBe("1");
  });
});
