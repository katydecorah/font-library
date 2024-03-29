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
    document.body.innerHTML = `<button is="tag-button" value="${tag}">${tag}</button>`;
    const tagButton = document.querySelector("button[is=tag-button]");
    expect(tagButton).toMatchInlineSnapshot(`
      <button
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
    document.body.innerHTML = `<button is="tag-button" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]",
    );
    const mockFunction = jest.fn();
    tagButton.addEventListener("tag-button-selected", mockFunction);
    tagButton.click();
    expect(mockFunction).toHaveBeenCalled();
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="active"
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

    document.body.innerHTML = `<button is="tag-button" value="${tag}">${tag}</button>`;
    const tagButton: HTMLButtonElement = document.querySelector(
      "button[is=tag-button]",
    );
    expect(tagButton).toMatchInlineSnapshot(`
      <button
        class="active"
        is="tag-button"
        style="font-family: "Bonbon";"
        value="cute"
      >
        cute
      </button>
    `);
  });
});
