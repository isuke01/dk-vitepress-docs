# Card Template

![Screenshot](./screenshot.png)
A simple card wrapper that allow to add custom content inside a card.
The idea is to simplify the process of creating a card block with a predefined layout.

By default, the block block does not have any styling.

[[toc]]

## 💡 Install via Composer:
```bash
composer require dekode-library/card-template:1.1.2
```

## Usage
The blocks allow you to generate variations from the library.json file.
See the example below and comments.

### Example library.json
```json
{
	"dekode-library/card-template": {
		"allowedInnerBlocks": ["core/paragraph"],
		"template": [["core/paragraph", {}]],
		"allowCardLink": true, // Allow the card to be linked.
		"variations": [
			{
				"name": "video-card",
				"title": "Video template Card",
				"icon": "media-video",
				"description": "A video media card.",
				"attributes": {
					"providerNameSlug": "post-video-variations", // Used for setting up correct variation as active.
					"templateLoock": "all",
					"allowedInnerBlocks": ["core/embed"], // Allowed inner blocks for the variation.
					"template": [["core/embed", {}]], // Template used in the variation.
					"allowCardLink": false,
					"patterns": [
						"^https?://(www.)?youtube.com/watch.*"
					]
				}
			},
			{
				"name": "post-card",
				"title": "Post Card",
				"icon": "format-gallery",
				"description": "A card block for displaying a post.",
				"attributes": {
					"providerNameSlug": "post-card-variations",
					"allowedInnerBlocks": ["core/paragraph"],
					"template": [["core/paragraph", {}]]
				}
			}
		]
	}
}
```

`providerNameSlug` In variation is also used for generating class inside the block in case you need to style it differently.
If not provided the `name` will used instead, but the class will not be created.

You can always generate a new variation standard way if the json is not enough - in case of more complex patterns or other needs.

### Potential upgrades:

- Force layout for the card. We could make function that disallow user to remove/edit structure of the card optionally.
- If user remove all innter block maybe add better placeholder. (e.g like group block)
- If paragraph or image or any inner block is an link, and card is linked it will break the card. Potential fix is to remove link from any inner block if card is linked.