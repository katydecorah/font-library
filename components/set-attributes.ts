export function setAttributes(
  element: HTMLElement,
  attributes: {
    [x: string]: string;
  },
): void {
  for (const key in attributes) {
    if (attributes[key] !== undefined && attributes[key] !== null) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
