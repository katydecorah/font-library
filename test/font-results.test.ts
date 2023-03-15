import "../components/font-results";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "fs";

// get _site/index.html
const html = readFileSync("./_site/index.html", "utf8");
// extract body from html
const body = html.match(/<body>(.*)<\/body>/s)[1];

describe("FontResults", () => {
  let fontResults: HTMLElement;

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
    fontResults = document.querySelector("font-results");
  });

  test("renders correctly", () => {
    expect(fontResults).toMatchSnapshot();
  });

  test("fires a custom event when a font is selected", () => {
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "cute" },
      })
    );

    expect(fontResults).toMatchSnapshot();
  });

  test("fires a next-page custom event", () => {
    fontResults.dispatchEvent(new CustomEvent("next-page"));

    expect(fontResults).toMatchSnapshot();
  });

  test("fires a prev-page custom event", () => {
    fontResults.dispatchEvent(new CustomEvent("next-page"));
    fontResults.dispatchEvent(new CustomEvent("previous-page"));

    expect(fontResults).toMatchSnapshot();
  });

  test("filters fonts when a variant is selected", async () => {
    const selectVariant: HTMLSelectElement =
      document.querySelector("#select-variants");
    // mock addEventListener change event for selectVariant
    await userEvent.selectOptions(selectVariant, "300italic");

    expect(fontResults).toMatchSnapshot();
  });

  test("filters fonts when a subset is selected", async () => {
    const selectedSubset: HTMLSelectElement =
      document.querySelector("#select-subsets");
    await userEvent.selectOptions(selectedSubset, "arabic");

    expect(fontResults).toMatchSnapshot();
  });

  test("filters fonts when a category is selected", async () => {
    const selectedCategory: HTMLSelectElement =
      document.querySelector("#select-categories");
    await userEvent.selectOptions(selectedCategory, "display");

    expect(fontResults).toMatchSnapshot();
  });

  test("selects need tags tag", () => {
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "need tags" },
      })
    );

    expect(fontResults).toMatchSnapshot();
  });

  test("removes tag", () => {
    // add tag first
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "cute" },
      })
    );

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "tag" },
      })
    );

    expect(fontResults).toMatchSnapshot();
  });

  test("filters fonts when search", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "are you serious");

    expect(fontResults).toMatchSnapshot();
  });

  test("removes search filter", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "are you serious");

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "search" },
      })
    );

    expect(fontResults).toMatchSnapshot();
  });

  test("removes variable filter", async () => {
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#checkbox-variable");
    await userEvent.click(checkboxVariable);

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "variable" },
      })
    );

    expect(fontResults).toMatchSnapshot();
  });

  test("removes all filters: tag, variable, search", async () => {
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "modern" },
      })
    );
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#checkbox-variable");
    await userEvent.click(checkboxVariable);

    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "cairo");

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: undefined },
      })
    );

    expect(fontResults).toMatchSnapshot();
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
    fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchSnapshot();
  });

  test("filters when tag radio clicked", async () => {
    const radioButton: HTMLInputElement = document.querySelector(
      "#tags input[value='1980s']"
    );
    radioButton.click();
    expect(fontResults).toMatchSnapshot();
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
    fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchSnapshot();
  });

  test("filters fonts when a tag is selected", async () => {
    const selectedTag: HTMLSelectElement =
      document.querySelector("#select-tags");
    await userEvent.selectOptions(selectedTag, "outline");

    expect(fontResults).toMatchSnapshot();
  });

  test("filters fonts when variable is checked and then unchecked", async () => {
    const checkboxVariable: HTMLInputElement =
      document.querySelector("#checkbox-variable");
    await userEvent.click(checkboxVariable);
    expect(window.history.replaceState).toHaveBeenNthCalledWith(
      1,
      {},
      "",
      "/?variable=true"
    );
    expect(fontResults).toMatchSnapshot();

    // uncheck
    await userEvent.click(checkboxVariable);
    expect(window.history.replaceState).toHaveBeenNthCalledWith(
      2,
      {},
      "",
      "/?"
    );
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
    fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchSnapshot();
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
    fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchSnapshot();
  });
});
