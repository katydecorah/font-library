Font Library is built with [Jekyll](http://jekyllrb.com/) and [AngularJS](https://angularjs.org/), but you don't need to know either to add or edit the tags &mdash; you only need to edit a file!

Each font family is stored as an object in `families.json`. Each family has an array of tags.

# Help wanted

You can to edit `families.json` to add, edit, or improve tags. I recommend starting by tagging fonts that you often want to find for yourself -- curate your own tag! It's likely that someone else will dig your collection.

Click **Need tags** to show all fonts that haven't been tagged yet:

![image](https://cloud.githubusercontent.com/assets/2180540/15269030/612cc00e-19c0-11e6-85c1-24f5fd07f717.png)


Add tags to `families.json` as described in the next sections.

# Editing families.json guidelines

[View families.json](https://github.com/katydecorah/font-library/blob/gh-pages/families.json)

* Keep the list alphabetical by family name
* Tags are lowercase
* Each font should have no more than 5 tags
* Avoid creating new tags that are similar to already established tags, instead consolidate or rename all similar tags if a different tag name is more intuitive
* Avoid ambiguous names for tags; make the tag name intuitive (Would you use this tag to find font X?)
* The family name must match the Google Font family name exactly

These guidelines are enforced by tests. You can run the tests locally by first running `npm install` from the command line and then `npm run`. Or you can wait to create a pull request and the tests will run there.

# Contributing

There are a few different ways to contribute, you can:

1. Edit from Github.com directly
2. Create a pull request
3. Create an issue

## 1. Edit from Github.com directly

If you're new to Github, I recommend reading: [Editing files in another user's repository](https://help.github.com/articles/editing-files-in-another-user-s-repository/).

Then open up [families.json](https://github.com/katydecorah/font-library/blob/gh-pages/families.json) to start editing.

## 2. Create a pull request

You can **create a pull request** to edit tags or to add newly added Google fonts.

When creating a pull request, it's helpful to:

* Double check your tags and ask yourself if it's something that you would use to find fonts
* Provide a brief description of the tags you added or changed
* Edit tags in small batches (<20 edits) to make reviewing quicker and easier

If you're new to Github, I recommend reading: [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/). 

If you need help with your pull request, tweet at me, [@katydecorah](https://twitter.com/katydecorah), and I'll be happy to help!

## 3. Create an issue

You can also create an issue to recommend changes to the library.

If you're new to Github, I recommend reading: [Creating an issue](https://help.github.com/articles/creating-an-issue/) 


💜 Happy tagging! 💜

