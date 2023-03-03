module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: "./",
      output: "./_site",
    },
    passthroughFileCopy: true,
    pathPrefix: "/font-library/",
  };
};
