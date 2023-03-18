module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy('src/css');
	eleventyConfig.addWatchTarget('src/css');

	eleventyConfig.addCollection('books', (collection) => {
		return collection.getFilteredByGlob('src/books/*.md');
	});
	
	eleventyConfig.addCollection('shorts', (collection) => {
		return collection.getFilteredByGlob('src/shorts/*.md');
	});

	eleventyConfig.addShortcode('year', () => {
		return `${new Date().getFullYear()}`;
	});

	return {
		dir: {
			input: 'src',
			output: 'public',
		},
	};
};
