import "../components/tag-button";

describe("tag-button", () => {
  it("renders", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<button is="tag-button" selectedTag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton = document.querySelector("button[is=tag-button]");
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="family-tag tag-cute"
        is="tag-button"
        selectedtag=""
        value="cute"
      >
        cute
      </button>
    `);
  });

  it("renders active", () => {
    const tag = "cute";
    const selectedTag = "cute";
    document.body.innerHTML = `<button is="tag-button" selectedTag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton = document.querySelector("button[is=tag-button]");
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="family-tag tag-cute active"
        is="tag-button"
        selectedtag="cute"
        value="cute"
      >
        cute
      </button>
    `);
  });

  it("fires a custom event when clicked", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<button is="tag-button" selectedTag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]"
    );
    const mockFn = jest.fn();
    tagButton.addEventListener("tag-button-selected", mockFn);
    tagButton.click();
    expect(mockFn).toHaveBeenCalled();
  });
});
