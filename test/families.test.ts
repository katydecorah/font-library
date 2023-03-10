import families from "../families.json";

type Families = typeof families;

describe("families.json", () => {
  Object.keys(families).forEach((family, index) => {
    const tags = families[family as keyof Families];
    describe(`${family}`, () => {
      test("should have `family`", () => {
        expect(family).toBeTruthy();
      });

      test("make sure `family` is in alphabetical order", () => {
        const keys = Object.keys(families);
        const prevFamily = keys[index - 1] || undefined;
        expect(prevFamily > family).toBeFalsy();
      });

      describe("tags", () => {
        test("should have `tags`", () => {
          expect(tags).toBeTruthy();
        });

        test("no more than 5 tags", () => {
          expect(tags.length < 6).toBeTruthy();
        });

        test("tags should be an array", () => {
          expect(Array.isArray(tags)).toBeTruthy();
        });

        for (const tag of tags) {
          describe(`${tag}`, () => {
            test("is lowercase", () => {
              expect(tag).toBe(tag.toLowerCase());
            });

            test("contains letters, numbers, dashes, and spaces only", () => {
              expect(tag).toMatch(/^[a-z0-9\- ]+$/);
            });

            test("is a string", () => {
              expect(typeof tag).toBe("string");
            });
          });
        }
      });
    });
  });
});
