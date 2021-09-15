#!/usr/bin/env node

// Require dependencies
const request = require('request');
const fs = require('fs');
const stringify = require('json-stringify-pretty-compact');

request.get(
  'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE',
  (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // get current fonts in google fonts api
      const data = JSON.parse(body);

      // get data from families.json
      const buffer = JSON.parse(fs.readFileSync('families.json'));

      // get full library
      let library = buffer;

      // get list of families in font library
      const libraryFonts = [];
      buffer.forEach((font) => {
        libraryFonts.push(font.family);
      });

      // track missing fonts
      const missing = [];

      // see if every google font is in font library
      data.items.forEach((font) => {
        if (libraryFonts.indexOf(font.family) == -1) {
          // if not, add to library
          library.push({ family: font.family, tags: [] });
          missing.push(font.family);
        }
      });

      // if there are missing fonts
      if (missing.length > 0) {
        library = sortByKey(library, 'family');

        // write new data to families.json
        fs.writeFileSync(
          'families.json',
          stringify(library, { maxLength: 200 }),
          'utf-8'
        );
        console.log(`Added ${missing.join(', ')} to families.json`);
      } else {
        // otherwise carry on
        console.log('No new fonts to add');
      }
    }
  }
);

// sort the library
function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
