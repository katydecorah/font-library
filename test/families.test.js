const families = require("../families.json");

// test each family in families.json
families.forEach(({ family, tags }, index) => {
  test(family, async () => {
    expect(family).toBeDefined();
    expect(tags).toBeDefined();

    // no more than 5 tags
    if (tags) {
      expect(tags.length < 6).toBeTruthy();
    }
    // tags must be lowercase
    tags.forEach((tag) => {
      expect(isNaN(tag[0]) && tag[0] == tag[0].toUpperCase()).toBeFalsy();
    });
    // make sure families are in alphabetical order
    const prevFamily = families[index - 1]
      ? families[index - 1].family
      : undefined;
    expect(prevFamily > family).toBeFalsy();
  });
});
