# Server side rendered blocks (Since WP 5.5)

If we have block that is not interactive with user, we can just use php. [Examples](https://github.com/DekodeInteraktiv/norsk-takst/blob/d4901fac15208ba4bb5332265a55f181767cdd09/packages/themes/norsktakst-theme/inc/block-partials.php#L24)

Simple example:

Register edit view.
```js block.js
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ia/single-meta', {
	edit: () => {
		return <ServerSideRender block="ia/single-meta" />;
	},
});
```

PHP register block (In this example I'm using PHP register)
```php
add_action( 'init', __NAMESPACE__ . '\\register_single_meta_block' );
/**
 * Outputs single meta text
 *
 * @return void
 */
function register_single_meta_block(): void {
	\register_block_type( 'ia/single-meta', [
		'title'           => 'Single meta',
		'supports'        => [
			'inserter' => false, # Does not allow to insert this block in the editor.
		],
		'render_callback' => __NAMESPACE__ . '\\render_single_meta_block',
		'uses_context'    => [ 'postId', 'postType' ],
		'attributes'      => [
			'meta_key' => [
				'default' => 'my_meta_key',
				'type'    => 'string',
			],
		],
	] );
}
```

Render callback
```php
/**
 * Render callback for the block
 *
 * @param array     $attributes Block attributes.
 * @param string    $content    Block content.
 * @param \WP_Block $block      Block instance.
 */
function render_single_meta_block( array $attributes, string $content, \WP_Block $block ): string {
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$post_ID  = (int) $block->context['postId'];
	$meta_key = $attributes['meta_key'] ?: 'my_meta_key';

	$wrapper_attributes = \get_block_wrapper_attributes( [ 'class' => 'my-class' ] );

	\ob_start();
	?>
	<div <?php echo $wrapper_attributes; /* phpcs:ignore */ ?>
		# My PHP BLOCK_RENDER my meta ...
	<?php
	return \ob_get_clean();
}
```

Usage in e.g post-type-post.html
```js post-type-post.html
<!-- wp:group {"align":"full","layout":{"inherit":false}} -->
	<!-- wp:t2/post-link -->
		<!-- wp:ia/single-meta /-->
		<!-- wp:t2/post-title /-->
	<!-- /wp:t2/post-link -->
<!-- /wp:group -->
```

## Known issue, tested on WP 6.1.1

If the block don't have to be interactive you can use [@wordpress/server-side-render](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/).But there are some [issues/40714](https://github.com/WordPress/gutenberg/issues/40714).   
In the Editor is uses async load the block and Gutenberg is passing post_Id of currently edited post.

So if we want to use the `<ServerSideRender>` component as inner component of queried post e.g in T2 post card. The `post_Id` in the editor will show currently edited page, but on the frontend going to be correct.

- So in above exampe you bug where the `post_id` is incorrect.


#### Workaround.

Lucky there is workaround!

Inject custom varible into attribute that come from correct context (here the context is correct).
```js
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ia/meta-image', {
	edit: ({ context }) => {
		return <ServerSideRender  attributes={{ post_id: context.postId }} block="ia/meta-image"  />
	},
});
```

PHP register will be updated new attribute
```php
/**
 * Outputs single meta text
 *
 * @return void
 */
function register_single_meta_block(): void {
	\register_block_type( 'ia/single-meta', [
		'title'           => 'Single meta',
		'supports'        => [
			'inserter' => false, # Does not allow to insert this block in the editor.
		],
		'render_callback' => __NAMESPACE__ . '\\render_single_meta_block',
		'uses_context'    => [ 'postId', 'postType' ],
		'attributes'      => [
			'post_id' => [ # new one.
				'type'    => 'number',
			],
			'meta_key' => [
				'default' => 'my_meta_key',
				'type'    => 'string',
			],
		],
	] );
}
```

And simple update for the render callback
```php
/**
 * Render callback for the block
 *
 * @param array     $attributes Block attributes.
 * @param string    $content    Block content.
 * @param \WP_Block $block      Block instance.
 */
function render_single_meta_block( array $attributes, string $content, \WP_Block $block ): string {
	if ( ! ( isset( $block->context['postId'] ) || isset( $attributes['post_id'] ) ) ) {
		return '';
	}
	# IF the post  id come from our custom attribute just set it as the current post ID.
	# On the frontend the context is correct and attributes post_id going to be empty.
	$post_ID  = (int) $attributes['post_id'] ?: (int) $block->context['postId'];
	
	$meta_key = $attributes['meta_key'] ?: 'my_meta_key';

	$wrapper_attributes = \get_block_wrapper_attributes( [ 'class' => 'my-class' ] );

	\ob_start();
	?>
	<div <?php echo $wrapper_attributes; /* phpcs:ignore */ ?>
		# My PHP BLOCK_RENDER my meta ...
	<?php
	return \ob_get_clean();
}
```