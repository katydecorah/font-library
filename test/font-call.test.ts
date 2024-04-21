import { fontCallVariant } from "../components/font-call";

describe("fontCallVariant", () => {
  it("should return weight variant when first variant is a number", () => {
    const variants = ["400", "italic"];
    const result = fontCallVariant(variants);
    expect(result).toBe(":wght@400");
  });

  it('should return italic variant when first variant includes "italic"', () => {
    const variants = ["italic", "400"];
    const result = fontCallVariant(variants);
    expect(result).toBe(":ital@1");
  });

  it('should return empty string when first variant is neither a number nor "italic"', () => {
    const variants = ["regular", "bold"];
    const result = fontCallVariant(variants);
    expect(result).toBe("");
  });
});
