import "../components/search-status";

describe("search-status", () => {
  it("renders search status", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(
      `"<div>Found 1200 fonts </div>"`
    );
  });

  it("renders search status with category", () => {
    const resultsLength = 1200;
    const selectedCategory = "sans-serif";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts for</div>
      <div class="search-filter">category: <strong>sans-serif</strong><clear-button aria-label="remove category" value="category">close.svg</clear-button></div>
      <clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>"
    `);
  });

  it("renders search status with tag", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "cute";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts for</div>
      <div class="search-filter">tag: <strong>cute</strong><clear-button aria-label="remove tag" value="tag">close.svg</clear-button></div>
      <clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>"
    `);
  });

  it("renders search status with tag, need tags", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "need tags";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts that</div>
      <div class="search-filter">tag: <strong>need tags</strong><clear-button aria-label="remove tag" value="tag">close.svg</clear-button></div>
      <clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>"
    `);
  });

  it("renders search status with variant", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "italic";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts for</div>
      <div class="search-filter">variant: <strong>italic</strong><clear-button aria-label="remove variant" value="variant">close.svg</clear-button></div>
      <clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>"
    `);
  });

  it("renders search status with subset", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "hebrew";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts for</div>
      <div class="search-filter">subset: <strong>hebrew</strong><clear-button aria-label="remove subset" value="subset">close.svg</clear-button></div>
      <clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>"
    `);
  });

  it("renders search status with search", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "hello";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts for</div>
      <div class="search-filter">search: <strong>hello</strong><clear-button aria-label="remove search" value="search">close.svg</clear-button></div>
      <clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button>"
    `);
  });
});
