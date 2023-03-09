// eslint-disable-next-line @typescript-eslint/no-var-requires
const families = require("../families.json");

describe("families.json", () => {
  for (const [index, { family, tags }] of families.entries()) {
    describe(`${family}`, () => {
      test("should have `family`", () => {
        expect(family).toBeTruthy();
      });

      test("make sure `family` is in alphabetical order", () => {
        const prevFamily = families[index - 1]
          ? families[index - 1].family
          : undefined;
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
  }
});
