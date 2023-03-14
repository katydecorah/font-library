import "../components/pagination-buttons";

describe("pagination-buttons", () => {
  it("renders first page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 1;
    document.body.innerHTML = `<pagination-buttons resultsLength="${resultsLength}" pageSize="${pageSize}" currentPage="${curPage}"></pagination-buttons>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      "<pagination-buttons resultslength="1200" pagesize="10" currentpage="1"><div class="pagination ">
            <button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
            <div class="page-count" id="page-count">1 of 120</div>
            <button data-event="next-page" class="btn" id="btn-next">Next page</button>
          </div></pagination-buttons>"
    `);
  });

  it("renders next page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 2;
    document.body.innerHTML = `<pagination-buttons resultsLength="${resultsLength}" pageSize="${pageSize}" currentPage="${curPage}"></pagination-buttons>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      "<pagination-buttons resultslength="1200" pagesize="10" currentpage="2"><div class="pagination ">
            <button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
            <div class="page-count" id="page-count">2 of 120</div>
            <button data-event="next-page" class="btn" id="btn-next">Next page</button>
          </div></pagination-buttons>"
    `);
  });

  it("renders last page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const curPage = 120;
    document.body.innerHTML = `<pagination-buttons resultsLength="${resultsLength}" pageSize="${pageSize}" currentPage="${curPage}"></pagination-buttons>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      "<pagination-buttons resultslength="1200" pagesize="10" currentpage="120"><div class="pagination ">
            <button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
            <div class="page-count" id="page-count">120 of 120</div>
            <button data-event="next-page" class="btn" id="btn-next" disabled="">Next page</button>
          </div></pagination-buttons>"
    `);
  });

  it("pagination hidden", () => {
    const resultsLength = 10;
    const pageSize = 10;
    const curPage = 1;
    document.body.innerHTML = `<pagination-buttons resultsLength="${resultsLength}" pageSize="${pageSize}" currentPage="${curPage}"></pagination-buttons>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      "<pagination-buttons resultslength="10" pagesize="10" currentpage="1"><div class="pagination hide">
            <button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
            <div class="page-count" id="page-count">1 of 1</div>
            <button data-event="next-page" class="btn" id="btn-next" disabled="">Next page</button>
          </div></pagination-buttons>"
    `);
  });
});
