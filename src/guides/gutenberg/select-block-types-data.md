# Block Types Data

[[toc]]


Those methods allows you to get valuable information about the block and it's variations,types etc and so on.

Full docs can be found [here](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-blocks/).

## getBlockVariations

`getBlockVariations` is a method that returns all the variations of a block type. It takes a block name as an argument and returns an array of variations for that block.

Can be usefully to render custom list of block variations in the editor or use custom methods to render them.

```js
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const socialLinkVariations = useSelect(
        ( select ) =>
            select( blocksStore ).getBlockVariations( 'core/social-link' ),
        []
    );

    return (
        <ul>
            { socialLinkVariations &&
                socialLinkVariations.map( ( variation ) => (
                    <li key={ variation.name }>{ variation.title }</li>
                ) ) }
        </ul>
    );
};
```

## getBlockStyles

`getBlockStyles` is a method that returns all the styles of a block type. It takes a block name as an argument and returns an array of styles for that block.

Usefully when building e.g custom button and you want to render all the styles of the button block.

```js
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const buttonBlockStyles = useSelect(
        ( select ) => select( blocksStore ).getBlockStyles( 'core/button' ),
        []
    );

    return (
        <ul>
            { buttonBlockStyles &&
                buttonBlockStyles.map( ( style ) => (
                    <li key={ style.name }>{ style.label }</li>
                ) ) }
        </ul>
    );
};
```

NOTE: WP does not include core styles of buttons to the editor so keep it in mind during genarating styles.