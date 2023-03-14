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
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="" selectedtag="" selectedsubset="" selectedvariant="" search=""><div>Found 1200 fonts </div></search-status>"`
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
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="sans-serif" selectedtag="" selectedsubset="" selectedvariant="" search=""><div>Found 1200 fonts  for </div><div class="search-filter">category: <strong>sans-serif</strong><clear-button aria-label="remove category" value="category"><icon-close></icon-close></clear-button></div><clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button></search-status>"`
    );
  });

  it("renders search status with tag", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "cute";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="" selectedtag="cute" selectedsubset="" selectedvariant="" search=""><div>Found 1200 fonts  for </div><div class="search-filter">tag: <strong>cute</strong><clear-button aria-label="remove tag" value="tag"><icon-close></icon-close></clear-button></div><clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button></search-status>"`
    );
  });

  it("renders search status with tag, need tags", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "need tags";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="" selectedtag="need tags" selectedsubset="" selectedvariant="" search=""><div>Found 1200 fonts  that </div><div class="search-filter">tag: <strong>need tags</strong><clear-button aria-label="remove tag" value="tag"><icon-close></icon-close></clear-button></div><clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button></search-status>"`
    );
  });

  it("renders search status with variant", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "italic";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="" selectedtag="" selectedsubset="" selectedvariant="italic" search=""><div>Found 1200 fonts  for </div><div class="search-filter">variant: <strong>italic</strong><clear-button aria-label="remove variant" value="variant"><icon-close></icon-close></clear-button></div><clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button></search-status>"`
    );
  });

  it("renders search status with subset", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "hebrew";
    const selectedVariant = "";
    const search = "";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="" selectedtag="" selectedsubset="hebrew" selectedvariant="" search=""><div>Found 1200 fonts  for </div><div class="search-filter">subset: <strong>hebrew</strong><clear-button aria-label="remove subset" value="subset"><icon-close></icon-close></clear-button></div><clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button></search-status>"`
    );
  });

  it("renders search status with search", () => {
    const resultsLength = 1200;
    const selectedCategory = "";
    const selectedTag = "";
    const selectedSubset = "";
    const selectedVariant = "";
    const search = "hello";
    document.body.innerHTML = `<search-status class="search-status" resultsLength="${resultsLength}" selectedCategory="${selectedCategory}" selectedTag="${selectedTag}" selectedSubset="${selectedSubset}" selectedVariant="${selectedVariant}" search="${search}"></search-status>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<search-status class="search-status" resultslength="1200" selectedcategory="" selectedtag="" selectedsubset="" selectedvariant="" search="hello"><div>Found 1200 fonts  for </div><div class="search-filter">search: <strong>hello</strong><clear-button aria-label="remove search" value="search"><icon-close></icon-close></clear-button></div><clear-button aria-label="remove all filters" class="btn btn-clear">Clear</clear-button></search-status>"`
    );
  });
});
