import {
  fontCallVariant,
  fontCallSelectedVariant,
} from "../components/font-call";

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

describe("fontCallSelectedVariant", () => {
  it('should return ":ital@1" when selectedVariant is "italic"', () => {
    const result = fontCallSelectedVariant("italic");
    expect(result).toBe(":ital@1");
  });

  it('should return ":ital,wght@1,400" when selectedVariant is "italic400"', () => {
    const result = fontCallSelectedVariant("italic400");
    expect(result).toBe(":ital,wght@1,400");
  });

  it('should return ":wght@400" when selectedVariant is "400"', () => {
    const result = fontCallSelectedVariant("400");
    expect(result).toBe(":wght@400");
  });

  it('should return ":" when selectedVariant does not include "italic" or a number', () => {
    const result = fontCallSelectedVariant("regular");
    expect(result).toBe(":");
  });
});
