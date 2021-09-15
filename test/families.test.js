const test = require('tape');
const { readFileSync } = require('fs');
const fetch = require('node-fetch');
const path = 'families.json';

const families = JSON.parse(readFileSync(path));

// build list of family names in families.json
const familiesList = families.map(({ family }) => family);

(async () => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE'
    );
    const { items } = await response.json();
    // build list of family names in Google Fonts API
    const googleFamilies = items.map(({ family }) => family);
    runTests(googleFamilies);
  } catch (err) {
    console.log(err);
  }
})();

function runTests(googleFamilies) {
  // test each family in families.json
  families.forEach(({ family, tags }, index) => {
    test(family, (t) => {
      t.ok(family, 'must have a family');
      t.ok(tags, 'must have tags');

      // check if font exists in Google Fonts
      t.notEqual(
        googleFamilies.indexOf(family),
        '-1',
        `The font '${family}' does not match a font found in Google Fonts`
      );

      // no more than 5 tags
      if (tags) {
        t.equal(tags.length < 6, true, 'no more than 5 tags');
      }
      // tags must be lowercase
      tags.forEach((tag) => {
        if (isNaN(tag[0]) && tag[0] == tag[0].toUpperCase()) {
          t.fail(`${tag} tag must be lowercase`);
        }
      });
      // make sure families are in alphabetical order
      const prevFamily = families[index - 1]
        ? families[index - 1].family
        : undefined;
      if (prevFamily > family) {
        t.fail(
          `Font families must be in alphabetical order: '${family}' should appear before '${prevFamily}'`
        );
      }

      t.end();
    });
  });

  // check Google Fonts API for new fonts
  for (const font of googleFamilies) {
    if (!familiesList.includes(font)) {
      test(font, (t) => {
        t.fail(`Add the new font '${font}' to families.json`);
        t.end();
      });
    }
  }
}
