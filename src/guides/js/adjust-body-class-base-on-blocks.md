# Simple guide to adjust body class based on blocks


## Example how to first add block name to body class

In this example we add the first block name to the body class. This is useful if you want to style the page based on the first block used in the content.

Also We add a class to the body based on the `useDarkTheme` attribute of the `dekode-library/hero-lx` block.
```php
/**
 * Adjust body classes.
 *
 * @package Litex
 * @since 1.0.0
 */

declare( strict_types = 1 );
namespace Litex\BodyClassSetup;

defined( 'ABSPATH' ) || exit;

\add_filter( 'body_class', __NAMESPACE__ . '\\add_body_class_based_on_first_block' );

/**
 * Add a body class based on the first block in the post content.
 *
 * @param array $classes Existing body classes.
 * @return array Updated body classes.
 */
function add_body_class_based_on_first_block( array $classes ) {
	if ( ! is_singular() ) {
		return $classes;
	}

	global $post;

	if ( ! $post instanceof \WP_Post ) {
		return $classes;
	}

	$blocks = \parse_blocks( $post->post_content );

	if ( empty( $blocks ) || ! isset( $blocks[0]['blockName'] ) ) {
		return $classes;
	}

	$first_block = $blocks[0];

	if ( $first_block ) {
		$sanitized = sanitize_title_with_dashes( str_replace( '/', '-', $first_block['blockName'] ) );
		$classes[] = 'first-block-is-' . $sanitized;
	}

	if ( 'dekode-library/hero-lx' === $first_block['blockName'] ) {
		if ( ! empty( $first_block['attrs']['useDarkTheme'] ) && true === $first_block['attrs']['useDarkTheme'] ) {
			$classes[] = 'hero-dark-theme';
		} else {
			$classes[] = 'hero-light-theme';
		}
	}

	return $classes;
}
```
