import "./components";

describe("pagination-buttons", () => {
  it("renders", () => {
    const resultsLength = 1200;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
      <div class="page-count" id="page-count">1 of 120</div>
      <button data-event="next-page" class="btn" id="btn-next">Next page</button>"
    `);
  });

  it("renders first page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const currentPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
      <div class="page-count" id="page-count">1 of 120</div>
      <button data-event="next-page" class="btn" id="btn-next">Next page</button>"
    `);
  });

  it("renders next page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const currentPage = 2;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
      <div class="page-count" id="page-count">2 of 120</div>
      <button data-event="next-page" class="btn" id="btn-next">Next page</button>"
    `);
  });

  it("renders last page", () => {
    const resultsLength = 1200;
    const pageSize = 10;
    const currentPage = 120;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
      <div class="page-count" id="page-count">120 of 120</div>
      <button data-event="next-page" class="btn" id="btn-next" disabled="">Next page</button>"
    `);
  });

  it("pagination hidden", () => {
    const resultsLength = 10;
    const pageSize = 10;
    const currentPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" page-size="${pageSize}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`""`);
  });
});
