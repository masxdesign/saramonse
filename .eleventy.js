export default function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch CSS for changes
  eleventyConfig.addWatchTarget("./src/styles.css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
