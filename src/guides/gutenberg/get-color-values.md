# Get color values from block's Background and Gradient

[[toc]]

When you want to get color value from block's background or gradient, this is a bit tricky as it returns a slug and not a color value. The slug is used to get the color value from the global settings.

And if you want to make sure to support theme.json, core styles, and custom styles, it gets a bit more complicated.

Here are PHP and JS function that does it and renders correct class names.

## PHP

As the colors picked by color picker are returned as a slug and not a color value, there is an function to get the color value by the slug.

```php
/**
 * Helper function to get color value by slug.
 *
 * @param string $slug   The slug of the gradient.
 * @param array  $colors The array of colors.
 * @param string $key    The key to retrieve.
 *
 * @return string The color value or an empty string if not found.
 */
function get_colors_value_by_slug( $slug, $colors, $key = 'color' ) {
	foreach ( $colors as $gradient ) {
		if ( isset( $gradient['slug'] ) && $gradient['slug'] === $slug ) {
			return $gradient[ $key ] ?? '';
		}
	}

	return '';
}
```

This functions return block's background color or gradient color value as one can be set at the same time as an background color. But it is stored differently in the block attributes.

```php
/**
 * Get block background styles value.
 *
 * @return string The block background styles.
 */
function get_block_background_value() {
	$block = \WP_Block_Supports::$block_to_render;

	if ( ! $block || ! isset( $block['attrs'] ) ) {
		return '';
	}

	$block_attributes = $block['attrs'];

	// Custom background color.
	if ( isset( $block_attributes['style']['color']['background'] ) ) {
		return $block_attributes['style']['color']['background'] ?? '';
	}

	// Custom gradient color.
	if ( isset( $block_attributes['style']['color']['gradient'] ) ) {
		return $block_attributes['style']['color']['gradient'] ?? '';
	}

	// If the gradient attribute is set.
	if ( isset( $block_attributes['gradient'] ) ) {
		$gradients_data = \wp_get_global_settings( [ 'color', 'gradients' ] );
		$gradients      = array_merge(
			$gradients_data['theme'] ?? [],
			$gradients_data['default'] ?? [],
			$gradients_data['custom'] ?? []
		);

		return get_colors_value_by_slug( $block_attributes['gradient'], $gradients, 'gradient' );
	}

	// If the backgroundColor attribute is set.
	if ( isset( $block_attributes['backgroundColor'] ) ) {
		$palette_data = \wp_get_global_settings( [ 'color', 'palette' ] );
		$palette      = array_merge(
			$palette_data['theme'] ?? [],
			$palette_data['default'] ?? [],
			$palette_data['custom'] ?? []
		);

		return get_colors_value_by_slug( $block_attributes['backgroundColor'], $palette );
	}

	return '';
}
```

Example usage in a block:
[T2 Story chapter](https://github.com/DekodeInteraktiv/T2/blob/a3e8c3b1144e7750107f67eb8361bff2bb39d602/packages/extension-library/src/story/block-library/chapter/block.php#L51)

```php
	$background_color = get_block_background_value();
	$style            = '';
	if ( ! empty( $background_color ) ) {
		$style = '--t2-story-chapter-background:' . $background_color . ';';
	}
```

## JS

```js
import {
	getColorObjectByAttributeValues,
	getGradientValueBySlug,
	useSettings,
} from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

/**
 * Custom hook to get the selected background value.
 * It returns the background value if it's a color or gradient.
 * Should be called inside a React component.
 *
 * @param {Object} attributes                        Block attributes.
 * @param {string} attributes.backgroundColor        Background color.
 * @param {Object} attributes.style                  Block style.
 * @param {Object} attributes.style.color            Block color style.
 * @param {string} attributes.style.color.background Background color.
 * @param {string} attributes.style.color.gradient   Background gradient.
 * @param {string} attributes.gradient               Background gradient.
 * @return {string} Selected background
 */
export function useSelectedBackgroundValue({
	backgroundColor,
	style: {
		color: {
			background: customBackgroundColor,
			gradient: customGradient,
		} = {},
	} = {},
	gradient,
}) {
	const [userGradients, themeGradients, defaultGradients] = useSettings(
		'color.gradients.custom',
		'color.gradients.theme',
		'color.gradients.default'
	);

	const editorGradients = useMemo(
		() => [
			...(userGradients || []),
			...(themeGradients || []),
			...(defaultGradients || []),
		],
		[userGradients, themeGradients, defaultGradients]
	);

	const [userPalette, themePalette, defaultPalette] = useSettings(
		'color.palette.custom',
		'color.palette.theme',
		'color.palette.default'
	);

	const editorColors = useMemo(
		() => [
			...(userPalette || []),
			...(themePalette || []),
			...(defaultPalette || []),
		],
		[userPalette, themePalette, defaultPalette]
	);

	const selectedBackground = useMemo(() => {
		try {
			if (backgroundColor) {
				const colorObject = getColorObjectByAttributeValues(
					editorColors,
					backgroundColor
				);

				if (colorObject?.color) {
					return colorObject.color;
				}
			}

			if (customBackgroundColor) {
				return customBackgroundColor;
			}

			if (gradient) {
				const gradientValue = getGradientValueBySlug(
					editorGradients,
					gradient
				);

				if (gradientValue) {
					return gradientValue;
				}
			}

			if (customGradient) {
				return customGradient;
			}
		} catch (error) {
			return '';
		}

		return '';
	}, [
		backgroundColor,
		customBackgroundColor,
		customGradient,
		gradient,
		editorColors,
		editorGradients,
	]);

	return selectedBackground;
}
```

Example usage in a block: [T2 Story chapter](https://github.com/DekodeInteraktiv/T2/blob/a3e8c3b1144e7750107f67eb8361bff2bb39d602/packages/extension-library/src/story/block-library/chapter/edit.js#L39)

```js
	const background = useSelectedBackgroundValue(attributes);

	if (mediaFull && background) {
		blockProps.style = {
			'--t2-story-chapter-background': background,
		};
	}
```