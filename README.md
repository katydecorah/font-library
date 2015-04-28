Font Library
-----------

## Contributing

It's difficult to find Google fonts that are *futuristic* or *typewriter* when you don't know the exact name. I started tagging all the Google fonts to make it easier to find that special font.

The are nearly 700 [Google Fonts](http://www.google.com/fonts), let's organize them!

### Background

Font Library is built with Jekyll and AngularJS, but you don't need to know either to add or edit the tags. Each font family is stored as an object in `families.json`. Each family has an array of tags. The first tag is from Google's classification of the font.

### Adding/editing `families.json` guidelines

* Use double quotes `"`
* Do not delete or change the first tag (this is the classification defined by Google)
* Keep the list alphabetical by family name
* The family name must match Google's exactly
* Tags should be lowercase

### Help wanted

Want to help, but don't know where to start? Open your browser's Console:

* If Google adds a new font, but we haven't added it to `families.json` yet, then the Console will log it along with the exact entry you can add to `families.json`. Feel free to add additional tags to the entry.
* If a family has less than 2 tags, then the Console will log it. Open the provided link to the specimen page and read the description to get ideas for tags. Try to use tags that are already established, but create new tags when necessary.

Please **create a pull request** or **create an issue** to add/edit tags or to add new Google fonts. If you're new to Github, I'm happy to walk you through it. I recommend reading [Creating an issue](https://help.github.com/articles/creating-an-issue/) and [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/). If you need help with your pull request, create an issue and tag me in it `@katydecorah` and I'll help you through it.