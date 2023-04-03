export default function customEvent(
  eventName: string,
  detail?: {
    value?: string | boolean;
    id?: string;
  }
): CustomEvent {
  return new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    detail,
  });
}
