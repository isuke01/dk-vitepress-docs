# Dekode library components

If you'r component uses extra dependencies, it should be included in the `package.json` file of the components directory. This way, the dependencies will be available when the component is used in a block.

[[toc]]
## Webpack auto import

You can use `@components` to alias components directory. This is done in `webpack.config.js` file. You can use it like this:

```js
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const scriptConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...scriptConfig,
	resolve: {
		...scriptConfig.resolve,
		alias: {
			...scriptConfig.resolve?.alias,
			'@components': path.resolve(__dirname, '../../components/'),
		},
	},
	// Other config.
};
```

You can check `basic-carousel` block's webpack.config.js file for full example.

### Example usage

When you have added the alias, you can use it like this:

```js
import { AppenderButton } from '@components/appenders';
```
