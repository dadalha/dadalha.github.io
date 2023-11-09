module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addWatchTarget("src/css");

  eleventyConfig.addCollection("books", (collection) => {
    return collection.getFilteredByGlob("src/books/*.md");
  });

  eleventyConfig.addCollection("shorts", (collection) => {
    return collection.getFilteredByGlob("src/shorts/*.md");
  });

  eleventyConfig.addShortcode("year", () => {
    return `${new Date().getFullYear()}`;
  });

  ["empire-of-ink", "pawns-of-god", "summoned-as-error-46"].forEach((tag) => {
    eleventyConfig.addCollection(tag, (collection) => {
      return collection.getFilteredByTag(tag);
    });
  });

  eleventyConfig.addFilter("sortedChapters", function (array) {
    return array.slice(0).sort((lhs, rhs) => lhs.data.num < rhs.data.num);
  });

  eleventyConfig.addFilter("matchBook", function (array, tag) {
    var data = array.filter((e) => e.data.chapters == tag);
    if (data) return data[0];
    return null;
  });

  eleventyConfig.addFilter("next", function (array, chapter) {
    var data = array.filter((e) => e.data.num == chapter + 1);
    if (data) return data[0];
    return null;
  });

  eleventyConfig.addFilter("prev", function (array, chapter) {
    var data = array.filter((e) => e.data.num == chapter - 1);
    if (data) return data[0];
    return null;
  });
  
  eleventyConfig.addFilter("match", function (array, chapter) {
    var data = array.filter((e) => e.data.num == chapter);
    if (data) return data[0];
    return null;
  });

  eleventyConfig.addFilter("numbered", function (chapter) {
    if (chapter.data.noNumbering) {
      return chapter.data.title;
    }

    var prefix = chapter.data.num;
    if (chapter.data.fullNumbering) {
      prefix = "Chapter " + prefix + ": ";
    } else {
      prefix = prefix + ". ";
    }
    return prefix + chapter.data.title;
  });

  eleventyConfig.addFilter("var", function (name) {
    const snakeToCamel = (str) =>
      str.toLowerCase().replace(/([-_][a-z|0-9])/g, (group) =>
        group
          .toUpperCase()
          .replace("-", "")
          .replace("_", ""));
    return snakeToCamel(name);
  });

  eleventyConfig.addNunjucksGlobal("context", function () {
    return { data: this.ctx };
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
