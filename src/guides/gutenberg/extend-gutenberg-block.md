---
title: Exteing Gutenberg WP blocks
head:
  - - meta
    - name: description
      content: Exteing Gutenberg WP blocks, Extend the Inspector control.
  - - meta
    - name: keywords
      content: gutenberg extend wordpress inspector controll
---

# {{ $frontmatter.title }}.

This example covers how to extend the WP core parahraph block. 
But this can apply also to not only Core blocks in some way.

[[toc]]


## Extend the Inspector controll.

#### Full code: [Gist](https://gist.github.com/isuke01/ebaebb3c5fc5c4804fdad3982973ba50)
First we want to extend block inspector controll (the block sidebar).
In this case our setting going to be `footnote` prop.

```js inspector-controll.js
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

function InspectorControl({ attributes, setAttributes }) {
	const { footnote } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Extra settings', 'textdomain')}>
				<PanelRow>
					<TextControl
						label={__('Control label', 'textdomain')}
						value={footnote}
						onChange={(value) => 
							setAttributes({ footnote: value })
						}
						help={__('Help text', 'textdomain')}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}
export default InspectorControl;
```

Remember to include our deepends.

```js editor.js
/* eslint-disable import/no-unresolved */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createHigherOrderComponent } from '@wordpress/compose';
// eslint-disable-next-line import/no-extraneous-dependencies
import TokenList from '@wordpress/token-list';

/**
 * Internal dependencies
 */
import InspectorControl from './inspector-controll'; // The file we made above to the extending inspector controller.
```

## Hooking into the saved content.

Here we are adding our new props.
```js editor.js
/**
 * Add extra class, maybe to indicate in backedn that has the footnote?
 */
function addSaveProps(props, blockType, attributes) {
	if (blockType.name !== 'core/paragraph') {
		return props;
	}

	const { footnote } = attributes;

	// Use TokenList to dedupe classes.
	const classes = new TokenList(props.className);
	if (footnote) {
		classes.add('has-footnote');
	}

	props.className = classes?.value || undefined;

	return props;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'core/paragraph/addSaveProps',
	addSaveProps,
);
```
## Filters registered block settings.

Filters registered block settings to expand the block edit wrapper by applying the desired styles and classnames.

```js editor.js
/**
 * Filters registered block settings to expand the block edit wrapper
 * by applying the desired styles and classnames.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addEditProps(settings) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	if (settings.name !== 'core/paragraph') {
		return settings;
	}

	return Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			footnote: { type: 'string' }
		} ),
	} );
}

addFilter(
	'blocks.registerBlockType',
	'core/paragraph/addEditProps',
	addEditProps,
);
```

## Override default inspector controll

Here we are overriding the default Inspector Controlls with the new one we created.

```js editor.js
/**
 * Override the default edit UI to include new inspector controls for
 * all the custom styles configs.
 *
 * @param {Function} BlockEdit Original component.
 * @return {Function} Wrapped component.
 */
export const withInspectorControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { name: blockName, isSelected } = props;
		// eslint-disable-next-line prettier/prettier
		const canShowControll = 'core/paragraph' === blockName && isSelected;

		return (
			<>
				{canShowControll && <InspectorControl {...props} />}
				<BlockEdit {...props} />
			</>
		);
	},
	'withToolbarControls',
);

addFilter(
	'editor.BlockEdit',
	'core/paragraph/with-block-controls',
	withInspectorControls,
);
```

## Extend render block.

 - Here we are hooking into PHP render output. You can also hook into JS save function. But at this point I'm not doing this here.

```php functions.php
// override tempalte becasue I have no idea how to do it in the block editor hooks :D
add_filter( 'render_block', __NAMESPACE__ . '\\override_core_paragraph', 10, 2 );

function override_core_paragraph( string $block_content, array $block ) {
	if ( $block['blockName'] === 'core/paragraph' ) :
		// update the $block_content here
		 if( isset( $block['attrs']['footnote'] ) ) {
			// do something
			$original_content = $block_content;
			$block_content = '<div>';
         	$block_content .= $original_content;
			$block_content .= '<em>' . $block['attrs']['footnote'] . '</em>';
			$block_content .= '</div>';
		 }
	endif;

	return $block_content;
}
```