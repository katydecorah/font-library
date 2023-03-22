import "./components";

describe("pagination-buttons", () => {
  it("renders first page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${curPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<div class="pagination ">
        <button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
        <div class="page-count" id="page-count">1 of 120</div>
        <button data-event="next-page" class="btn" id="btn-next">Next page</button>
      </div>"
    `);
  });

  it("renders next page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 2;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${curPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<div class="pagination ">
        <button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
        <div class="page-count" id="page-count">2 of 120</div>
        <button data-event="next-page" class="btn" id="btn-next">Next page</button>
      </div>"
    `);
  });

  it("renders last page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 120;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${curPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<div class="pagination ">
        <button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
        <div class="page-count" id="page-count">120 of 120</div>
        <button data-event="next-page" class="btn" id="btn-next" disabled="">Next page</button>
      </div>"
    `);
  });

  it("pagination hidden", () => {
    const resultsLength = 10;
    const pageSize = 10;
    const curPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${curPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<div class="pagination hide">
        <button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
        <div class="page-count" id="page-count">1 of 1</div>
        <button data-event="next-page" class="btn" id="btn-next" disabled="">Next page</button>
      </div>"
    `);
  });

  it("fires a custom event when clicked", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${curPage}"></pagination-buttons>`;
    const paginationButtons = document.querySelector(
      "pagination-buttons #btn-next"
    );
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const clickHandler = jest.fn();
    paginationButtons.addEventListener("click", clickHandler);
    paginationButtons.dispatchEvent(clickEvent);
    expect(clickHandler).toHaveBeenCalled();
  });
});
