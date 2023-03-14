import "../components/clear-button";

describe("clear-button", () => {
  it("renders", () => {
    document.body.innerHTML = `<clear-button></clear-button>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<clear-button role="button"></clear-button>"`
    );
  });
});
