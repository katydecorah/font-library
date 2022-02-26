const fetch = require("node-fetch");
const families = require("../families.json");

// build list of family names in families.json
const familiesList = families.map(({ family }) => family);
let googleFamilies = [];

beforeAll(async () => {
  const response = await fetch(
    "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE"
  );
  const { items } = await response.json();
  // build list of family names in Google Fonts API
  googleFamilies = items.map(({ family }) => family);
});

// test each family in families.json
families.forEach(({ family, tags }, index) => {
  test(family, async () => {
    expect(family).toBeDefined();
    expect(tags).toBeDefined();

    // check if font exists in Google Fonts
    expect(googleFamilies.includes(family)).toBeTruthy();

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

// check Google Fonts API for new fonts
for (const font of googleFamilies) {
  if (!familiesList.includes(font)) {
    test(`Add new font: ${font}`, () => {
      expect(font).toBeDefined();
    });
  }
}
