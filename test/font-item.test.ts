import "./components";

describe("FontItem", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    const fonts = document.querySelectorAll("link[data-family]");
    for (const font of fonts) {
      font.remove();
    }
  });

  test("renders correctly", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document.querySelector("[data-family='Alef']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Alef&text=Alef&display=swap"`
    );
  });

  test("no latin subset", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"GFS Neohellenic","variants":["regular","italic","700","700italic"],"subsets":["greek"],"category":"sans-serif","tags":["round","monolinear","1930s"],"lineNumber":439}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document
        .querySelector("[data-family='GFS Neohellenic']")
        .getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=GFS+Neohellenic&text=%CE%93%CE%B5%CE%B9%CE%AC%20%CF%83%CE%BF%CF%85%20%CE%9A%CF%8C%CF%83%CE%BC%CE%B5&display=swap"`
    );
  });

  test("rtl subset", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"Almarai","variants":["300","regular","700","800"],"subsets":["arabic"],"category":"sans-serif","tags":["arabic"],"lineNumber":41}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document.querySelector("[data-family='Almarai']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Almarai&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A8%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85&display=swap"`
    );
  });

  test("selected variant, 900italic", () => {
    document.body.innerHTML = `<font-item selected-variant="900italic" selected-subset="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document.querySelector("[data-family='Anybody']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Anybody:ital,wght@1,900&text=Anybody&display=swap"`
    );
  });

  test("selected variant, italic", () => {
    document.body.innerHTML = `<font-item selected-variant="italic" selected-subset="" selected-tag="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":79,"variable":true}' id="anybody"></font-item>`;
    expect(
      document.querySelector("[data-family='Anybody']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Anybody:ital@1&text=Anybody&display=swap"`
    );
  });

  test("selected variant, 900", () => {
    document.body.innerHTML = `<font-item selected-variant="900" selected-subset="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document.querySelector("[data-family='Anybody']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Anybody:wght@900&text=Anybody&display=swap"`
    );
  });

  test("selected subset", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="hebrew" font='{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document.querySelector("[data-family='Alef']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Alef&text=%D7%A9%D6%B8%D7%81%D7%9C%D7%95%D6%B9%D7%9D%20%D7%A2%D7%95%D6%B9%D7%9C%D6%B8%D7%9D%20&display=swap"`
    );
  });

  test("has family name that exists in swaps.json", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"Material Symbols Sharp","variants":["100","200","300","regular","500","600","700"],"subsets":["latin"],"category":"monospace","tags":[],"lineNumber":752}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document
        .querySelector("[data-family='Material Symbols Sharp']")
        .getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp&text=favorite%20add%20delete%20settings%20search&display=swap"`
    );
  });

  test("is variable font", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"Akshar","variants":["300","regular","500","600","700"],"subsets":["devanagari","latin","latin-ext"],"category":"sans-serif","tags":["condensed","narrow"],"lineNumber":17,"variable":true}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
    expect(
      document.querySelector("[data-family='Akshar']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Akshar&text=Akshar&display=swap"`
    );
  });

  test("molle, italic variant only", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"Molle","variants":["italic"],"subsets":["latin"],"category":"handwriting","tags":[],"lineNumber":578}'></font-item>`;
    expect(
      document.querySelector("[data-family='Molle']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Molle:ital@1&text=Molle&display=swap"`
    );
  });
  test("sunflower, multiple non-regular variants", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"Sunflower","variants":["300","500","700"],"subsets":["latin"],"category":"sans-serif","tags":[],"lineNumber":1000}'></font-item>`;
    expect(
      document.querySelector("[data-family='Sunflower']").getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=Sunflower:wght@300&text=Sunflower&display=swap"`
    );
  });
  test("unifrakturcook, one non-regular variant", () => {
    document.body.innerHTML = `<font-item selected-variant="" selected-subset="" font='{"family":"UnifrakturCook","variants":["700"],"subsets":["latin"],"category":"display","tags":[],"lineNumber":1020}'></font-item>`;
    expect(
      document
        .querySelector("[data-family='UnifrakturCook']")
        .getAttribute("href")
    ).toMatchInlineSnapshot(
      `"https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&text=UnifrakturCook&display=swap"`
    );
  });
});
