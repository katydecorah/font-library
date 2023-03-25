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

  // sort tags by number of families
  const tags = Object.values(families).reduce((acc, tags) => {
    for (const tag of tags) {
      if (acc[tag]) {
        acc[tag]++;
      } else {
        acc[tag] = 1;
      }
    }
    return acc;
  }, {} as Record<string, number>);
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
