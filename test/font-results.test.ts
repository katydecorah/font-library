import customEvent from "../components/custom-event";
import "./components";

describe("FontResults", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  test("renders correctly", () => {
    document.body.innerHTML = `<div id="content"><font-results sort-by="family" selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const fontResults = document.querySelector("font-results");
    expect(fontResults).toMatchSnapshot();
  });

  test("fires a next-page custom event", () => {
    document.body.innerHTML = `<div id="content"><font-results sort-by="family" selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const fontResults = document.querySelector("font-results");
    fontResults.dispatchEvent(customEvent("next-page"));
    const pagination = document.querySelector("pagination-buttons");
    expect(pagination.getAttribute("current-page")).toBe("2");
  });

  test("fires a prev-page custom event", () => {
    document.body.innerHTML = `<div id="content"><font-results sort-by="family" selected-category="" selected-subset="" selected-variant="" selected-tag="" selected-search="" selected-variable=""></font-results></div>`;
    const fontResults = document.querySelector("font-results");
    fontResults.dispatchEvent(customEvent("next-page"));
    fontResults.dispatchEvent(customEvent("previous-page"));
    const pagination = document.querySelector("pagination-buttons");
    expect(pagination.getAttribute("current-page")).toBe("1");
  });
});
