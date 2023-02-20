# Link list

T2 Default [DOCS](https://t2.teft.io/blocks/link-list/)

## Properties - t2.json
The module can be customized using t2.json file.

```js t2.js
	"t2/link-list": {
		"features": {
			/**
			* Disalbe or enable description
			* @default true
			* @type {Boool}
			*/
			"hasDescription": false
		},
		"layout": {
			"icons" : {
				/**
				* Icon used for external link. The icon need to be registered as a T2 icon.
				* @default linkExternal
				* @type {String} T2 icon
				*/
				"external": "linkExternal"

				/**
				* The icon need to be registered as a T2 icon
				* @default linkExternal
				* @type {String} T2 icon
				*/
				"link": "arrowForward"
			},

			/**
			* Icon position. Choose between left or right
			* @default left
			* @type {String}
			*/
			"iconPosition": "left"

		}
	}
```


## Style properties

```
--t2-link-list-typography-text-font-size
Theme.json: wp.custom.t2-link-list.typography.text-font-size
Default: 1.125rem
Link text font weight
```

```
--t2-link-list-typography-text-font-weight
Theme.json: wp.custom.t2-link-list.typography.text-font-weight
Default: 700
Link description font size
```

```
--t2-link-list-typography-description-font-size
Theme.json: wp.custom.t2-link-list.typography.description-font-size
Default: 1rem
Item margin
```

```
--t2-link-list-spacing-item-margin
Theme.json: wp.custom.t2-link-list.spacing.item-margin
Default: 0
```