# Meta Checkbox Control

[[toc]]
## Params

```js
* @param {String} metaKey* - The meta key to use for the control (Required).
* @param {Boolean} metaValue - The current meta value.
* @param {Function} setMetaValue - Callback to update the meta value (used by HOC).
* @param {Function} onChange - Callback after the meta value has been updated.
* Other props are destructed and passed to the `NumberControl` component.
@link https://wordpress.github.io/gutenberg/?path=/docs/components-experimental-numbercontrol--docs
```

## Example usage:

### PHP

```php
register_post_meta( $post_type_name, 'my_meta_key', array(
	'type'         => 'number',
	'default'      => 2,
	'single'       => true,
	'show_in_rest' => true,
) );
```

### Import
```jsx
import { LibMetaNumberControl } from "../../../../../components/meta/index.js"; // or where the file is for you.
```

### Usage - basic

Using array as label and help text.
```jsx
<LibMetaNumberControl
	label={ 'Label' }
	help={ 'Help' }
	metaKey="my_meta_key"
/>
```


### Nested objects - example

```jsx
<LibMetaNumberControl
	label={ __('Title', 'dekode') }
	help={ __('Description', 'dekode') }
	metaKey="object.foo.bar"
/>
```