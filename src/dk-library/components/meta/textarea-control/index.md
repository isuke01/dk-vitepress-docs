# Meta Checkbox Control

[[toc]]
## Params

```js
* @param {String} metaKey* - The meta key to use for the control (Required).
* @param {Boolean} metaValue - The current meta value.
* @param {Function} setMetaValue - Callback to update the meta value (used by HOC).
* @param {Function} onChange - Callback after the meta value has been updated.
* Other props are destructed and passed to the `TextareaControl` component.
@link https://wordpress.github.io/gutenberg/?path=/docs/components-textareacontrol--docs
```

## Example usage:

### PHP

```php
register_post_meta( $post_type_name, 'my_meta_key', array(
	'type'         => 'string',
	'default'      => 'some long text to save/read',
	'single'       => true,
	'show_in_rest' => true,
) );
```

### Import
```jsx
import { LibMetaTextareaControl } from "../../../../../components/meta/index.js"; // or where the file is for you.
```

### Usage - basic

Using array as label and help text.
```jsx
<LibMetaTextareaControl
	label={ 'Label' }
	placeholder={ 'Placeholder' }
	help={ 'Help' }
	metaKey="my_meta_key"
	rows={ 2 }
/>
```


### Nested objects - example

```jsx
<LibMetaTextareaControl
	label={ __('Title', 'dekode') }
	help={ __('Description', 'dekode') }
	metaKey="object.foo.bar"
/>
```