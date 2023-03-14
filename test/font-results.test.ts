import "../components/font-results";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "fs";

// get _site/index.html
const html = readFileSync("./_site/index.html", "utf8");
// extract body from html
const body = html.match(/<body>(.*)<\/body>/s)[1];

describe("FontResults", () => {
  let fontResults: HTMLElement;
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    document.body.innerHTML = body;
    fontResults = document.querySelector("font-results");
  });

  afterEach(() => {
    const location = {
      ...window.location,
      search: "",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });
  });

  test("renders correctly", () => {
    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abel","slug":"Abel","id":"abel","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["condensed"],"lineNumber":3}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aclonica","slug":"Aclonica","id":"aclonica","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["modern","friendly"],"lineNumber":8}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Acme","slug":"Acme","id":"acme","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["cartoon","comic","groovy","headlines"],"lineNumber":9}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Actor","slug":"Actor","id":"actor","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["thin","legibility"],"lineNumber":10}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Adamina","slug":"Adamina","id":"adamina","variants":["regular"],"subsets":["latin"],"category":"serif","tags":["compact","small sizes","transitional"],"lineNumber":11}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1497"
          />
        </div>
        
                
      </font-results>
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
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Advent Pro","slug":"Advent+Pro","id":"advent-pro","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["cyrillic","cyrillic-ext","greek","latin","latin-ext"],"category":"sans-serif","tags":["modern"],"lineNumber":12}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aguafina Script","slug":"Aguafina+Script","id":"aguafina-script","variants":["regular"],"subsets":["latin","latin-ext"],"category":"handwriting","tags":["cursive","elegant","script"],"lineNumber":13}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akaya Kanadaka","slug":"Akaya+Kanadaka","id":"akaya-kanadaka","variants":["regular"],"subsets":["kannada","latin","latin-ext"],"category":"display","tags":[],"lineNumber":14}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akaya Telivigala","slug":"Akaya+Telivigala","id":"akaya-telivigala","variants":["regular"],"subsets":["latin","latin-ext","telugu"],"category":"display","tags":[],"lineNumber":15}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akronim","slug":"Akronim","id":"akronim","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["brush","lines"],"lineNumber":16}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akshar","slug":"Akshar","id":"akshar","variants":["300","regular","500","600","700"],"subsets":["devanagari","latin","latin-ext"],"category":"sans-serif","tags":["condensed","narrow"],"lineNumber":17}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aladin","slug":"Aladin","id":"aladin","variants":["regular"],"subsets":["latin","latin-ext"],"category":"handwriting","tags":["art deco"],"lineNumber":18}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alata","slug":"Alata","id":"alata","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["geometric"],"lineNumber":19}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alatsi","slug":"Alatsi","id":"alatsi","variants":["regular"],"subsets":["cyrillic-ext","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["modern","condensed","geometric"],"lineNumber":20}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Albert Sans","slug":"Albert+Sans","id":"albert-sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":[],"lineNumber":21}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="2"
            pagesize="10"
            resultslength="1497"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("fires a prev-page custom event", () => {
    fontResults.dispatchEvent(new CustomEvent("next-page"));
    fontResults.dispatchEvent(new CustomEvent("previous-page"));

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abel","slug":"Abel","id":"abel","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["condensed"],"lineNumber":3}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aclonica","slug":"Aclonica","id":"aclonica","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["modern","friendly"],"lineNumber":8}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Acme","slug":"Acme","id":"acme","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["cartoon","comic","groovy","headlines"],"lineNumber":9}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Actor","slug":"Actor","id":"actor","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["thin","legibility"],"lineNumber":10}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Adamina","slug":"Adamina","id":"adamina","variants":["regular"],"subsets":["latin"],"category":"serif","tags":["compact","small sizes","transitional"],"lineNumber":11}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1497"
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
            resultslength="136"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Advent Pro","slug":"Advent+Pro","id":"advent-pro","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["cyrillic","cyrillic-ext","greek","latin","latin-ext"],"category":"sans-serif","tags":["modern"],"lineNumber":12}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Albert Sans","slug":"Albert+Sans","id":"albert-sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":[],"lineNumber":21}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Alegreya Sans","slug":"Alegreya+Sans","id":"alegreya-sans","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"],"subsets":["cyrillic","cyrillic-ext","greek","greek-ext","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["humanist","literature"],"lineNumber":26}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Alegreya Sans SC","slug":"Alegreya+Sans+SC","id":"alegreya-sans-sc","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"],"subsets":["cyrillic","cyrillic-ext","greek","greek-ext","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["small caps","literature"],"lineNumber":27}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Aleo","slug":"Aleo","id":"aleo","variants":["300","300italic","regular","italic","700","700italic"],"subsets":["latin","latin-ext"],"category":"serif","tags":[],"lineNumber":28}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Alumni Sans","slug":"Alumni+Sans","id":"alumni-sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["cyrillic","cyrillic-ext","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["narrow","condensed","light","thin"],"lineNumber":45}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Anybody","slug":"Anybody","id":"anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Archivo","slug":"Archivo","id":"archivo","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"sans-serif","tags":[],"lineNumber":83}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Asap","slug":"Asap","id":"asap","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["round"],"lineNumber":98}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
          

          <font-item
            font="{"family":"Asap Condensed","slug":"Asap+Condensed","id":"asap-condensed","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["condensed"],"lineNumber":99}"
            selectedsubset=""
            selectedtag=""
            selectedvariant="300italic"
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="136"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("filters fonts when a subset is selected", async () => {
    const selectedSubset: HTMLSelectElement =
      document.querySelector("#select-subsets");
    await userEvent.selectOptions(selectedSubset, "arabic");

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="42"
            search=""
            selectedcategory=""
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Alexandria","slug":"Alexandria","id":"alexandria","variants":["100","200","300","regular","500","600","700","800","900"],"subsets":["arabic","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":[],"lineNumber":30}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alkalami","slug":"Alkalami","id":"alkalami","variants":["regular"],"subsets":["arabic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":35}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Almarai","slug":"Almarai","id":"almarai","variants":["300","regular","700","800"],"subsets":["arabic"],"category":"sans-serif","tags":["arabic"],"lineNumber":41}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Amiri","slug":"Amiri","id":"amiri","variants":["regular","italic","700","700italic"],"subsets":["arabic","latin","latin-ext"],"category":"serif","tags":["1900s","elegant"],"lineNumber":54}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Amiri Quran","slug":"Amiri+Quran","id":"amiri-quran","variants":["regular"],"subsets":["arabic","latin"],"category":"serif","tags":[],"lineNumber":55}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aref Ruqaa","slug":"Aref+Ruqaa","id":"aref-ruqaa","variants":["regular","700"],"subsets":["arabic","latin","latin-ext"],"category":"serif","tags":["calligraphic"],"lineNumber":87}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aref Ruqaa Ink","slug":"Aref+Ruqaa+Ink","id":"aref-ruqaa-ink","variants":["regular","700"],"subsets":["arabic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":88}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Baloo Bhaijaan 2","slug":"Baloo+Bhaijaan+2","id":"baloo-bhaijaan-2","variants":["regular","500","600","700","800"],"subsets":["arabic","latin","latin-ext","vietnamese"],"category":"display","tags":[],"lineNumber":134}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Blaka","slug":"Blaka","id":"blaka","variants":["regular"],"subsets":["arabic","latin","latin-ext"],"category":"display","tags":["gothic","arabic"],"lineNumber":190}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Blaka Hollow","slug":"Blaka+Hollow","id":"blaka-hollow","variants":["regular"],"subsets":["arabic","latin","latin-ext"],"category":"display","tags":["gothic","arabic","outline"],"lineNumber":191}"
            selectedsubset="arabic"
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="42"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("filters fonts when a category is selected", async () => {
    const selectedCategory: HTMLSelectElement =
      document.querySelector("#select-categories");
    await userEvent.selectOptions(selectedCategory, "display");

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="391"
            search=""
            selectedcategory="display"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akaya Kanadaka","slug":"Akaya+Kanadaka","id":"akaya-kanadaka","variants":["regular"],"subsets":["kannada","latin","latin-ext"],"category":"display","tags":[],"lineNumber":14}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akaya Telivigala","slug":"Akaya+Telivigala","id":"akaya-telivigala","variants":["regular"],"subsets":["latin","latin-ext","telugu"],"category":"display","tags":[],"lineNumber":15}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akronim","slug":"Akronim","id":"akronim","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["brush","lines"],"lineNumber":16}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alfa Slab One","slug":"Alfa+Slab+One","id":"alfa-slab-one","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["slab","heavy","egyptian"],"lineNumber":31}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Allan","slug":"Allan","id":"allan","variants":["regular","700"],"subsets":["latin","latin-ext"],"category":"display","tags":["slanted"],"lineNumber":36}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Almendra Display","slug":"Almendra+Display","id":"almendra-display","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["whimsical","literature"],"lineNumber":43}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alumni Sans Inline One","slug":"Alumni+Sans+Inline+One","id":"alumni-sans-inline-one","variants":["regular","italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["block","heavy"],"lineNumber":47}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Amarante","slug":"Amarante","id":"amarante","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["art nouveau"],"lineNumber":49}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="391"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("selects need tags tag", () => {
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "need tags" },
      })
    );

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="523"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akaya Kanadaka","slug":"Akaya+Kanadaka","id":"akaya-kanadaka","variants":["regular"],"subsets":["kannada","latin","latin-ext"],"category":"display","tags":[],"lineNumber":14}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Akaya Telivigala","slug":"Akaya+Telivigala","id":"akaya-telivigala","variants":["regular"],"subsets":["latin","latin-ext","telugu"],"category":"display","tags":[],"lineNumber":15}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Albert Sans","slug":"Albert+Sans","id":"albert-sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":[],"lineNumber":21}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aleo","slug":"Aleo","id":"aleo","variants":["300","300italic","regular","italic","700","700italic"],"subsets":["latin","latin-ext"],"category":"serif","tags":[],"lineNumber":28}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alexandria","slug":"Alexandria","id":"alexandria","variants":["100","200","300","regular","500","600","700","800","900"],"subsets":["arabic","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":[],"lineNumber":30}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Alkalami","slug":"Alkalami","id":"alkalami","variants":["regular"],"subsets":["arabic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":35}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Amiri Quran","slug":"Amiri+Quran","id":"amiri-quran","variants":["regular"],"subsets":["arabic","latin"],"category":"serif","tags":[],"lineNumber":55}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Andada Pro","slug":"Andada+Pro","id":"andada-pro","variants":["regular","500","600","700","800","italic","500italic","600italic","700italic","800italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"serif","tags":[],"lineNumber":58}"
            selectedsubset=""
            selectedtag="need tags"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="523"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("removes tag", () => {
    // add tag first
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "cute" },
      })
    );

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "tag" },
      })
    );

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abel","slug":"Abel","id":"abel","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["condensed"],"lineNumber":3}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aclonica","slug":"Aclonica","id":"aclonica","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["modern","friendly"],"lineNumber":8}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Acme","slug":"Acme","id":"acme","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["cartoon","comic","groovy","headlines"],"lineNumber":9}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Actor","slug":"Actor","id":"actor","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["thin","legibility"],"lineNumber":10}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Adamina","slug":"Adamina","id":"adamina","variants":["regular"],"subsets":["latin"],"category":"serif","tags":["compact","small sizes","transitional"],"lineNumber":11}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1497"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("filters fonts when search", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "are you serious");

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1"
            search="are you serious"
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
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
            selectedtag=""
            selectedvariant=""
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

  test("removes search filter", async () => {
    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "are you serious");

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: "search" },
      })
    );

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abel","slug":"Abel","id":"abel","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["condensed"],"lineNumber":3}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aclonica","slug":"Aclonica","id":"aclonica","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["modern","friendly"],"lineNumber":8}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Acme","slug":"Acme","id":"acme","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["cartoon","comic","groovy","headlines"],"lineNumber":9}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Actor","slug":"Actor","id":"actor","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["thin","legibility"],"lineNumber":10}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Adamina","slug":"Adamina","id":"adamina","variants":["regular"],"subsets":["latin"],"category":"serif","tags":["compact","small sizes","transitional"],"lineNumber":11}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1497"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("removes all filters", async () => {
    // add tag first
    fontResults.dispatchEvent(
      new CustomEvent("tag-button-selected", {
        detail: { tag: "cute" },
      })
    );

    const inputSearch: HTMLInputElement =
      document.querySelector("#input-search");
    await userEvent.type(inputSearch, "are you serious");

    fontResults.dispatchEvent(
      new CustomEvent("clear-filter", {
        detail: { filter: undefined },
      })
    );

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abel","slug":"Abel","id":"abel","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["condensed"],"lineNumber":3}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aclonica","slug":"Aclonica","id":"aclonica","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["modern","friendly"],"lineNumber":8}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Acme","slug":"Acme","id":"acme","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["cartoon","comic","groovy","headlines"],"lineNumber":9}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Actor","slug":"Actor","id":"actor","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["thin","legibility"],"lineNumber":10}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Adamina","slug":"Adamina","id":"adamina","variants":["regular"],"subsets":["latin"],"category":"serif","tags":["compact","small sizes","transitional"],"lineNumber":11}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1497"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test('filters based on tag "cute" in search query', async () => {
    const location = {
      ...window.location,
      search: "?tag=cute",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = body;
    fontResults = document.querySelector("font-results");
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

  test("filters when tag radio clicked", async () => {
    const radioButton: HTMLInputElement = document.querySelector(
      "#tags input[value='1980s']"
    );
    radioButton.click();
    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="2"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="1980s"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Press Start 2P","slug":"Press+Start+2P","id":"press-start-2p","variants":["regular"],"subsets":["cyrillic","cyrillic-ext","greek","latin","latin-ext"],"category":"display","tags":["game","1980s","pixel"],"lineNumber":1139}"
            selectedsubset=""
            selectedtag="1980s"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Rubik 80s Fade","slug":"Rubik+80s+Fade","id":"rubik-80s-fade","variants":["regular"],"subsets":["cyrillic","cyrillic-ext","hebrew","latin","latin-ext"],"category":"display","tags":["1980s"],"lineNumber":1217}"
            selectedsubset=""
            selectedtag="1980s"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="2"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("skips unknown tag in search query", async () => {
    const location = {
      ...window.location,
      search: "?tag=donuts123",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = body;
    fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="1497"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"ABeeZee","slug":"ABeeZee","id":"abeezee","variants":["regular","italic"],"subsets":["latin","latin-ext"],"category":"sans-serif","tags":["literacy","kids"],"lineNumber":2}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abel","slug":"Abel","id":"abel","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["condensed"],"lineNumber":3}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abhaya Libre","slug":"Abhaya+Libre","id":"abhaya-libre","variants":["regular","500","600","700","800"],"subsets":["latin","latin-ext","sinhala"],"category":"serif","tags":[],"lineNumber":4}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aboreto","slug":"Aboreto","id":"aboreto","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["caps"],"lineNumber":5}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abril Fatface","slug":"Abril+Fatface","id":"abril-fatface","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["heavy","elegant","didone","headlines"],"lineNumber":6}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Abyssinica SIL","slug":"Abyssinica+SIL","id":"abyssinica-sil","variants":["regular"],"subsets":["ethiopic","latin","latin-ext"],"category":"serif","tags":[],"lineNumber":7}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Aclonica","slug":"Aclonica","id":"aclonica","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["modern","friendly"],"lineNumber":8}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Acme","slug":"Acme","id":"acme","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["cartoon","comic","groovy","headlines"],"lineNumber":9}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Actor","slug":"Actor","id":"actor","variants":["regular"],"subsets":["latin"],"category":"sans-serif","tags":["thin","legibility"],"lineNumber":10}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Adamina","slug":"Adamina","id":"adamina","variants":["regular"],"subsets":["latin"],"category":"serif","tags":["compact","small sizes","transitional"],"lineNumber":11}"
            selectedsubset=""
            selectedtag=""
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="1497"
          />
        </div>
        
                
      </font-results>
    `);
  });

  test("filters fonts when a tag is selected", async () => {
    const selectedTag: HTMLSelectElement =
      document.querySelector("#select-tags");
    await userEvent.selectOptions(selectedTag, "outline");

    expect(fontResults).toMatchInlineSnapshot(`
      <font-results>
        
                  
        <div
          id="search-status"
        >
          <search-status
            class="search-status"
            resultslength="24"
            search=""
            selectedcategory=""
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          class="families"
          id="families"
        >
          <font-item
            font="{"family":"Alumni Sans Collegiate One","slug":"Alumni+Sans+Collegiate+One","id":"alumni-sans-collegiate-one","variants":["regular","italic"],"subsets":["cyrillic","latin","latin-ext","vietnamese"],"category":"sans-serif","tags":["outline","collegiate"],"lineNumber":46}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Blaka Hollow","slug":"Blaka+Hollow","id":"blaka-hollow","variants":["regular"],"subsets":["arabic","latin","latin-ext"],"category":"display","tags":["gothic","arabic","outline"],"lineNumber":191}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Bungee Outline","slug":"Bungee+Outline","id":"bungee-outline","variants":["regular"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["outline","signage"],"lineNumber":212}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Ewert","slug":"Ewert","id":"ewert","variants":["regular"],"subsets":["latin","latin-ext"],"category":"display","tags":["western","outline","decorative"],"lineNumber":383}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Geostar","slug":"Geostar","id":"geostar","variants":["regular"],"subsets":["latin"],"category":"display","tags":["square","outline","headlines"],"lineNumber":458}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Jacques Francois Shadow","slug":"Jacques+Francois+Shadow","id":"jacques-francois-shadow","variants":["regular"],"subsets":["latin"],"category":"display","tags":["outline","shadow","1700s","large sizes"],"lineNumber":574}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Kranky","slug":"Kranky","id":"kranky","variants":["regular"],"subsets":["latin"],"category":"display","tags":["outline"],"lineNumber":634}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Kumar One Outline","slug":"Kumar+One+Outline","id":"kumar-one-outline","variants":["regular"],"subsets":["gujarati","latin","latin-ext"],"category":"display","tags":["outline"],"lineNumber":642}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Londrina Outline","slug":"Londrina+Outline","id":"londrina-outline","variants":["regular"],"subsets":["latin"],"category":"display","tags":["fun","outline","handwritten"],"lineNumber":695}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
          

          <font-item
            font="{"family":"Londrina Shadow","slug":"Londrina+Shadow","id":"londrina-shadow","variants":["regular"],"subsets":["latin"],"category":"display","tags":["outline","shadow","handwritten"],"lineNumber":696}"
            selectedsubset=""
            selectedtag="outline"
            selectedvariant=""
          />
        </div>
        
                  
        <div
          id="pagination"
        >
          <pagination-buttons
            currentpage="1"
            pagesize="10"
            resultslength="24"
          />
        </div>
        
                
      </font-results>
    `);
  });
});
