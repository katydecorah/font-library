import "../components/tag-button";

describe("tag-button", () => {
  it("renders", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<tag-button selectedTag="${selectedTag}" value="${tag}">${tag}</tag-button>`;
    const tagButton = document.querySelector("tag-button");
    expect(tagButton).toMatchInlineSnapshot(`
      <tag-button
        class="family-tag tag-cute"
        selectedtag=""
        value="cute"
      >
        cute
      </tag-button>
    `);
  });

  it("renders active", () => {
    const tag = "cute";
    const selectedTag = "cute";
    document.body.innerHTML = `<tag-button selectedTag="${selectedTag}" value="${tag}">${tag}</tag-button>`;
    const tagButton = document.querySelector("tag-button");
    expect(tagButton).toMatchInlineSnapshot(`
      <tag-button
        class="family-tag tag-cute active"
        selectedtag="cute"
        value="cute"
      >
        cute
      </tag-button>
    `);
  });

  it("fires a custom event when clicked", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<tag-button selectedTag="${selectedTag}" value="${tag}">${tag}</tag-button>`;
    const tagButton = document.querySelector("tag-button");
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const clickHandler = jest.fn();
    tagButton.addEventListener("click", clickHandler);
    tagButton.dispatchEvent(clickEvent);
    expect(clickHandler).toHaveBeenCalled();
  });
});
