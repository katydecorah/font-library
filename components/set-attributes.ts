export function setAttributes(
  element: HTMLElement,
  attributes: {
    [x: string]: string;
  },
): void {
  for (const key of Object.keys(attributes)) {
    if (attributes[key] !== undefined && attributes[key] !== null) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
