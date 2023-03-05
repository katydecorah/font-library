const families = require("../families.json");
const { subsets } = require("../_data/metadata.json");

// test each family in families.json
families.forEach(({ family, tags }, index) => {
  describe(family, () => {
    test(`${family} metadata`, async () => {
      expect(family).toBeDefined();
      expect(tags).toBeDefined();
      // make sure families are in alphabetical order
      const prevFamily = families[index - 1]
        ? families[index - 1].family
        : undefined;
      expect(prevFamily > family).toBeFalsy();
    });

    for (const tag of tags) {
      describe("tags", () => {
        test(`"${family}" must have no more than 5 tags`, async () => {
          expect(tags.length).toBeLessThan(6);
        });
        // tag mut be lowercase
        test(`"${tag}" must be lowercase`, async () => {
          expect(tag).toEqual(tag.toLowerCase());
        });
        test(`"${tag}" must not be a subset`, async () => {
          // tag must not match a subset
          expect(subsets.includes(tag)).toBeFalsy();
        });
      });
    }
  });
});
