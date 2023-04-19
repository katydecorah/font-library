import "./components";

describe("pagination-buttons", () => {
  beforeEach(() => {
    const location = {
      ...window.location,
      page: "",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });
  });

  it("renders", () => {
    const resultsLength = 1200;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" current-page="1"></pagination-buttons>`;
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
    const currentPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
      <div class="page-count" id="page-count">1 of 120</div>
      <button data-event="next-page" class="btn" id="btn-next">Next page</button>"
    `);
  });

  it("does not re-render when attribute value does not change", () => {
    const resultsLength = 1200;
    const currentPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons = document.querySelector("pagination-buttons");
    const initialHTML = paginationButtons.innerHTML;
    paginationButtons.setAttribute("current-page", "1");
    expect(paginationButtons.innerHTML).toEqual(initialHTML);
  });

  it("renders next page", () => {
    const resultsLength = 1200;
    const currentPage = 2;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" current-page="${currentPage}"></pagination-buttons>`;
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
    const currentPage = 120;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" current-page="${currentPage}"></pagination-buttons>`;
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
    const currentPage = 1;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}" current-page="${currentPage}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`""`);
  });

  it("gets initial page from query string param", () => {
    const resultsLength = 1200;
    const currentPage = 12;
    window.location.search = `?page=${currentPage}`;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
      <div class="page-count" id="page-count">12 of 120</div>
      <button data-event="next-page" class="btn" id="btn-next">Next page</button>"
    `);
  });

  it("handles initial query string param that is too big", () => {
    const resultsLength = 100;
    const currentPage = 15;
    window.location.search = `?page=${currentPage}`;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev">Previous page</button>
      <div class="page-count" id="page-count">10 of 10</div>
      <button data-event="next-page" class="btn" id="btn-next" disabled="">Next page</button>"
    `);
  });

  it("handles initial query string param that is NaN", () => {
    const resultsLength = 100;
    const currentPage = "pizza";
    window.location.search = `?page=${currentPage}`;
    document.body.innerHTML = `<pagination-buttons results-length="${resultsLength}"></pagination-buttons>`;
    const paginationButtons =
      document.querySelector("pagination-buttons").innerHTML;
    expect(paginationButtons).toMatchInlineSnapshot(`
      "<button data-event="previous-page" class="btn" id="btn-prev" disabled="">Previous page</button>
      <div class="page-count" id="page-count">1 of 10</div>
      <button data-event="next-page" class="btn" id="btn-next">Next page</button>"
    `);
  });
});
