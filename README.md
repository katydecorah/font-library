Font Library [![Build Status](https://travis-ci.org/katydecorah/font-library.svg?branch=gh-pages)](https://travis-ci.org/katydecorah/font-library)
-----------

## Contributing

The are over 700 [Google Fonts](http://www.google.com/fonts), let's organize them!

### Background

Font Library is built with [Jekyll](http://jekyllrb.com/) and [AngularJS](https://angularjs.org/), but you don't need to know either to add or edit the tags &mdash; you only need to know how to edit a file.

Each font family is stored as an object in `families.json`. Each family has an array of tags. The first tag is from Google's classification of the font. Some font's have the tag `greek` or `khmer`, this is to denote the subset of the font. Some families have additional keys such as `weight` or `italic` to denote that this family doesn't have a `regular` weight.

### Adding/editing `families.json` guidelines

* Use double quotes `"`
* Do not delete or change the first tag, this is the classification defined by Google
* Do not delete or change the `greek` or `khmer` tag, these denote the subset of the font
* Do not delete the `italic` or `weight` keys or update their values, these are necessary to properly output fonts
* Keep the list alphabetical by family name
* The family name must match Google's exactly
* Tags should be lowercase
* Each font should have no more than 5 tags

[View families.json](https://github.com/katydecorah/font-library/blob/gh-pages/families.json)

### Help wanted

You're welcome to edit `families.json` to add, edit, or improve tags. I recommend starting by tagging fonts that you often want to find for yourself -- curate your own tag! It's likely that someone else will dig your collection.

Want to help, but don't know where to start? Open your browser's Console:

![image](https://cloud.githubusercontent.com/assets/2180540/7384122/3632875a-edfa-11e4-8e91-37c9c017e8df.png)

* **Help wanted! These fonts need to be added to families.json** &mdash; if Google adds a new font, but we haven't added it to `families.json` yet, then the Console will log it along with the exact entry you can copy and paste into `families.json`. Feel free to add additional tags to the entry.
* **Help wanted! These fonts need more tags in families.json** &mdash; if a family has less than 2 tags, then the Console will log it. Open the provided link to the specimen page and read the description to get ideas for tags. Try to use tags that are already established, but create new tags when necessary.

Please **create a pull request** or **create an issue** to add/edit tags or to add new Google fonts. If you're new to Github, I'm happy to walk you through it. I recommend reading [Creating an issue](https://help.github.com/articles/creating-an-issue/) and [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/). If you need help with your pull request, create an issue and tag me in it `@katydecorah` and I'll help.

## Building

Font Library is built with [Jekyll](http://jekyllrb.com/). If you're just updating tags in `families.json`, you don't need to build the site locally. But you can if you prefer to see your changes before you submit a pull request.

To build it locally, you will need to:

* [Install Jekyll](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll)
* Install Bundler: `bundle install`

To build the site:

`rake serve`

or

`bundle exec jekyll serve --watch`

To test the site run:

`rake test`
