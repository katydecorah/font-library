const esbuild = require("esbuild");
const glob = require("glob");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  eleventyConfig.on("afterBuild", () => {
    return esbuild.build({
      stdin: { contents: "" },
      inject: glob.sync("components/*.ts"),
      bundle: true,
      outfile: "_site/js/bundle.js",
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: true,
      loader: { ".svg": "text" },
    });
  });
  eleventyConfig.addWatchTarget("./components/");

  return {
    dir: {
      input: "./",
      output: "./_site",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "md", "liquid"],
  };
};
