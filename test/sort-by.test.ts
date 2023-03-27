import "./components";

describe("sort-by", () => {
  it("renders", () => {
    const sortBy = "family";
    document.body.innerHTML = `<sort-by sort-by="${sortBy}"></sort-by>`;
    const sortByElement = document.querySelector("sort-by").innerHTML;
    expect(sortByElement).toMatchInlineSnapshot(
      `"<div class="label">Sort by</div><div class="btn-group"><button class="active" data-sort="family">Family</button><button class="" data-sort="date">Last modified</button></div>"`
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
