import "./components";

describe("tag-button", () => {
  beforeEach(() => {
    const location = {
      ...window.location,
      search: "",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });
  });

  it("renders", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<button is="tag-button" selected-tag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton = document.querySelector("button[is=tag-button]");
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        is="tag-button"
        selected-tag=""
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });

  it("renders active", () => {
    const tag = "cute";
    const selectedTag = "cute";
    document.body.innerHTML = `<button is="tag-button" selected-tag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton = document.querySelector("button[is=tag-button]");
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        is="tag-button"
        selected-tag="cute"
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });

  it("fires a custom event when clicked", () => {
    const tag = "cute";
    const selectedTag = "";
    document.body.innerHTML = `<button is="tag-button" selected-tag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]"
    );
    const mockFn = jest.fn();
    tagButton.addEventListener("tag-button-selected", mockFn);
    tagButton.click();
    expect(mockFn).toHaveBeenCalled();
  });

  it("sets initial value if param is in url", () => {
    const tag = "cute";
    const selectedTag = "";
    const location = {
      ...window.location,
      search: "?tag=cute",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = `<button is="tag-button" selected-tag="${selectedTag}" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]"
    );
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="active"
        is="tag-button"
        selected-tag=""
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });
});
