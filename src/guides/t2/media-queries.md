---
title: T2 Media queries
date: git Last Modified
---

# T2 Media queries
This was based on the [Original PR](https://github.com/DekodeInteraktiv/T2/pull/4992)
Gol was to match [most used breakpoints](https://github.com/WordPress/gutenberg/blob/d8545b29b5224207546d7b31dbd8502f804f439b/packages/base-styles/_breakpoints.scss#L5) in Gutenberg and WordPress.

[[toc]]

### Since: T2 v8.8.0

With 8.8.2 the file name in `postcss` config was updated, and this one will be used here.
[Orignal Doc T2 Media queries](https://t2.teft.io/packages/utils.html#custom-media)

## Project setup

All project with new `project-base` will have this automatically added to `postcss.config.js` file.
So there is no need.

But if you are using older version, you can add this to your `postcss.config.js` file.
[Project Base postcss Config](https://github.com/DekodeInteraktiv/project-base/blob/main/postcss.config.js)
```js
const postcssGlobalData = require('@csstools/postcss-global-data');

module.exports = (ctx) => {
	const config = {
		plugins: [
			postcssGlobalData({
				files: [path.resolve(`${__dirname}/vendor/t2/utils/src/custom-media.css`)],
			}),
			// ... other config 
		],
	};
	// other config here...

	return config;
};
```

### Usage

## Custom media
Package also provides default T2 aliases as custom media queries (`src/custom-media.css`) based on the most used [Gutenberg breakpoints](https://github.com/WordPress/gutenberg/blob/master/packages/base-styles/_breakpoints.scss). This package uses [custom media queries](https://preset-env.cssdb.org/features#custom-media-queries) PostCSS plugin and expects your setup to support it.

| Name            | Pixel Width | Alias                |
| --------------- | ----------- | -------------------- |
| `mobile`/`tiny` | 480         | `--t2-tiny-and-up`   |
| `small`         | 600         | `--t2-small-and-up`  |
| `medium`        | 782         | `--t2-medium-and-up` |
| `large`         | 960         | `--t2-large-and-up`  |
| `xlarge`        | 1080        | `--t2-xlarge-and-up` |
| `wide`          | 1280        | `--t2-wide-and-up`   |
| `huge`          | 1440        | `--t2-huge-and-up`   |
| `xhuge`         | 1920        | `--t2-xhuge-and-up`  |

### Full list of custom media queries
[Original file](https://github.com/DekodeInteraktiv/T2/blob/main/packages/utils/src/custom-media.css)

```postcss
@custom-media --t2-tiny-and-up (width >= 480px);
@custom-media --t2-tiny-and-down (width < 600px);
@custom-media --t2-tiny-only (width >= 480px) and (width < 600px);

@custom-media --t2-small-and-up (width >= 600px);
@custom-media --t2-small-and-down (width < 782px);
@custom-media --t2-small-only (width >= 600px) and (width < 782px);

@custom-media --t2-medium-and-up (width >= 782px);
@custom-media --t2-medium-and-down (width < 960px);
@custom-media --t2-medium-only (width >= 782px) and (width < 960px);

@custom-media --t2-large-and-up (width >= 960px);
@custom-media --t2-large-and-down (width < 1080px);
@custom-media --t2-large-only (width >= 960px) and (width < 1080px);

@custom-media --t2-xlarge-and-up (width >= 1080px);
@custom-media --t2-xlarge-and-down (width < 1280px);
@custom-media --t2-xlarge-only (width >= 1080px) and (width < 1280px);

@custom-media --t2-wide-and-up (width >= 1280px);
@custom-media --t2-wide-and-down (width < 1440px);
@custom-media --t2-wide-only (width >= 1280px) and (width < 1440px);

@custom-media --t2-huge-and-up (width >= 1440px);
@custom-media --t2-huge-and-down (width < 1920px);
@custom-media --t2-huge-only (width >= 1440px) and (width < 1920px);

@custom-media --t2-xhuge-and-up (width >= 1920px);
```

### Example usage
Use custom media alias in your css file

```css
.some-element {
  color: blue;

  @media (--t2-medium-and-up) {
    color: red;
  }
}
```