import "../components/font-results";

describe("FontResults", () => {
  test("renders correctly", () => {
    document.body.innerHTML = `<main class="content" id="content">
        <section class="selects">
          <h2>Filters</h2>
          <div class="select-group-container">
            <div class="select-group">
              <label for="input-search">Filter fonts</label>
              <input type="text" id="input-search" />
            </div><div class="select-group mobile">
              <label for="select-tags">tags</label>
              <select id="select-tags">
                <option value="">All tags</option>
              </select>
            </div><div class="select-group">
              <label for="select-categories">categories</label>
              <select id="select-categories">
                <option value="">All categories</option>
              </select>
            </div><div class="select-group">
              <label for="select-subsets">subsets</label>
              <select id="select-subsets">
                <option value="">All subsets</option>
               </select>
            </div><div class="select-group">
              <label for="select-variants">variants</label>
              <select id="select-variants">
                <option value="">All variants</option>
                </select>
            </div></div>
        </section>
        <section class="results">
          <font-results>
            <div id="search-status"></div>
            <div id="families" class="families"></div>
            <div id="pagination"></div>
          </font-results>
        </section>
      </main>`;
    const fontResults = document.querySelector("font-results");
    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="1497" selectedcategory="" selectedtag="" selectedsubset="" selectedvariant="" search=""></search-status></div>
                  <div id="families" class="families"><font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;ABeeZee&quot;,&quot;slug&quot;:&quot;ABeeZee&quot;,&quot;id&quot;:&quot;abeezee&quot;,&quot;variants&quot;:[&quot;regular&quot;,&quot;italic&quot;],&quot;subsets&quot;:[&quot;latin&quot;,&quot;latin-ext&quot;],&quot;category&quot;:&quot;sans-serif&quot;,&quot;tags&quot;:[&quot;literacy&quot;,&quot;kids&quot;],&quot;lineNumber&quot;:2}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Abel&quot;,&quot;slug&quot;:&quot;Abel&quot;,&quot;id&quot;:&quot;abel&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;],&quot;category&quot;:&quot;sans-serif&quot;,&quot;tags&quot;:[&quot;condensed&quot;],&quot;lineNumber&quot;:3}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Abhaya Libre&quot;,&quot;slug&quot;:&quot;Abhaya+Libre&quot;,&quot;id&quot;:&quot;abhaya-libre&quot;,&quot;variants&quot;:[&quot;regular&quot;,&quot;500&quot;,&quot;600&quot;,&quot;700&quot;,&quot;800&quot;],&quot;subsets&quot;:[&quot;latin&quot;,&quot;latin-ext&quot;,&quot;sinhala&quot;],&quot;category&quot;:&quot;serif&quot;,&quot;tags&quot;:[],&quot;lineNumber&quot;:4}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Aboreto&quot;,&quot;slug&quot;:&quot;Aboreto&quot;,&quot;id&quot;:&quot;aboreto&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;,&quot;latin-ext&quot;],&quot;category&quot;:&quot;display&quot;,&quot;tags&quot;:[&quot;caps&quot;],&quot;lineNumber&quot;:5}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Abril Fatface&quot;,&quot;slug&quot;:&quot;Abril+Fatface&quot;,&quot;id&quot;:&quot;abril-fatface&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;,&quot;latin-ext&quot;],&quot;category&quot;:&quot;display&quot;,&quot;tags&quot;:[&quot;heavy&quot;,&quot;elegant&quot;,&quot;didone&quot;,&quot;headlines&quot;],&quot;lineNumber&quot;:6}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Abyssinica SIL&quot;,&quot;slug&quot;:&quot;Abyssinica+SIL&quot;,&quot;id&quot;:&quot;abyssinica-sil&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;ethiopic&quot;,&quot;latin&quot;,&quot;latin-ext&quot;],&quot;category&quot;:&quot;serif&quot;,&quot;tags&quot;:[],&quot;lineNumber&quot;:7}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Aclonica&quot;,&quot;slug&quot;:&quot;Aclonica&quot;,&quot;id&quot;:&quot;aclonica&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;],&quot;category&quot;:&quot;sans-serif&quot;,&quot;tags&quot;:[&quot;modern&quot;,&quot;friendly&quot;],&quot;lineNumber&quot;:8}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Acme&quot;,&quot;slug&quot;:&quot;Acme&quot;,&quot;id&quot;:&quot;acme&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;],&quot;category&quot;:&quot;sans-serif&quot;,&quot;tags&quot;:[&quot;cartoon&quot;,&quot;comic&quot;,&quot;groovy&quot;,&quot;headlines&quot;],&quot;lineNumber&quot;:9}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Actor&quot;,&quot;slug&quot;:&quot;Actor&quot;,&quot;id&quot;:&quot;actor&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;],&quot;category&quot;:&quot;sans-serif&quot;,&quot;tags&quot;:[&quot;thin&quot;,&quot;legibility&quot;],&quot;lineNumber&quot;:10}"></font-item>
      <font-item selectedvariant="" selectedsubset="" selectedtag="" font="{&quot;family&quot;:&quot;Adamina&quot;,&quot;slug&quot;:&quot;Adamina&quot;,&quot;id&quot;:&quot;adamina&quot;,&quot;variants&quot;:[&quot;regular&quot;],&quot;subsets&quot;:[&quot;latin&quot;],&quot;category&quot;:&quot;serif&quot;,&quot;tags&quot;:[&quot;compact&quot;,&quot;small sizes&quot;,&quot;transitional&quot;],&quot;lineNumber&quot;:11}"></font-item></div>
                  <div id="pagination"><pagination-buttons resultslength="1497" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });
});
