# Use Gutenberg block as part of the template.

Every gutenberg block can be read and used as tempalte part in the wordpress.  
You can make simply html out of blocks and use those as part of the template.

##### Example html file

`post-type-post.html`
```js my-template.html
<!-- wp:group {"align":"full","layout":{"inherit":false}} -->
<div class="wp-block-group alignfull">
	<!-- wp:t2/post-link -->
		<!-- wp:t2/featured-image /-->
		<!-- wp:t2/post-title /-->
	<!-- /wp:t2/post-link -->
</div>
<!-- /wp:group -->
```

Here is example `PHP` function that includes the the code and returns the code.

```php
/**
 * Load template file for the rander related.
 * You may want to add the wrapper container with t2-featured-content classes:
 * <div class="t2-featured-content-layout alignwide wp-block-t2-featured-content-layout" ?>...
 *
 * @param string $type type of post.
 * @return string
 */
function get_t2_featured_content_card( string $type = 'post' ) :string  {
	$file = \get_stylesheet_directory() . '/t2/featured-content/post-type-' . $type . '.html';
	if ( file_exists( $file ) ) {
		return do_blocks( \file_get_contents( $file ) ); //phpcs:ignore
	} else {
		\ob_start();
		// The fallback code.
		?>
			<a class="archive-item fallback-block" href="<?php the_permalink(); ?>">
				<h2 class="post-title"><?php the_title(); ?> </h2>
			<a>
		<?php
		return \ob_get_clean();
	}
}
```

Here we are including the file from theme, templates for the T2 featured content. But you can use any place.  

The fallback code is example of usage just plain HTML.

The block used in the post loop will automatically recive context informations like post id etc, so there is no need to do additional trick like passing the vars or something.


#### Extra

Helper auto output function.
```php
/**
 * Helper function to auto output the get_t2_featured_content_card content.
 *
 * @param string $type type of post.
 * @return void
 */
function the_t2_featured_content_card( string $type = 'post' ) :void  {
    echo get_t2_featured_content_card( $type );
}
```

## Default post template.

I'm avare fact that we can use `template` in post type definition, this require to pass array, which can be really pain to create, this method is way faster to do, and to adjust if needed.

Knowing above method we can also create easy templates for new posts.
You just have to use hook `default_content` [Wp Docs](https://developer.wordpress.org/reference/hooks/default_content/) and return the block.

In example below I'm reading template for post type if it exists and if not I'm using the default one.
[Example template](https://github.com/DekodeInteraktiv/avinodegroup/blob/stage/packages/themes/avinodegroup/post-type-template/template-job_opening.html), [PHP Source](https://github.com/DekodeInteraktiv/avinodegroup/blob/stage/packages/themes/avinodegroup/lib/post-types.php#L245)

```php
/**
 * Default post type template
 *
 * @param string   $content Wp content sttring.
 * @param \WP_Post $post WP Post.
 *
 * @return string
 */
function default_content_post_type_gt_template( string $content, \WP_Post $post ) {
	if ( $post ) {
		$file = \get_stylesheet_directory() . '/post-type-template/template-'. $post->post_type . '.html';
		if ( \file_exists( $file ) ) {
			return \file_get_contents( $file );
		}
	}

	return $content;
}
// Assign default content to the post types
add_action( 'default_content', 'default_content_post_type_gt_template', 10, 2 );
