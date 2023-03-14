import "../components/tag-button";

describe("tag-button", () => {
  it("renders", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<tag-button selectedTag="${selectedTag}" value="${tag}">${tag}</tag-button>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<tag-button selectedtag="" value="cute" class="family-tag tag-cute">cute</tag-button>"`
    );
  });

  it("renders active", () => {
    const tag = "cute";
    const selectedTag = "cute";
    document.body.innerHTML = `<tag-button selectedTag="${selectedTag}" value="${tag}">${tag}</tag-button>`;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<tag-button selectedtag="cute" value="cute" class="family-tag tag-cute active">cute</tag-button>"`
    );
  });
});
