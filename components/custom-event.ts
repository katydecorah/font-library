export default function customEvent(
  eventName: string,
  detail?: {
    filter?: string;
    value?: string | boolean;
    id?: string;
    sortBy?: string;
  }
): CustomEvent {
  return new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    detail,
  });
}
