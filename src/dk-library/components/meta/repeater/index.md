# MetaRepeater

This is based on custom RepeaterField component. This is just to avoid repeating edit meta logic each time.

To more details see the `RepeaterField` component documentation [here](./../../components/repeater/readme.md).

For this block inner elements please use normal components like `TextControl`, `TextareaControl`, etc, not the meta components like `MetaTextControl`, `MetaTextareaControl`, as the repeater will handle the meta logic for you.

[[toc]]
## Example meta schema registration

```php
'test_drive_form' => [
	'single'       => true,
	'type'         => 'array',
	'default'      => [],
	'show_in_rest' => [
		'schema' => [
			'type'  => 'array',
			'items' => [
				'type'       => 'object',
				'properties' => [
					'location'  => [
						'type' => 'string',
					],
					'address'   => [
						'type' => 'string',
					],
					'link_text' => [
						'type' => 'string',
					],
				],
			],
		],
	],
],
```
