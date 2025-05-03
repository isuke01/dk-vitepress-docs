# Helper function to add height and width variables to the body


## the JS code:

```js
function bindElementSizeToCssVars(selector, cssVarPrefix, debounceDelay = 150) {
	let resizeTimeout = null;

	function updateSizeVars() {
		const el = document.querySelector(selector);
		if (!el) return;

		const width = el.offsetWidth;
		const height = el.offsetHeight;

		document.body.style.setProperty(`${cssVarPrefix}-width`, `${width}px`);
		document.body.style.setProperty(`${cssVarPrefix}-height`, `${height}px`);
	}

	function onResize() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(updateSizeVars, debounceDelay);
	}

	window.addEventListener('load', updateSizeVars);
	window.addEventListener('resize', onResize);

	// Optionally return a manual trigger
	return {
		update: updateSizeVars
	};
}
```

### Example usage:

```js
bindElementSizeToCssVars('.my-element', '--my-element');
```

This will bind the width and height of `.my-element` to CSS variables `--my-element-width` and `--my-element-height` on the body element. The values will be updated on window load and resize events.
```
