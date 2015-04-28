Font Library
-----------

## Contributing

It's difficult to find Google fonts that are *futuristic* or *typewriter* when you don't know the exact name. I started tagging all the Google fonts to make it easier to find that special font.

The are nearly 700 [Google Fonts](http://www.google.com/fonts), let's organize them!

### Background

Each font family is stored as an object in `families.json`. Each family has an array of tags. The first tag is from Google's classification of the font.

### Adding/editing `families.json` guidelines

* Use double quotes `"`
* Do not delete or change the first tag (this is the classification defined by Google)
* Keep the list alphabetical by family name
* The family name must match Google's exactly

### Help wanted

Want to help, but don't know where to start? Open your browser's Console:

* If Google adds a new font, but we haven't added it to `families.json` yet, then the Console will log it along with the exact entry you can add to `families.json`. Feel free to add additional tags to the entry.
* If a family has less than 2 tags, then the Console will log it. Open the provided link to the specimen page and read the description to get ideas for tags. Try to use tags that are already established, but create new tags when necessary.

You may create a pull request or create an issue to add/edit tags or to add new Google fonts.

