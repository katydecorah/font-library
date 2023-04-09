export function setAttributes(
  element: HTMLElement,
  attributes: {
    [x: string]: string;
  }
) {
  for (const key in attributes) {
    if (
      //      attributes[key] !== "" &&
      attributes[key] !== undefined &&
      attributes[key] !== null
    ) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
