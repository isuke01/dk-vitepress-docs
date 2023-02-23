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