Font Library [![Build Status](https://travis-ci.org/katydecorah/font-library.svg?branch=gh-pages)](https://travis-ci.org/katydecorah/font-library)
-----------

## Contributing

The are over 700 [Google Fonts](http://www.google.com/fonts), let's organize them!

### Background

Font Library is built with [Jekyll](http://jekyllrb.com/) and [AngularJS](https://angularjs.org/), but you don't need to know either to add or edit the tags &mdash; you only need to know how to edit a file.

Each font family is stored as an object in `families.json`. Each family has an array of tags.

### Help wanted

You're welcome to edit `families.json` to add, edit, or improve tags. I recommend starting by tagging fonts that you often want to find for yourself -- curate your own tag! It's likely that someone else will dig your collection.

Click the **Need tags** button to show all fonts that haven't been tagged yet:

![image](https://cloud.githubusercontent.com/assets/2180540/8345655/436c219a-1ac0-11e5-81d2-eb37d89b5845.png)

Add tags to `families.json` as described in the next sections.

### Adding/editing `families.json` guidelines

* Use double quotes `"`
* Do not delete or change the first tag, this is the classification defined by Google
* Keep the list alphabetical by family name
* Tags are lowercase
* Each font should have no more than 5 tags
* Avoid creating new tags that are similar to already established tags, instead consolidate or rename all similar tags if a different tag name is more intuitive
* Avoid ambiguous names for tags; make the tag name intuitive (Would you use this tag to find font X?)
* The family name must match the Google Font family name exactly

[View families.json](https://github.com/katydecorah/font-library/blob/gh-pages/families.json)

### Creating a pull request or issue

Please **create a pull request** or **create an issue** to add/edit tags or to add newly added Google fonts.

When creating a pull request, it's helpful to:
* Double check your tags and ask yourself if it's something that you would use to find fonts
* Provide a brief description of the tags your added or changed
* Edit tags in small batches (<20 edits) to make reviewing quicker and easier

If you're new to Github, I'm happy to walk you through it. I recommend reading [Creating an issue](https://help.github.com/articles/creating-an-issue/) and [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/). If you need help with your pull request, create an issue and tag me in it `@katydecorah` and I'll help.

## Building

Font Library is built with [Jekyll](http://jekyllrb.com/). If you're just updating tags in `families.json`, you don't need to build the site locally. But you can if you prefer to see your changes before you submit a pull request.

To build it locally, you will need to:

* [Install Jekyll](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll)
* Install Bundler: `bundle install`

To build the site: `bundle exec jekyll serve --watch`

To test the site run, first run `npm install` and then `npm test`.

## License

[The MIT License (MIT)](LICENSE)

Font tag data is licensed under [CC0 1.0 Universal (CC0 1.0)](http://creativecommons.org/publicdomain/zero/1.0/)
