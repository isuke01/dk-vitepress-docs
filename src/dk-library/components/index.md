# Dekode library components
To work with this locally, you should run npm install from components directory. As the blocks may fail to load if the dependencies are not installed.

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
