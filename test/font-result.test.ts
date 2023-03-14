import "../components/font-results";
import userEvent from "@testing-library/user-event";

const search = "";

const location = {
  ...window.location,
  search: search,
};
Object.defineProperty(window, "location", {
  writable: true,
  value: location,
});

describe("FontResults", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  document.body.innerHTML = `<aside class="sidebar">
        <section class="tags sidebar-group">
          <h2>Tags</h2>
          <div id="tags" class="tags-container"><label class="family-tag"
              >1700s
              <input type="radio" name="tag" value="1700s" class="hide"
            /></label><label class="family-tag"
              >1900s
              <input type="radio" name="tag" value="1900s" class="hide"
            /></label><label class="family-tag"
              >1920s
              <input type="radio" name="tag" value="1920s" class="hide"
            /></label><label class="family-tag"
              >1930s
              <input type="radio" name="tag" value="1930s" class="hide"
            /></label><label class="family-tag"
              >1940s
              <input type="radio" name="tag" value="1940s" class="hide"
            /></label><label class="family-tag"
              >1950s
              <input type="radio" name="tag" value="1950s" class="hide"
            /></label><label class="family-tag"
              >1960s
              <input type="radio" name="tag" value="1960s" class="hide"
            /></label><label class="family-tag"
              >1970s
              <input type="radio" name="tag" value="1970s" class="hide"
            /></label><label class="family-tag"
              >1980s
              <input type="radio" name="tag" value="1980s" class="hide"
            /></label><label class="family-tag"
              >ancient
              <input type="radio" name="tag" value="ancient" class="hide"
            /></label><label class="family-tag"
              >antiqua
              <input type="radio" name="tag" value="antiqua" class="hide"
            /></label><label class="family-tag"
              >arabic
              <input type="radio" name="tag" value="arabic" class="hide"
            /></label><label class="family-tag"
              >art deco
              <input type="radio" name="tag" value="art deco" class="hide"
            /></label><label class="family-tag"
              >art nouveau
              <input type="radio" name="tag" value="art nouveau" class="hide"
            /></label><label class="family-tag"
              >bamboo
              <input type="radio" name="tag" value="bamboo" class="hide"
            /></label><label class="family-tag"
              >barcode
              <input type="radio" name="tag" value="barcode" class="hide"
            /></label><label class="family-tag"
              >blackletter
              <input type="radio" name="tag" value="blackletter" class="hide"
            /></label><label class="family-tag"
              >block
              <input type="radio" name="tag" value="block" class="hide"
            /></label><label class="family-tag"
              >brush
              <input type="radio" name="tag" value="brush" class="hide"
            /></label><label class="family-tag"
              >bubbly
              <input type="radio" name="tag" value="bubbly" class="hide"
            /></label><label class="family-tag"
              >calligraphic
              <input type="radio" name="tag" value="calligraphic" class="hide"
            /></label><label class="family-tag"
              >cambodian
              <input type="radio" name="tag" value="cambodian" class="hide"
            /></label><label class="family-tag"
              >caps
              <input type="radio" name="tag" value="caps" class="hide"
            /></label><label class="family-tag"
              >cartoon
              <input type="radio" name="tag" value="cartoon" class="hide"
            /></label><label class="family-tag"
              >celtic
              <input type="radio" name="tag" value="celtic" class="hide"
            /></label><label class="family-tag"
              >classic
              <input type="radio" name="tag" value="classic" class="hide"
            /></label><label class="family-tag"
              >code
              <input type="radio" name="tag" value="code" class="hide"
            /></label><label class="family-tag"
              >collegiate
              <input type="radio" name="tag" value="collegiate" class="hide"
            /></label><label class="family-tag"
              >color
              <input type="radio" name="tag" value="color" class="hide"
            /></label><label class="family-tag"
              >comic
              <input type="radio" name="tag" value="comic" class="hide"
            /></label><label class="family-tag"
              >compact
              <input type="radio" name="tag" value="compact" class="hide"
            /></label><label class="family-tag"
              >condensed
              <input type="radio" name="tag" value="condensed" class="hide"
            /></label><label class="family-tag"
              >connected
              <input type="radio" name="tag" value="connected" class="hide"
            /></label><label class="family-tag"
              >copperplate
              <input type="radio" name="tag" value="copperplate" class="hide"
            /></label><label class="family-tag"
              >curls
              <input type="radio" name="tag" value="curls" class="hide"
            /></label><label class="family-tag"
              >cursive
              <input type="radio" name="tag" value="cursive" class="hide"
            /></label><label class="family-tag"
              >cute
              <input type="radio" name="tag" value="cute" class="hide"
            /></label><label class="family-tag"
              >decal
              <input type="radio" name="tag" value="decal" class="hide"
            /></label><label class="family-tag"
              >decorative
              <input type="radio" name="tag" value="decorative" class="hide"
            /></label><label class="family-tag"
              >diagonal
              <input type="radio" name="tag" value="diagonal" class="hide"
            /></label><label class="family-tag"
              >didone
              <input type="radio" name="tag" value="didone" class="hide"
            /></label><label class="family-tag"
              >disco
              <input type="radio" name="tag" value="disco" class="hide"
            /></label><label class="family-tag"
              >dotted
              <input type="radio" name="tag" value="dotted" class="hide"
            /></label><label class="family-tag"
              >editorial
              <input type="radio" name="tag" value="editorial" class="hide"
            /></label><label class="family-tag"
              >egyptian
              <input type="radio" name="tag" value="egyptian" class="hide"
            /></label><label class="family-tag"
              >elegant
              <input type="radio" name="tag" value="elegant" class="hide"
            /></label><label class="family-tag"
              >engraved
              <input type="radio" name="tag" value="engraved" class="hide"
            /></label><label class="family-tag"
              >eurostile
              <input type="radio" name="tag" value="eurostile" class="hide"
            /></label><label class="family-tag"
              >expanded
              <input type="radio" name="tag" value="expanded" class="hide"
            /></label><label class="family-tag"
              >fat
              <input type="radio" name="tag" value="fat" class="hide"
            /></label><label class="family-tag"
              >fat face
              <input type="radio" name="tag" value="fat face" class="hide"
            /></label><label class="family-tag"
              >flared
              <input type="radio" name="tag" value="flared" class="hide"
            /></label><label class="family-tag"
              >formal
              <input type="radio" name="tag" value="formal" class="hide"
            /></label><label class="family-tag"
              >fraktur
              <input type="radio" name="tag" value="fraktur" class="hide"
            /></label><label class="family-tag"
              >friendly
              <input type="radio" name="tag" value="friendly" class="hide"
            /></label><label class="family-tag"
              >fun
              <input type="radio" name="tag" value="fun" class="hide"
            /></label><label class="family-tag"
              >funky
              <input type="radio" name="tag" value="funky" class="hide"
            /></label><label class="family-tag"
              >futuristic
              <input type="radio" name="tag" value="futuristic" class="hide"
            /></label><label class="family-tag"
              >fuzzy
              <input type="radio" name="tag" value="fuzzy" class="hide"
            /></label><label class="family-tag"
              >game
              <input type="radio" name="tag" value="game" class="hide"
            /></label><label class="family-tag"
              >geometric
              <input type="radio" name="tag" value="geometric" class="hide"
            /></label><label class="family-tag"
              >german
              <input type="radio" name="tag" value="german" class="hide"
            /></label><label class="family-tag"
              >gothic
              <input type="radio" name="tag" value="gothic" class="hide"
            /></label><label class="family-tag"
              >gradient
              <input type="radio" name="tag" value="gradient" class="hide"
            /></label><label class="family-tag"
              >graffiti
              <input type="radio" name="tag" value="graffiti" class="hide"
            /></label><label class="family-tag"
              >groovy
              <input type="radio" name="tag" value="groovy" class="hide"
            /></label><label class="family-tag"
              >grotesque
              <input type="radio" name="tag" value="grotesque" class="hide"
            /></label><label class="family-tag"
              >grunge
              <input type="radio" name="tag" value="grunge" class="hide"
            /></label><label class="family-tag"
              >halloween
              <input type="radio" name="tag" value="halloween" class="hide"
            /></label><label class="family-tag"
              >handwritten
              <input type="radio" name="tag" value="handwritten" class="hide"
            /></label><label class="family-tag"
              >headline
              <input type="radio" name="tag" value="headline" class="hide"
            /></label><label class="family-tag"
              >headlines
              <input type="radio" name="tag" value="headlines" class="hide"
            /></label><label class="family-tag"
              >heavy
              <input type="radio" name="tag" value="heavy" class="hide"
            /></label><label class="family-tag"
              >hebrew
              <input type="radio" name="tag" value="hebrew" class="hide"
            /></label><label class="family-tag"
              >high contrast
              <input type="radio" name="tag" value="high contrast" class="hide"
            /></label><label class="family-tag"
              >hinted
              <input type="radio" name="tag" value="hinted" class="hide"
            /></label><label class="family-tag"
              >humanist
              <input type="radio" name="tag" value="humanist" class="hide"
            /></label><label class="family-tag"
              >isometric
              <input type="radio" name="tag" value="isometric" class="hide"
            /></label><label class="family-tag"
              >khmer
              <input type="radio" name="tag" value="khmer" class="hide"
            /></label><label class="family-tag"
              >kids
              <input type="radio" name="tag" value="kids" class="hide"
            /></label><label class="family-tag"
              >korean
              <input type="radio" name="tag" value="korean" class="hide"
            /></label><label class="family-tag"
              >large sizes
              <input type="radio" name="tag" value="large sizes" class="hide"
            /></label><label class="family-tag"
              >legibility
              <input type="radio" name="tag" value="legibility" class="hide"
            /></label><label class="family-tag"
              >light
              <input type="radio" name="tag" value="light" class="hide"
            /></label><label class="family-tag"
              >lines
              <input type="radio" name="tag" value="lines" class="hide"
            /></label><label class="family-tag"
              >literacy
              <input type="radio" name="tag" value="literacy" class="hide"
            /></label><label class="family-tag"
              >literature
              <input type="radio" name="tag" value="literature" class="hide"
            /></label><label class="family-tag"
              >looped
              <input type="radio" name="tag" value="looped" class="hide"
            /></label><label class="family-tag"
              >loopless
              <input type="radio" name="tag" value="loopless" class="hide"
            /></label><label class="family-tag"
              >love
              <input type="radio" name="tag" value="love" class="hide"
            /></label><label class="family-tag"
              >low contrast
              <input type="radio" name="tag" value="low contrast" class="hide"
            /></label><label class="family-tag"
              >marker
              <input type="radio" name="tag" value="marker" class="hide"
            /></label><label class="family-tag"
              >modern
              <input type="radio" name="tag" value="modern" class="hide"
            /></label><label class="family-tag"
              >monolinear
              <input type="radio" name="tag" value="monolinear" class="hide"
            /></label><label class="family-tag"
              >narrow
              <input type="radio" name="tag" value="narrow" class="hide"
            /></label><label class="family-tag"
              >neoclassical
              <input type="radio" name="tag" value="neoclassical" class="hide"
            /></label><label class="family-tag"
              >old style
              <input type="radio" name="tag" value="old style" class="hide"
            /></label><label class="family-tag"
              >outline
              <input type="radio" name="tag" value="outline" class="hide"
            /></label><label class="family-tag"
              >paris
              <input type="radio" name="tag" value="paris" class="hide"
            /></label><label class="family-tag"
              >penant
              <input type="radio" name="tag" value="penant" class="hide"
            /></label><label class="family-tag"
              >pixel
              <input type="radio" name="tag" value="pixel" class="hide"
            /></label><label class="family-tag"
              >playful
              <input type="radio" name="tag" value="playful" class="hide"
            /></label><label class="family-tag"
              >pulp
              <input type="radio" name="tag" value="pulp" class="hide"
            /></label><label class="family-tag"
              >retro
              <input type="radio" name="tag" value="retro" class="hide"
            /></label><label class="family-tag"
              >rock
              <input type="radio" name="tag" value="rock" class="hide"
            /></label><label class="family-tag"
              >roman
              <input type="radio" name="tag" value="roman" class="hide"
            /></label><label class="family-tag"
              >romantic
              <input type="radio" name="tag" value="romantic" class="hide"
            /></label><label class="family-tag"
              >round
              <input type="radio" name="tag" value="round" class="hide"
            /></label><label class="family-tag"
              >salsa
              <input type="radio" name="tag" value="salsa" class="hide"
            /></label><label class="family-tag"
              >scrawl
              <input type="radio" name="tag" value="scrawl" class="hide"
            /></label><label class="family-tag"
              >script
              <input type="radio" name="tag" value="script" class="hide"
            /></label><label class="family-tag"
              >shadow
              <input type="radio" name="tag" value="shadow" class="hide"
            /></label><label class="family-tag"
              >signage
              <input type="radio" name="tag" value="signage" class="hide"
            /></label><label class="family-tag"
              >sketch
              <input type="radio" name="tag" value="sketch" class="hide"
            /></label><label class="family-tag"
              >slab
              <input type="radio" name="tag" value="slab" class="hide"
            /></label><label class="family-tag"
              >slanted
              <input type="radio" name="tag" value="slanted" class="hide"
            /></label><label class="family-tag"
              >small caps
              <input type="radio" name="tag" value="small caps" class="hide"
            /></label><label class="family-tag"
              >small sizes
              <input type="radio" name="tag" value="small sizes" class="hide"
            /></label><label class="family-tag"
              >speed
              <input type="radio" name="tag" value="speed" class="hide"
            /></label><label class="family-tag"
              >spicy
              <input type="radio" name="tag" value="spicy" class="hide"
            /></label><label class="family-tag"
              >square
              <input type="radio" name="tag" value="square" class="hide"
            /></label><label class="family-tag"
              >stencil
              <input type="radio" name="tag" value="stencil" class="hide"
            /></label><label class="family-tag"
              >stone
              <input type="radio" name="tag" value="stone" class="hide"
            /></label><label class="family-tag"
              >surf
              <input type="radio" name="tag" value="surf" class="hide"
            /></label><label class="family-tag"
              >swash
              <input type="radio" name="tag" value="swash" class="hide"
            /></label><label class="family-tag"
              >swirl
              <input type="radio" name="tag" value="swirl" class="hide"
            /></label><label class="family-tag"
              >tall
              <input type="radio" name="tag" value="tall" class="hide"
            /></label><label class="family-tag"
              >tapered
              <input type="radio" name="tag" value="tapered" class="hide"
            /></label><label class="family-tag"
              >tattoo
              <input type="radio" name="tag" value="tattoo" class="hide"
            /></label><label class="family-tag"
              >techno
              <input type="radio" name="tag" value="techno" class="hide"
            /></label><label class="family-tag"
              >thin
              <input type="radio" name="tag" value="thin" class="hide"
            /></label><label class="family-tag"
              >transitional
              <input type="radio" name="tag" value="transitional" class="hide"
            /></label><label class="family-tag"
              >typewriter
              <input type="radio" name="tag" value="typewriter" class="hide"
            /></label><label class="family-tag"
              >uneven
              <input type="radio" name="tag" value="uneven" class="hide"
            /></label><label class="family-tag"
              >unicase
              <input type="radio" name="tag" value="unicase" class="hide"
            /></label><label class="family-tag"
              >urban
              <input type="radio" name="tag" value="urban" class="hide"
            /></label><label class="family-tag"
              >vintage
              <input type="radio" name="tag" value="vintage" class="hide"
            /></label><label class="family-tag"
              >western
              <input type="radio" name="tag" value="western" class="hide"
            /></label><label class="family-tag"
              >whimsical
              <input type="radio" name="tag" value="whimsical" class="hide"
            /></label><label class="family-tag"
              >wide
              <input type="radio" name="tag" value="wide" class="hide"
            /></label><label class="family-tag"
              >wireframe
              <input type="radio" name="tag" value="wireframe" class="hide"
            /></label></div>
        </section>
        <div class="sidebar-group">
          <h3>Want to help the project?</h3>
          <p>
            Sort by fonts that
            <label class="family-tag"
              >need tags
              <input
                type="radio"
                name="tag"
                value="need tags"
                class="hide" /></label
            >. Learn <a href="https://github.com/katydecorah/font-library/blob/gh-pages/CONTRIBUTING.md">how to contribute</a>.
          </p>
        </div>
      </aside><main class="content" id="content">
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
                <option id="display" value="display">display</option>
              </select>
            </div><div class="select-group">
              <label for="select-subsets">subsets</label>
              <select id="select-subsets">
                <option value="">All subsets</option>
                <option id="arabic" value="arabic">arabic</option>
               </select>
            </div><div class="select-group">
              <label for="select-variants">variants</label>
              <select id="select-variants">
                <option value="">All variants</option>
                <option id="300italic" value="300italic">300italic</option>
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
  test("renders correctly", () => {
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

  test("fires a custom event when a font is selected", () => {
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "cute" },
      })
    );

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="15"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Are You Serious","slug":"Are+You+Serious","id":"are-you-serious","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["whimsical","curls","cute","kids","swirl"],"lineNumber":86}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Bellota","slug":"Bellota","id":"bellota","variants":["300","300italic","regular","italic","700","700italic"],"subsets":["cyrillic","latin","latin-ext","vietnamese"],"category":"display","tags":["whimsical","large sizes","cute","decorative"],"lineNumber":161}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Bonbon","slug":"Bonbon","id":"bonbon","variants":["regular"],"subsets":["latin"],"category":"handwriting","tags":["cute","decorative","headlines"],"lineNumber":197}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Butterfly Kids","slug":"Butterfly+Kids","id":"butterfly-kids","variants":["regular"],"subsets":["latin","latin-ext"],"category":"handwriting","tags":["kids","cute"],"lineNumber":216}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Delius Swash Caps","slug":"Delius+Swash+Caps","id":"delius-swash-caps","variants":["regular"],"subsets":["latin"],"category":"handwriting","tags":["cute","swash","round"],"lineNumber":329}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Emilys Candy","slug":"Emilys+Candy","id":"emilys-candy","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["cute","love"],"lineNumber":367}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Fuzzy Bubbles","slug":"Fuzzy+Bubbles","id":"fuzzy-bubbles","variants":["regular","700"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["cute","kids","playful","handwritten"],"lineNumber":437}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Gorditas","slug":"Gorditas","id":"gorditas","variants":["regular","700"],"subsets":["latin"],"category":"display","tags":["love","cute"],"lineNumber":476}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Hi Melody","slug":"Hi+Melody","id":"hi-melody","variants":["regular"],"subsets":["korean","latin"],"category":"handwriting","tags":["cute","korean"],"lineNumber":517}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Ingrid Darling","slug":"Ingrid+Darling","id":"ingrid-darling","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["cursive","cute","playful","swirl","whimsical"],"lineNumber":559}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="15"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("fires a next-page custom event", () => {
    fontResults.dispatchEvent(new CustomEvent("next-page"));

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="15"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Lily Script One","slug":"Lily+Script+One","id":"lily-script-one","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["cute","script"],"lineNumber":687}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Princess Sofia","slug":"Princess+Sofia","id":"princess-sofia","variants":["regular"],"subsets":["latin","latin-ext"],"category":"handwriting","tags":["cute","calligraphic"],"lineNumber":1141}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Send Flowers","slug":"Send+Flowers","id":"send-flowers","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["cursive","playful","cute"],"lineNumber":1276}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Sevillana","slug":"Sevillana","id":"sevillana","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["swirl","large sizes","cute"],"lineNumber":1277}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Twinkle Star","slug":"Twinkle+Star","id":"twinkle-star","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["cute","kids","playful","swirl"],"lineNumber":1419}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="2"
            pagesize="10"
            resultslength="15"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("fires a prev-page custom event", () => {
    fontResults.dispatchEvent(new CustomEvent("previous-page"));

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="15"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Are You Serious","slug":"Are+You+Serious","id":"are-you-serious","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["whimsical","curls","cute","kids","swirl"],"lineNumber":86}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Bellota","slug":"Bellota","id":"bellota","variants":["300","300italic","regular","italic","700","700italic"],"subsets":["cyrillic","latin","latin-ext","vietnamese"],"category":"display","tags":["whimsical","large sizes","cute","decorative"],"lineNumber":161}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Bonbon","slug":"Bonbon","id":"bonbon","variants":["regular"],"subsets":["latin"],"category":"handwriting","tags":["cute","decorative","headlines"],"lineNumber":197}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Butterfly Kids","slug":"Butterfly+Kids","id":"butterfly-kids","variants":["regular"],"subsets":["latin","latin-ext"],"category":"handwriting","tags":["kids","cute"],"lineNumber":216}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Delius Swash Caps","slug":"Delius+Swash+Caps","id":"delius-swash-caps","variants":["regular"],"subsets":["latin"],"category":"handwriting","tags":["cute","swash","round"],"lineNumber":329}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Emilys Candy","slug":"Emilys+Candy","id":"emilys-candy","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["cute","love"],"lineNumber":367}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Fuzzy Bubbles","slug":"Fuzzy+Bubbles","id":"fuzzy-bubbles","variants":["regular","700"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["cute","kids","playful","handwritten"],"lineNumber":437}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Gorditas","slug":"Gorditas","id":"gorditas","variants":["regular","700"],"subsets":["latin"],"category":"display","tags":["love","cute"],"lineNumber":476}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Hi Melody","slug":"Hi+Melody","id":"hi-melody","variants":["regular"],"subsets":["korean","latin"],"category":"handwriting","tags":["cute","korean"],"lineNumber":517}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Ingrid Darling","slug":"Ingrid+Darling","id":"ingrid-darling","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"handwriting","tags":["cursive","cute","playful","swirl","whimsical"],"lineNumber":559}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="15"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("filters fonts when a variant is selected", async () => {
    const selectVariant: HTMLSelectElement =
      document.querySelector("#select-variants");
    // mock addEventListener change event for selectVariant
    await userEvent.selectOptions(selectVariant, "300italic");

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="cute"
            selectedvariant="300italic"
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Bellota","slug":"Bellota","id":"bellota","variants":["300","300italic","regular","italic","700","700italic"],"subsets":["cyrillic","latin","latin-ext","vietnamese"],"category":"display","tags":["whimsical","large sizes","cute","decorative"],"lineNumber":161}"
            selectedsubset=""
            selectedtag="cute"
            selectedvariant="300italic"
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("filters fonts when a subset is selected", async () => {
    const selectedSubset: HTMLSelectElement =
      document.querySelector("#select-subsets");
    await userEvent.selectOptions(selectedSubset, "arabic");

    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="0" selectedcategory="" selectedtag="cute" selectedsubset="arabic" selectedvariant="300italic" search=""></search-status></div>
                  <div id="families" class="families"></div>
                  <div id="pagination"><pagination-buttons resultslength="0" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });

  test("filters fonts when a category is selected", async () => {
    const selectedCategory: HTMLSelectElement =
      document.querySelector("#select-categories");
    await userEvent.selectOptions(selectedCategory, "display");

    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="0" selectedcategory="display" selectedtag="cute" selectedsubset="arabic" selectedvariant="300italic" search=""></search-status></div>
                  <div id="families" class="families"></div>
                  <div id="pagination"><pagination-buttons resultslength="0" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });

  test("selects need tags tag", () => {
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "need tags" },
      })
    );

    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="0" selectedcategory="display" selectedtag="need tags" selectedsubset="arabic" selectedvariant="300italic" search=""></search-status></div>
                  <div id="families" class="families"></div>
                  <div id="pagination"><pagination-buttons resultslength="0" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });

  test("remove tag", () => {
    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "tag" },
      })
    );

    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="0" selectedcategory="display" selectedtag="" selectedsubset="arabic" selectedvariant="300italic" search=""></search-status></div>
                  <div id="families" class="families"></div>
                  <div id="pagination"><pagination-buttons resultslength="0" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });

  test("filters fonts when search", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "are you serious");

    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="0" selectedcategory="display" selectedtag="" selectedsubset="arabic" selectedvariant="300italic" search="are you serious"></search-status></div>
                  <div id="families" class="families"></div>
                  <div id="pagination"><pagination-buttons resultslength="0" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });

  test("remove search filter", () => {
    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "search" },
      })
    );

    expect(fontResults.innerHTML).toMatchInlineSnapshot(`
      "
                  <div id="search-status"><search-status class="search-status" resultslength="0" selectedcategory="display" selectedtag="" selectedsubset="arabic" selectedvariant="300italic" search=""></search-status></div>
                  <div id="families" class="families"></div>
                  <div id="pagination"><pagination-buttons resultslength="0" pagesize="10" currentpage="1"></pagination-buttons></div>
                "
    `);
  });

  test("remove all filters", () => {
    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: undefined },
      })
    );

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
