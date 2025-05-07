# Meta Checkbox Control: `LibMetaSelectControl`

[[toc]]
## Params

```js
* @param {String} metaKey* - The meta key to use for the control (Required).
* @param {Object} choices* - The choices for the select control (Required).
* @param {String} label - The label for the control.
* @param {String} help - The help text for the control.
* @param {Boolean} metaValue - The current meta value.
* @param {Function} setMetaValue - Callback to update the meta value (used by HOC).
* @param {Function} onChange - Callback after the meta value has been updated.
* Other props are destructed and passed to the `SelectControl` component.
@link https://wordpress.github.io/gutenberg/?path=/docs/components-experimental-numbercontrol--docs
```

## Example usage:

### PHP

```php
register_post_meta( $post_type_name, 'my_meta_key', array(
	'type'         => 'string',
	'default'      => 'choice',
	'single'       => true,
	'show_in_rest' => true,
) );
```

### Import
```jsx
import { LibMetaSelectControl } from "../../../../../components/meta/index.js"; // or where the file is for you.
```

### Usage - basic

Using array as label and help text.
```jsx
<LibMetaSelectControl
	label={ 'Label' }
	help={ 'Help' }
	metaKey="my_meta_key"
	choices={{
		'foo': 'Choice 1',
		'bar': 'Choice 2',
		'baz': 'Choice 3',
	}}
/>
```

### Nested objects - example

```jsx
<LibMetaSelectControl
	label={ __('Title', 'dekode') }
	help={ __('Description', 'dekode') }
	metaKey="object.foo.bar"
	choices={{
		'foo': 'Choice 1',
		'bar': 'Choice 2',
		'baz': 'Choice 3',
	}}
/>
```