import "../components/font-item";

describe("FontItem", () => {
  test("renders correctly", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}'></font-item>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
    "<font-item selectedvariant="" selectedsubset="" font="{&quot;family&quot;:&quot;ABeeZee&quot;,&quot;slug&quot;:&quot;ABeeZee&quot;,&quot;id&quot;:&quot;abeezee&quot;,&quot;variants&quot;:[&quot;regular&quot;,&quot;italic&quot;],&quot;subsets&quot;:[&quot;latin&quot;,&quot;latin-ext&quot;],&quot;category&quot;:&quot;sans-serif&quot;,&quot;tags&quot;:[&quot;literacy&quot;,&quot;kids&quot;],&quot;lineNumber&quot;:2}"><div id="family-abeezee" class="family">
        <div class="family-link">
          <div id="family-name" class="family-title abeezee" style="font-family: 'ABeeZee';">
            ABeeZee
          </div>
          <div class="family-meta-container">
         <span class="family-title-small"></span>
          <div class="family-meta">
            <span>sans-serif</span>
            •
            <span aria-label="regular, italic">2 variants</span>
            •
            <span aria-label="latin, latin-ext">2 subsets</span>
          </div>
          </div>
        </div>
        <div class="family-tags">
          <div class="family-tags-container"><tag-button selectedtag="null" value="literacy">literacy</tag-button><tag-button selectedtag="null" value="kids">kids</tag-button></div>
          <div class="family-meta-links">
            <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L2" target="_blank" aria-label="Edit tags for ABeeZee">Edit tags</a>
            <a href="https://fonts.google.com/specimen/ABeeZee" target="_blank" aria-label="Visit ABeeZee on Google Fonts">Google Fonts →</a>
          </div>
        </div>
      </div></font-item>"
  `);
  });
});
