var test = require('tape');
var fs = require('fs');
var request = require('request');

var path = 'families.json';

var families = JSON.parse(fs.readFileSync(path));

// build list of family names in families.json
var familiesList = [];
families.forEach(function(i) {
  familiesList.push(i.family);
});

var url =
  'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE';

request(url, onRequestDone);

function onRequestDone(err, resp, body) {
  // build list of family names in Google Fonts API
  var googleFamilies = [];
  if (!err && resp.statusCode == 200) {
    var json = JSON.parse(body);
    json.items.forEach(function(i) {
      googleFamilies.push(i.family);
    });
  }
  runTests(googleFamilies);
}

function runTests(googleFamilies) {
  // test each family in families.json
  families.reduce(function(prev, post, currentIndex) {
    test(post.family, function(t) {
      t.equal(typeof post, 'object', 'family must be formatted correctly');
      t.ok(post.family, 'must have a family');
      t.ok(post.tags, 'must have tags');

      // check if font exists in Google Fonts
      t.notEqual(
        googleFamilies.indexOf(post.family),
        -1,
        "The font '" +
          post.family +
          "' does not match a font found in Google Fonts"
      );

      // no more than 5 tags
      if (post.tags) {
        t.equal(post.tags.length < 6, true, 'no more than 5 tags');
      }
      // tags must be lowercase
      post.tags.forEach(function(tag) {
        if (isNaN(tag[0]) && tag[0] == tag[0].toUpperCase()) {
          t.fail(tag + ' tag must be lowercase');
        }
      });
      // make sure families are in alphabetical order
      var prevFamily = families[currentIndex - 1].family;
      if (prevFamily > post.family) {
        t.fail(
          "Font families must be in alphabetical order: '" +
            post.family +
            "' should appear before '" +
            prevFamily +
            "'"
        );
      }

      t.end();
    });
  });

  // check Google Fonts API for new fonts
  googleFamilies.forEach(function(post) {
    if (familiesList.indexOf(post) == -1) {
      test(post, function(t) {
        t.fail("Add the new font '" + post + "' to families.json");
        t.end();
      });
    }
  });
}
