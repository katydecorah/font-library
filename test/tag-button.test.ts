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
    document.body.innerHTML = `<button is="tag-button" class="family-tag" value="${tag}">${tag}</button>`;
    const tagButton = document.querySelector("button[is=tag-button]");
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="family-tag"
        is="tag-button"
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });

  it("renders active when clicked", () => {
    const tag = "cute";
    document.body.innerHTML = `<button is="tag-button" class="family-tag" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]"
    );
    const mockFn = jest.fn();
    tagButton.addEventListener("tag-button-selected", mockFn);
    tagButton.click();
    expect(mockFn).toHaveBeenCalled();
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="family-tag active"
        is="tag-button"
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });

  it("sets initial value if param is in url", () => {
    const tag = "cute";
    const location = {
      ...window.location,
      search: "?tag=cute",
    };
    Object.defineProperty(window, "location", {
      writable: true,
      value: location,
    });

    document.body.innerHTML = `<button is="tag-button" class="family-tag" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]"
    );
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="family-tag active"
        is="tag-button"
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });
});
