# Featured content layout
The T2 [docs](https://t2.teft.io/blocks/featured-content/)
This one is pretty well made so no need for re-writing everything.

## Add custom post types for the picker.

The postType must be `show_in_rest` and `publicly_queryable` `true` in the register post type function.
Just like: 

```php
$args = [
	... otherCtpArgs,
	'show_in_rest'       => true,
	'publicly_queryable' => true,
]
register_post_type( 'my-ctp', $args );
```

### What if I can't access the post type args to modifiy?

You can simply use WP hook to hook into post type create hook
Keep in mind you many need higher priority to override register_post_type function call.
Example:

```php
add_filter( 'register_post_type_args', 'my_custom_args', 10, 2 );
function my_custom_args( array $args, string $post_type ) : array {
	// Let's make sure that we're customizing the post type we really need.
	if ( $post_type !== 'service' ) {
		return $args;
	}

	$extra_args = [
		'show_in_rest'       => true,
		'publicly_queryable' => true,
	]

	return $args + $extra_args
}
```

## Override template for the featured single post block.

- First you need to create two directoreis inside the theme directory
- `t2` and inside `featured-content`
- Create file `post-type-{crt_slug}.html`