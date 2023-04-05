/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
const childProcess = require("node:child_process");
const process = require("node:process");

// https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/
const hash = childProcess.execSync("git rev-parse HEAD").toString().trim();

// eslint-disable-next-line no-undef
module.exports = {
  title: "Font Library",
  url: "https://fontlibrary.dev",
  description: "An open source project to tag Google Fonts.",
  github: "https://github.com/katydecorah/font-library",
  contributing:
    "https://github.com/katydecorah/font-library/blob/gh-pages/CONTRIBUTING.md",
  env: process.env.ELEVENTY_ENV,
  hash,
};
