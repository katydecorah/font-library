import "./components";

describe("FontList", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render with fonts", () => {
    document.body.innerHTML = `<ul is="font-list" fonts='[{"family":"UnifrakturCook","variants":["700"],"subsets":["latin"],"category":"display","tags":[],"lineNumber":1020},{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}]'></ul>`;
    const fontList = document.querySelector("ul[is='font-list']");
    expect(fontList).toMatchSnapshot();
  });

  it("should render with fonts and selectedVariant", () => {
    document.body.innerHTML = `<ul is="font-list" fonts='[{"family":"UnifrakturCook","variants":["700"],"subsets":["latin"],"category":"display","tags":[],"lineNumber":1020},{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}]' selected-variant="700"></ul>`;
    const fontList = document.querySelector("ul[is='font-list']");
    expect(fontList).toMatchSnapshot();
  });

  it("should render with fonts and selectedSubset", () => {
    document.body.innerHTML = `<ul is="font-list" fonts='[{"family":"UnifrakturCook","variants":["700"],"subsets":["latin"],"category":"display","tags":[],"lineNumber":1020},{"family":"Alef","variants":["regular","700"],"subsets":["hebrew","latin"],"category":"sans-serif","tags":["geometric"],"lineNumber":23}]' selected-subset="hebrew"></ul>`;
    const fontList = document.querySelector("ul[is='font-list']");
    expect(fontList).toMatchSnapshot();
  });
});
