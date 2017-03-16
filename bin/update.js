#!/usr/bin/env node

// Require dependencies
var request = require('request');
var http = require('http'); 
var fs = require('fs');
var stringify = require('json-stringify-pretty-compact');

request.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
    // get current fonts in google fonts api
    var data = JSON.parse(body);
    
    // get data from families.json
    var buffer = JSON.parse(fs.readFileSync('families.json'));
    
    // get full library
    var library = buffer;
    
    // get list of families in font library
    var libraryFonts = [];
    buffer.forEach(function(font) {
      libraryFonts.push(font.family);
    });
    
    // track missing fonts
    var missing = [];
    
    // see if every google font is in font library
    data.items.forEach(function(font) {
      if (libraryFonts.indexOf(font.family) == -1) {
        // if not, add to library
        library.push({'family': font.family, 'tags': [] });
        missing.push(font.family);
      }
    });
    
    // if there are missing fonts
    if (missing.length > 0) {
      library = sortByKey(library, 'family');
      
      // write new data to families.json
      fs.writeFileSync('families.json', stringify(library, {maxLength: 200}), 'utf-8');
      console.log('Added ' + missing.join(', ') + ' to families.json');
    } else {
      // otherwise carry on
      console.log('No new fonts to add');
    }
  }
});

// sort the library
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
