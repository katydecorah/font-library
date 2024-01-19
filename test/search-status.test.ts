import "./components";

describe("search-status", () => {
  it("renders search status", () => {
    const resultsLength = 1200;

    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(
      `"<div>Found 1200 fonts</div>"`,
    );
  });

  it("renders search status with category", () => {
    const resultsLength = 1200;
    const selectedCategory = "sans-serif";
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}" selected-category="${selectedCategory}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">category: <strong>sans-serif</strong><button is="clear-button" aria-label="remove category" value="selectedCategory" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with tag", () => {
    const resultsLength = 1200;
    const selectedTag = "cute";
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}" selected-tag="${selectedTag}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">tag: <strong>cute</strong><button is="clear-button" aria-label="remove tag" value="selectedTag" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with tag, need tags", () => {
    const resultsLength = 1200;
    const selectedTag = "need tags";
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}" selected-tag="${selectedTag}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">tag: <strong>need tags</strong><button is="clear-button" aria-label="remove tag" value="selectedTag" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with variant", () => {
    const resultsLength = 1200;
    const selectedVariant = "italic";
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}" selected-variant="${selectedVariant}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">variant: <strong>italic</strong><button is="clear-button" aria-label="remove variant" value="selectedVariant" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with subset", () => {
    const resultsLength = 1200;
    const selectedSubset = "hebrew";
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}" selected-subset="${selectedSubset}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">subset: <strong>hebrew</strong><button is="clear-button" aria-label="remove subset" value="selectedSubset" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with search", () => {
    const resultsLength = 1200;
    const search = "modern";
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}"  selected-search="${search}"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">search: <strong>modern</strong><button is="clear-button" aria-label="remove search" value="selectedSearch" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });

  it("renders search status with variable", () => {
    const resultsLength = 1200;
    document.body.innerHTML = `<search-status class="search-status" results-length="${resultsLength}" selected-variable="true"></search-status>`;
    const searchStatus = document.querySelector("search-status");
    expect(searchStatus.innerHTML).toMatchInlineSnapshot(`
      "<div>Found 1200 fonts: </div>
      <div class="search-filter">variable<button is="clear-button" aria-label="remove variable" value="selectedVariable" class="clear-button">close.svg</button></div>
      <button is="clear-button" aria-label="remove all filters" class="btn btn-clear clear-button">Clear</button>"
    `);
  });
});
