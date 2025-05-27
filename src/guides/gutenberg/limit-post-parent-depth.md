# Limit post parent depth selector

Since Gutenberg it is not straight forward to limit deptg of post parent selector.
Here is a solution that works with the current Gutenberg version.

## Limit Gutenberg

```php
/**
 * Filter the REST API query for 'veileder' post type to only return top-level posts.
 * This is to limit Gutenberg's block editor to only show top-level 'veileder' posts.
 */
add_filter( 'rest_veileder_query', __NAMESPACE__ . '\\adjust_rest_veileder_query', 10, 2 );

/**
 * Adjust the REST API query for 'veileder' post type to only return top-level posts.
 *
 * @param array $args    The query arguments.
 * @param \WP_REST_Request $request The REST request object.
 * @return array Modified query arguments.
 */
function adjust_rest_veileder_query( array $args, \WP_REST_Request $request ) {
	$args['post_parent'] = 0; // Only return top-level posts.
	return $args;
}

add_filter( 'rest_veileder_collection_params', function( $params ) {
	$params['post_parent'] = [
		'description' => __( 'ID of the parent post.', 'wp_seniorpolitikk' ),
		'type'        => 'absint',
		'default'     => 0,
	];
	return $params;
});

add_filter('quick_edit_dropdown_pages_args', __NAMESPACE__ . '\\filter_quick_edit_parent_pages');
```

## Limit quick edit

```php
add_filter('quick_edit_dropdown_pages_args', __NAMESPACE__ . '\\filter_quick_edit_parent_pages');

/**
 * Filter the quick edit dropdown for parent pages to only show top-level 'veileder' posts.
 *
 * @param array $dropdown_args Arguments for the dropdown.
 * @return array Filtered dropdown arguments.
 */
function filter_quick_edit_parent_pages( $dropdown_args ) {
	$current_screen = get_current_screen();
	if ( 'veileder' == $current_screen->post_type ) {
		$dropdown_args['parent'] = 0;
	}

	return $dropdown_args;
}
```