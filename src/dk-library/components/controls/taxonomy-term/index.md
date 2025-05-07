# LibTaxonomyTermControl

Allows you to pick term from given taxonomy.

[[toc]]
## Usage

```jsx
import { LibTaxonomyTermControl } from '...';

<LibTaxonomyTermControl
	taxonomy="category"
	value={value}
	onChange={(val) => {
		console.log('changed', val);
	}}
/>
```

Multiple
```jsx
import { LibTaxonomyTermControl } from '...';

<LibTaxonomyTermControl
	taxonomy="category"
	isMultiple
	value={value} // Remember to pass an array
	onChange={(val) => {
		console.log('changed', val);
	}}
/>
```

## TODO:
- [ ] Add support for terms from multiple taxonomies
- [ ] Allow search in the picker.
- [ ] Improve UI/UX by adding preloader when loading terms.
- [ ] Optimize the code with memoization.
- [ ] Allow async load of terms - to avoid loading all terms at once - coudl be handy for large taxonomies.