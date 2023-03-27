import userEvent from "@testing-library/user-event";
import "./components";

describe("FontResults", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  test("renders correctly", () => {
    document.body.innerHTML = `<div id="content"><font-results selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchSnapshot();
  });

  test("fires a next-page custom event", () => {
    document.body.innerHTML = `<div id="content"><font-results selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const fontResults = document.querySelector("font-results");
    fontResults.dispatchEvent(new CustomEvent("next-page"));
    const pagination = document.querySelector("pagination-buttons");
    expect(pagination.getAttribute("current-page")).toBe("2");
  });

  test("fires a prev-page custom event", () => {
    document.body.innerHTML = `<div id="content"><font-results selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const fontResults = document.querySelector("font-results");
    fontResults.dispatchEvent(new CustomEvent("next-page"));
    fontResults.dispatchEvent(new CustomEvent("previous-page"));
    const pagination = document.querySelector("pagination-buttons");
    expect(pagination.getAttribute("current-page")).toBe("1");
  });

  test("clicks data-sort button", async () => {
    const fontResults = document.querySelector("font-results");
    const sortButtons = fontResults.querySelectorAll("[data-sort]");
    document.body.innerHTML = `<div id="content"><font-results selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const dateButton = sortButtons[0] as HTMLButtonElement;
    await user.click(dateButton);
    const sortBy = fontResults.querySelector(".sort-by");
    expect(sortBy).toMatchInlineSnapshot(`
      <div
        class="sort-by"
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
            data-sort="date"
          >
            Last modified
          </button>
          <button
            class=""
            data-sort="family"
          >
            Family
          </button>
        </div>
      </div>
    `);
  });
});
