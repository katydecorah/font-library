import "../components/font-item";

describe("FontItem", () => {
  test("renders correctly", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });

  test("no latin subset", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"GFS Neohellenic","variants":["regular","italic","700","700italic"],"subsets":["greek"],"category":"sans-serif","tags":["round","monolinear","1930s"],"lineNumber":439}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });

  test("rtl subset", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"Almarai","variants":["300","regular","700","800"],"subsets":["arabic"],"category":"sans-serif","tags":["arabic"],"lineNumber":41}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });

  test("selected variant, 900italic", () => {
    document.body.innerHTML = `<font-item selectedVariant="900italic" selectedSubset="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });

  test("selected variant, 900", () => {
    document.body.innerHTML = `<font-item selectedVariant="900" selectedSubset="" font='{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"subsets":["latin","latin-ext","vietnamese"],"category":"display","tags":["eurostile"],"lineNumber":78}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });

  test("selected subset", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="hebrew" font='{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });

  test("has family name that exists in swaps.json", () => {
    document.body.innerHTML = `<font-item selectedVariant="" selectedSubset="" font='{"family":"Material Symbols Sharp","variants":["100","200","300","regular","500","600","700"],"subsets":["latin"],"category":"monospace","tags":[],"lineNumber":752}'></font-item>`;
    const fontItem = document.querySelector("font-item");
    expect(fontItem).toMatchSnapshot();
  });
});
