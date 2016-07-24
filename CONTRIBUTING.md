Font Library is built with [Jekyll](http://jekyllrb.com/) and [AngularJS](https://angularjs.org/), but you don't need to know either to add or edit the tags &mdash; you only need to edit a file! First-time contributors welcome here :tada:!

Each font family is stored as an object in [families.json](families.json). Each family has an array of tags.

![image](https://cloud.githubusercontent.com/assets/2180540/17084462/722b9f52-518c-11e6-97bb-b3f710395542.png)

# Help wanted

You can edit [families.json](families.json) to add, edit, or improve tags. I recommend starting by tagging fonts that you often want to find for yourself &mdash; curate your own tag! It's likely that someone else will dig your collection.

You can also click **Need tags** to show all fonts that haven't been tagged yet:

![image](https://cloud.githubusercontent.com/assets/2180540/15269030/612cc00e-19c0-11e6-85c1-24f5fd07f717.png)

# Editing families.json guidelines

[View families.json](families.json)

* Keep the list alphabetical by family name
* Tags are lowercase
* Each font should have no more than 5 tags
* Avoid creating new tags that are similar to already established tags, instead consolidate or rename all similar tags if a different tag name is more intuitive
* Avoid ambiguous names for tags; make the tag name intuitive (Would you use this tag to find font X?)
* The family name must match the Google Font family name exactly

These guidelines are enforced by tests. You can run the tests locally by first running `npm install` from the command line and then `npm test`. Alternatively, you can wait to create a pull request and the tests will run there. 

# Contributing

There are a few different ways to contribute, you can:

1. Edit from Github.com directly
2. Create a pull request
3. Create an issue

## 1. Edit from Github.com directly

Open up [families.json](https://github.com/katydecorah/font-library/blob/gh-pages/families.json) to start editing.

:grey_question: If you're new to Github, I recommend reading: [Editing files in another user's repository](https://help.github.com/articles/editing-files-in-another-user-s-repository/). (And don't worry, you won't break anything!)

## 2. Create a pull request

You can **create a pull request** to edit tags or to add newly added Google fonts.

When creating a pull request, it's helpful to:

* Double check your tags and ask yourself if it's something that you would use to find fonts
* Provide a brief description of the tags you added or changed
* Edit tags in small batches (<20 edits) to help speed up the reviewing process

:grey_question: If you're new to Github, I recommend reading: [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/). 

## 3. Create an issue

You can also create an issue to recommend changes to the library.

:grey_question: If you're new to Github, I recommend reading: [Creating an issue](https://help.github.com/articles/creating-an-issue/) 


💜 Happy tagging! 💜

