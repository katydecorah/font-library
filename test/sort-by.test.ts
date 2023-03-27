import userEvent from "@testing-library/user-event";

import "./components";

describe("sort-by", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("renders", () => {
    const sortBy = "family";
    document.body.innerHTML = `<sort-by sort-by="${sortBy}"></sort-by>`;
    const sortByElement = document.querySelector("sort-by").innerHTML;
    expect(sortByElement).toMatchInlineSnapshot(
      `"<div class="sort-by"><div class="label">Sort by</div><div class="btn-group"><button class="" data-sort="date">Last modified</button><button class="active" data-sort="family">Family</button></div></div>"`
    );
  });

  it('fires a "sort-by" custom event', () => {
    const sortBy = "family";
    document.body.innerHTML = `<sort-by sort-by="${sortBy}"></sort-by>`;

    const sortbuttons = document.querySelector(
      "sort-by button[data-sort='date']"
    );
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const clickHandler = jest.fn();
    sortbuttons.addEventListener("click", clickHandler);
    sortbuttons.dispatchEvent(clickEvent);
    expect(clickHandler).toHaveBeenCalled();
  });
});
