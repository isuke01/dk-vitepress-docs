# Meta components

Aim of this components is to provide a simple way to handle meta fields in WordPress without any boilerplate code.

Components support simple post meta and objects using dot notation (e.g. `object.foo.bar`).

Example meta registrations:

```php
register_post_meta( $post_type_name, 'test_toggle_2', array(
		'type'         => 'boolean',
		'default'      => true,
		'single'       => true,
		'show_in_rest' => true,
	) );

	register_post_meta( $post_type_name, 'test_toggle_4', array(
		'type'         => 'boolean',
		'single'       => true,
		'show_in_rest' => true,
	) );

	register_post_meta($post_type_name, 'objects', [
		'single'       => true,
		'type'         => 'object',
		'default'      => [],
		'show_in_rest' => [
			'schema' => [
				'type'       => 'object',
				'properties' => [
					'kek' => [
						'type' => 'boolean',
					],
					'mek' => [
						'type' => 'boolean',
					],
					'foo' => [
						'type' => 'object',
						'properties' => [
							'bar' => [
								'type' => 'boolean',
							],
							'zaga' => [
								'type' => 'boolean',
							],
						],
					],
				],
			],
		],
	]);
```

### Some info

#### Nested objects
If object used it is preffered to pass `defaultValue` value to component as WP does not set nested objects based on schema by default.

!!!NOTE!!!: Always set default object value, as if not wp will set it up with 'null' and any other meta will fail as the object meta can't be null! (ofc unless you save this one first)


Nested objects are not fully tested as I had no time, may be buggy, feel free to contribute.
I did it in spare time one evening ;P

#### Required fields
This is not supported as today, but can be implemented in the future.

#### OnChange etc.
The components are emmiting `onChange` event, in case it is needed for custom logic, but component does save meta by itself, so no need to handle it.

#### Helpers / WithPostMeta
This is a HOC component that is used to pass meta values and setMetaValue function to the component.
As If you would like to copy one of the components and use it in another place, You need to copy helpers too used in the component.


[[toc]]
## TODO:
- [ ] Utilize Custom select for select optionally? https://wordpress.github.io/gutenberg/?path=/docs/components-customselectcontrol--docs
- [ ] Media select
- [ ] File Picker
- [x] Link picker
- [ ] Date picker
- [ ] Time picker
- [ ] Color picker
- [ ] Range picker
- [ ] Rich text editor
- [ ] Text select with multiple attribute
- [ ] Token form Field select
- [ ] Add generic clx to componelts and merge with provided class.
... Other things that I have no time for :)