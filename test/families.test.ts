import families from "./fixtures/families.json";

type Families = typeof families;

describe("families.json", () => {
  for (const [index, family] of Object.keys(families).entries()) {
    const tags = families[family as keyof Families];
    describe(`${family}`, () => {
      test("should have `family`", () => {
        expect(family).toBeTruthy();
      });

      test("make sure `family` is in alphabetical order", () => {
        const keys = Object.keys(families);
        const previousFamily = keys[index - 1] || undefined;
        expect(previousFamily > family).toBeFalsy();
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
              expect(tag).toMatch(/^[\d a-z-]+$/);
            });

            test("is a string", () => {
              expect(typeof tag).toBe("string");
            });
          });
        }
      });
    });
  }

  // sort tags by number of families
  // eslint-disable-next-line unicorn/no-array-reduce
  const tags = Object.values(families).reduce(
    (accumulator, tags) => {
      for (const tag of tags) {
        if (accumulator[tag]) {
          accumulator[tag]++;
        } else {
          accumulator[tag] = 1;
        }
      }
      return accumulator;
    },
    {} as Record<string, number>,
  );
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  describe("tags", () => {
    for (const tag of sortedTags) {
      describe(`${tag}`, () => {
        // has more than one family
        test("has more than one family", () => {
          expect(tags[tag] > 1).toBeTruthy();
        });
      });
    }
  });
});
