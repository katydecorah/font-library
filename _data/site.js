/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require("child_process");
const process = require("process");

// https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/
const hash = childProcess.execSync("git rev-parse HEAD").toString().trim();

// eslint-disable-next-line no-undef
module.exports = {
  title: "Font Library",
  url: "https://katydecorah.com",
  baseurl: "/font-library",
  description: "An open source project to tag and organize Google Fonts.",
  github: "https://github.com/katydecorah/font-library",
  contributing:
    "https://github.com/katydecorah/font-library/blob/gh-pages/CONTRIBUTING.md",
  env: process.env.ELEVENTY_ENV,
  hash,
};
