import "../components/font-item";

describe("FontItem", () => {
  test("renders correctly", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}'></font-item>`;
    const fontItem = document.querySelector("font-item").innerHTML;
    expect(fontItem).toMatchInlineSnapshot(`
      "<div id="family-alef" class="family">
          <div class="family-link">
            <div id="family-name" class="family-title alef" style="font-family: 'Alef';">
              Alef
            </div>
            <div class="family-meta-container">
           <span class="family-title-small"></span>
            <div class="family-meta">
              <span>sans-serif</span>
              •
              <span aria-label="regular, 700">2 variants</span>
              •
              <span aria-label="hebrew, latin">2 subsets</span>
            </div>
            </div>
          </div>
          <div class="family-tags">
            <div class="family-tags-container"><tag-button selectedtag="null" value="geometric">geometric</tag-button></div>
            <div class="family-meta-links">
              <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L23" target="_blank" aria-label="Edit tags for Alef">Edit tags</a>
              <a href="https://fonts.google.com/specimen/Alef" target="_blank" aria-label="Visit Alef on Google Fonts">Google Fonts →</a>
            </div>
          </div>
        </div>"
    `);
  });

  test("no latin subset", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"GFS Neohellenic","variants":["regular","italic","700","700italic"],"subsets":["greek"],"category":"sans-serif","tags":["round","monolinear","1930s"],"lineNumber":439}'></font-item>`;
    const fontItem = document.querySelector("font-item").innerHTML;
    expect(fontItem).toMatchInlineSnapshot(`
      "<div id="family-gfs-neohellenic" class="family">
          <div class="family-link">
            <div id="family-name" class="family-title gfs-neohellenic" style="font-family: 'GFS Neohellenic';">
              Γειά σου Κόσμε
            </div>
            <div class="family-meta-container">
           <span class="family-title-small">GFS Neohellenic</span>
            <div class="family-meta">
              <span>sans-serif</span>
              •
              <span aria-label="regular, italic, 700, 700italic">4 variants</span>
              •
              <span aria-label="greek">1 subsets</span>
            </div>
            </div>
          </div>
          <div class="family-tags">
            <div class="family-tags-container"><tag-button selectedtag="null" value="round">round</tag-button><tag-button selectedtag="null" value="monolinear">monolinear</tag-button><tag-button selectedtag="null" value="1930s">1930s</tag-button></div>
            <div class="family-meta-links">
              <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L439" target="_blank" aria-label="Edit tags for GFS Neohellenic">Edit tags</a>
              <a href="https://fonts.google.com/specimen/GFS+Neohellenic" target="_blank" aria-label="Visit GFS Neohellenic on Google Fonts">Google Fonts →</a>
            </div>
          </div>
        </div>"
    `);
  });

  test("rtl subset", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"Almarai","variants":["300","regular","700","800"],"subsets":["arabic"],"category":"sans-serif","tags":["arabic"],"lineNumber":41}'></font-item>`;
    const fontItem = document.querySelector("font-item").innerHTML;
    expect(fontItem).toMatchInlineSnapshot(`
      "<div id="family-almarai" class="family">
          <div class="family-link">
            <div id="family-name" class="family-title almarai" style="font-family: 'Almarai';direction: rtl;">
              مرحبا بالعالم
            </div>
            <div class="family-meta-container">
           <span class="family-title-small">Almarai</span>
            <div class="family-meta">
              <span>sans-serif</span>
              •
              <span aria-label="300, regular, 700, 800">4 variants</span>
              •
              <span aria-label="arabic">1 subsets</span>
            </div>
            </div>
          </div>
          <div class="family-tags">
            <div class="family-tags-container"><tag-button selectedtag="null" value="arabic">arabic</tag-button></div>
            <div class="family-meta-links">
              <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L41" target="_blank" aria-label="Edit tags for Almarai">Edit tags</a>
              <a href="https://fonts.google.com/specimen/Almarai" target="_blank" aria-label="Visit Almarai on Google Fonts">Google Fonts →</a>
            </div>
          </div>
        </div>"
    `);
  });

  test("selected variant, 900italic", () => {
    document.body.innerHTML = `<font-item selectedVariant="900italic" selectedSubset="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}'></font-item>`;
    const fontItem = document.querySelector("font-item").innerHTML;
    expect(fontItem).toMatchInlineSnapshot(`
      "<div id="family-anybody" class="family">
          <div class="family-link">
            <div id="family-name" class="family-title anybody" style="font-family: 'Anybody';font-style: italic;">
              Anybody
            </div>
            <div class="family-meta-container">
           <span class="family-title-small"></span>
            <div class="family-meta">
              <span>display</span>
              •
              <span aria-label="100, 200, 300, regular, 500, 600, 700, 800, 900, 100italic, 200italic, 300italic, italic, 500italic, 600italic, 700italic, 800italic, 900italic">18 variants</span>
              •
              <span aria-label="latin, latin-ext, vietnamese">3 subsets</span>
            </div>
            </div>
          </div>
          <div class="family-tags">
            <div class="family-tags-container"><tag-button selectedtag="null" value="eurostile">eurostile</tag-button></div>
            <div class="family-meta-links">
              <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L78" target="_blank" aria-label="Edit tags for Anybody">Edit tags</a>
              <a href="https://fonts.google.com/specimen/Anybody" target="_blank" aria-label="Visit Anybody on Google Fonts">Google Fonts →</a>
            </div>
          </div>
        </div>"
    `);
  });

  test("selected variant, 900", () => {
    document.body.innerHTML = `<font-item selectedVariant="900" selectedSubset="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}'></font-item>`;
    const fontItem = document.querySelector("font-item").innerHTML;
    expect(fontItem).toMatchInlineSnapshot(`
      "<div id="family-anybody" class="family">
          <div class="family-link">
            <div id="family-name" class="family-title anybody" style="font-family: 'Anybody';">
              Anybody
            </div>
            <div class="family-meta-container">
           <span class="family-title-small"></span>
            <div class="family-meta">
              <span>display</span>
              •
              <span aria-label="100, 200, 300, regular, 500, 600, 700, 800, 900, 100italic, 200italic, 300italic, italic, 500italic, 600italic, 700italic, 800italic, 900italic">18 variants</span>
              •
              <span aria-label="latin, latin-ext, vietnamese">3 subsets</span>
            </div>
            </div>
          </div>
          <div class="family-tags">
            <div class="family-tags-container"><tag-button selectedtag="null" value="eurostile">eurostile</tag-button></div>
            <div class="family-meta-links">
              <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L78" target="_blank" aria-label="Edit tags for Anybody">Edit tags</a>
              <a href="https://fonts.google.com/specimen/Anybody" target="_blank" aria-label="Visit Anybody on Google Fonts">Google Fonts →</a>
            </div>
          </div>
        </div>"
    `);
  });

  test("selected subset", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="hebrew" font='{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}'></font-item>`;
    const fontItem = document.querySelector("font-item").innerHTML;
    expect(fontItem).toMatchInlineSnapshot(`
      "<div id="family-alef" class="family">
          <div class="family-link">
            <div id="family-name" class="family-title alef" style="font-family: 'Alef';direction: rtl;">
              שָׁלוֹם עוֹלָם 
            </div>
            <div class="family-meta-container">
           <span class="family-title-small">Alef</span>
            <div class="family-meta">
              <span>sans-serif</span>
              •
              <span aria-label="regular, 700">2 variants</span>
              •
              <span aria-label="hebrew, latin">2 subsets</span>
            </div>
            </div>
          </div>
          <div class="family-tags">
            <div class="family-tags-container"><tag-button selectedtag="null" value="geometric">geometric</tag-button></div>
            <div class="family-meta-links">
              <a href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L23" target="_blank" aria-label="Edit tags for Alef">Edit tags</a>
              <a href="https://fonts.google.com/specimen/Alef" target="_blank" aria-label="Visit Alef on Google Fonts">Google Fonts →</a>
            </div>
          </div>
        </div>"
    `);
  });

  test("has family name that exists in swaps.json", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"Material Symbols Sharp","variants":["100","200","300","regular","500","600","700"],"subsets":["latin"],"category":"monospace","tags":[],"lineNumber":752}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchInlineSnapshot(`
      <font-item
        font="{"family":"Material Symbols Sharp","variants":["100","200","300","regular","500","600","700"],"subsets":["latin"],"category":"monospace","tags":[],"lineNumber":752}"
        id="material-symbols-sharp"
        selectedsubset=""
        selectedvariant=""
      >
        <div
          class="family"
          id="family-material-symbols-sharp"
        >
          
          
          <div
            class="family-link"
          >
            
            
            <div
              class="family-title material-symbols-sharp"
              id="family-name"
              style="font-family: 'Material Symbols Sharp';"
            >
              
              favorite add delete settings search
            
            </div>
            
            
            <div
              class="family-meta-container"
            >
              
           
              <span
                class="family-title-small"
              >
                Material Symbols Sharp
              </span>
              
            
              <div
                class="family-meta"
              >
                
              
                <span>
                  monospace
                </span>
                
              •
              
                <span
                  aria-label="100, 200, 300, regular, 500, 600, 700"
                >
                  7 variants
                </span>
                
              •
              
                <span
                  aria-label="latin"
                >
                  1 subsets
                </span>
                
            
              </div>
              
            
            </div>
            
          
          </div>
          
          
          <div
            class="family-tags"
          >
            
            
            <div
              class="family-tags-container"
            />
            
            
            <div
              class="family-meta-links"
            >
              
              
              <a
                aria-label="Edit tags for Material Symbols Sharp"
                href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L752"
                target="_blank"
              >
                Edit tags
              </a>
              
              
              <a
                aria-label="Visit Material Symbols Sharp on Google Fonts"
                href="https://fonts.google.com/specimen/Material+Symbols+Sharp"
                target="_blank"
              >
                Google Fonts →
              </a>
              
            
            </div>
            
          
          </div>
          
        
        </div>
      </font-item>
    `);
  });
});
