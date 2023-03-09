module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.on("afterBuild", () => {
    return esbuild.build({
      stdin: { contents: "" },
      inject: glob.sync("components/*.ts"),
      bundle: true,
      outfile: "_site/js/bundle.js",
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: true,
    });
  });
  eleventyConfig.addWatchTarget("./js/");

  return {
    dir: {
      input: "./",
      output: "./_site",
    },
    passthroughFileCopy: true,
    pathPrefix: "/font-library/",
  };
};
