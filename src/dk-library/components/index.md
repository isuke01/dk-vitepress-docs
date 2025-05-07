# Dekode library components

There is known gotcha, when you import component that uses e.g @worpdress/icons and you'r block does not have it as a dependency, you will get an error during build. To avoid this, you need to add this dependency to block's packades.

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
