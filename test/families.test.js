var test = require('tape');
var fs = require('fs');
var path =  require('path');
var jsyaml = require('js-yaml');

var path = 'families.json';

var families = JSON.parse(fs.readFileSync(path));

families.forEach(function(post) {
  test(post.family, function(t) {
    t.equal( typeof post, 'object', "family must be formatted correctly");
    t.ok(post.family, "must have a family");
    t.ok(post.tags, "must have tags");
    // no more than 5 tags
    if (post.tags) {
      t.equal(post.tags.length < 6, true, 'no more than 5 tags');
    }
    // tags must be lowercase
    post.tags.forEach(function(tag){
      if (isNaN(tag[0]) && tag[0] == tag[0].toUpperCase()) {
        t.fail(tag + " tag must be lowercase")
      }
    });
    t.end();
  });
});