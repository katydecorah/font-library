var test = require('tape');
var fs = require('fs');
var path =  require('path');
var jsyaml = require('js-yaml');

var path = 'families.json';

var families = JSON.parse(fs.readFileSync(path));

families.reduce(function(prev, post, currentIndex, array) {
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
    // make sure families are in alphabetical order
    var prevFamily = families[currentIndex - 1].family;
    if ( prevFamily > post.family ) {
      t.fail("Font families must be in alphabetical order: '" + post.family + "' should appear before '" + prevFamily + "'");
    }    
    
    t.end();
  });
});