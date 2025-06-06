# Server side rendered blocks (Since WP 5.5)

If we have block that is not interactive with user, we can just use php rendered bloock.

[[toc]]

## Example: Single meta block
Simple [example JS](https://github.com/DekodeInteraktiv/innovativeanskaffelser/blob/e02fecb0e1facd2a494043a9ce0dda53b5972631/packages/themes/innovative-anskaffelser/src/js/blocks/block-partials.js#L11)

NOTE: In this case I'm using `urlQueryArgs` to pass the post id to the block because block going to be used inside WP Loop.
SSR Blocks are async loaded and default post_id is passed from currently edited post; Check the [Dev's notes](#dev-notoes)

Register edit view.

```js block.js
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ia/single-meta', {
	edit: ({coontext}) => {
		return <ServerSideRender urlQueryArgs={ {post_id : context.postId} } block="ia/single-meta" />;
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

Render callback, [Example](https://github.com/DekodeInteraktiv/innovativeanskaffelser/blob/e02fecb0e1facd2a494043a9ce0dda53b5972631/packages/themes/innovative-anskaffelser/inc/block-partials.php#L72)
```php
/**
 * Render callback for the block
 *
 * @param array     $attributes Block attributes.
 * @param string    $content    Block content.
 * @param \WP_Block $block      Block instance.
 */
function render_single_meta_block( array $attributes, string $content, \WP_Block $block ): string {
if ( ! ( isset( $block->context['postId'] ) || isset( $attributes['post_id'] ) ) || ! function_exists( 'get_field' ) ) {
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
		<!-- wp:ia/single-meta {"my_meta_key":"data_hero"} /-->
		<!-- wp:t2/post-title /-->
	<!-- /wp:t2/post-link -->
<!-- /wp:group -->
```

## Dev notoes.

There are some [issues/40714](https://github.com/WordPress/gutenberg/issues/40714).
In the Editor is uses async load the block and Gutenberg is passing post_Id of currently edited post.

So if we want to use the `<ServerSideRender>` component as inner component of queried post e.g in `T2 post card`. The `post_Id` in the editor will point currently edited page, but on the frontend going to be correct.

There are two ways how we can solve this issue in case you would like to do something else if one method does work.

### First method: override default query agrs.
As above we can just override context args. [WpDocs](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/#urlqueryargs)

In this case we just oveerride default query args passed in the Gutenberg SSR component context. 

```js block.js
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ia/single-meta', {
	edit: ({coontext}) => {
		return <ServerSideRender urlQueryArgs={ {post_id : context.postId} } block="ia/single-meta" />;
	},
});
```

### Second method: apply the `post_id` attribute to the block manually.

```js
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ia/meta-image', {
	edit: ({ context, attributes }) => {
		return <ServerSideRender  attributes={{ ...attributes, post_id: context.postId }} block="ia/meta-image"  />
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

### How to avoid "Rendered as empty response"

You can add simply
```JS
<ServerSideRender
	...OtherProps
	EmptyResponsePlaceholder={() => <></>}
/>
```

### SSR component preloader

By default during the backend block load there is displayed defaut spinner. 
But we actually can make some nicer preloader bone template.

[WpDocs](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/#loadingresponseplaceholder)


Example card prloader code

#### Usage in the SSR 

The usage in core component is simple as that. 
```js
<ServerSideRender
	LoadingResponsePlaceholder={SkeletonPostCard}
	block={'t2/featured-single-post'}
	attributes = { {
		postId: post.id,
		postType: post.type,
	} }
/>
```

The `SkeletonPostCard` is a custom component that will be used as a preloader.
Here is an exmample code.
```js
const SkeletonPostCard = () => {
	return (
		<div
			className="skeleton-post-card"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '12px',
				padding: '16px',
				border: '1px solid #ddd',
				borderRadius: '8px',
				background: '#fff',
				maxWidth: '400px',
			}}
		>
			<div
				className="skeleton-thumbnail"
				style={{
					width: '100%',
					height: '180px',
					backgroundColor: '#e0e0e0',
					borderRadius: '6px',
					position: 'relative',
					overflow: 'hidden',
				}}
			></div>

			<div
				className="skeleton-title"
				style={{
					height: '20px',
					width: '70%',
					backgroundColor: '#e0e0e0',
					borderRadius: '4px',
					position: 'relative',
					overflow: 'hidden',
				}}
			></div>

			<div
				className="skeleton-excerpt"
				style={{
					height: '14px',
					width: '90%',
					backgroundColor: '#e0e0e0',
					borderRadius: '4px',
					position: 'relative',
					overflow: 'hidden',
				}}
			></div>

			<div
				className="skeleton-meta"
				style={{
					display: 'flex',
					gap: '12px',
					marginTop: '8px',
				}}
			>
				<div
					style={{
						height: '12px',
						width: '60px',
						backgroundColor: '#e0e0e0',
						borderRadius: '4px',
						position: 'relative',
						overflow: 'hidden',
					}}
				></div>
				<div
					style={{
						height: '12px',
						width: '80px',
						backgroundColor: '#e0e0e0',
						borderRadius: '4px',
						position: 'relative',
						overflow: 'hidden',
					}}
				></div>
			</div>

			<style>
				{`
					.skeleton-post-card div {
						animation: skeleton-pulse 1.5s ease-in-out infinite;
						background-image: linear-gradient(90deg, #e0e0e0 0px, #f0f0f0 40%, #e0e0e0 80%);
						background-size: 200% 100%;
					}

					@keyframes skeleton-pulse {
						0% {
							background-position: 0% 0%;
						}
						100% {
							background-position: -200% 0%;
						}
					}
				`}
			</style>
		</div>
	);
};

export default SkeletonPostCard;
```