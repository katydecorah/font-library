import "./components";

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
      `"<div>Found 1200 fonts</div>"`
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
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">category: <strong>sans-serif</strong><button is="clear-button" aria-label="remove category" value="category" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
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
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">tag: <strong>cute</strong><button is="clear-button" aria-label="remove tag" value="tag" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
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
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">tag: <strong>need tags</strong><button is="clear-button" aria-label="remove tag" value="tag" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
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
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">variant: <strong>italic</strong><button is="clear-button" aria-label="remove variant" value="variant" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
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
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">subset: <strong>hebrew</strong><button is="clear-button" aria-label="remove subset" value="subset" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
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
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">search: <strong>hello</strong><button is="clear-button" aria-label="remove search" value="search" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with variable", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" selectedVariable="true" search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">variable<button is="clear-button" aria-label="remove variable" value="variable" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });
});
