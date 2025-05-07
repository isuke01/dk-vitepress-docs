# Featured Cards Loop

![Screenshot](./screenshot.png)
Overrides the query loop block to work with T2 while also removing clutter. Supports multiple post types. Customizable through library.json.

[[toc]]

## 💡 Install via Composer:
```bash
composer require dekode-library/featured-cards-loop:2.0.0
```

## Customizing the block
This block can be customized using the `library.json` file. The following options are available:
- `__experimentalMultiplePostTypes` (bool): Whether to allow multiple post types. Default: `false`.
- `template` (array): The innerblocks template.
- `allowedControls` (array): The allowed controls for the block.
- `defaultQuery` (array): The default query for the block.
- `defaultVariationTitle` (string): The title that will be outputted for the block.
- `defaultVariationDescription` (string): The description that will be outputted for the block.
- `allowedColumns` (array): The allowed columns for the block.

Example:
```json
{
	"__experimentalMultiplePostTypes": true,
	"template": [
		[
			"core/post-template",
			{
				"lock": {
					"move": true,
					"delete": true
				},
				"align": "full"
			},
			[["t2/featured-template-post"]]
		],
		[
			"core/query-pagination",
			{
				"lock": {
					"move": true,
					"delete": true
				},
				"align": "center",
				"layout": {
					"type": "flex",
					"justifyContent": "center",
					"flexWrap": "wrap"
				}
			},
			[
				[
					"core/query-pagination-previous",
					{ 
						"label": "<",
						"lock": {
							"move": true,
							"delete": true
						}
					}
				],
				[
					"core/query-pagination-numbers",
					{
						"lock": {
							"move": true,
							"delete": true
						}
					}
				],
				[
					"core/query-pagination-next",
					{
						"label": ">",
						"lock": {
							"move": true,
							"delete": true
						}
					}
				]
			]
		]
	],
	"allowedControls": ["columns", "queryControls"],

	"defaultVariationTitle": "Featured Cards Loop",
	"defaultVariationDescription": "Display a loop of featured cards.",
	"allowedColumns": [3, 4, 6, 12]
}
```
