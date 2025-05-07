# Gutenberg component BaseControl

`BaseControl` allows to create a wrapper around a control component, providing a label and an optional help message. It is used to create a consistent look and feel for controls in the Gutenberg editor.

This can be usefully with e.g custom buttons select or other custom controls.

## Example

```jsx
import { BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'gutenberg-examples/example-01-hello-world', {
	title: __( 'Example: BaseControl', 'gutenberg-examples' ),
	icon: 'smiley',
	category: 'widgets',
	edit() {
		const blockProps = useBlockProps();
		const [ text, setText ] = useState( '' );

		return (
			<div { ...blockProps }>
				<BaseControl
					label={ __( 'Text Control', 'gutenberg-examples' ) }
					help={ __( 'This is a help message.', 'gutenberg-examples' ) }
				>
					<TextControl
						value={ text }
						onChange={ ( newText ) => setText( newText ) }
					/>
				</BaseControl>
			</div>
		);
	},
	save() {
		return null;
	},
} );
```