# Helper function to add height and width variables to the body
[[toc]]

## Basic JS code:

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


## Using MutationObserver

`MutationObserver` – DOM structure watcher
- What it does: Watches for changes in the DOM tree: adding/removing elements, changing attributes, or moving elements.
- When to use: When you need to detect if an element appears, disappears, or its attributes change.
- Limitation: It does not detect changes in size.

Example use cases:
- Reacting when a lazy-loaded block appears.
- Observing if an element is added/removed dynamically (e.g. via AJAX).
- Watching attribute changes (like class or style).

```js
/**
 * Binds the width and height of a DOM element to CSS custom properties on the <body>.
 * Updates automatically on page load, resize, and when the element is added to the DOM.
 *
 * @param {string} selector - A CSS selector string to find the target element.
 * @param {string} cssVarPrefix - The prefix for the CSS variables to be set (e.g., '--my-element').
 *                                The final variables will be `${prefix}-width` and `${prefix}-height`.
 * @param {number} [debounceDelay=150] - Optional debounce delay in milliseconds for resize updates.
 * @returns {{ update: Function, disconnect: Function }} An object with:
 *   - update(): Manually trigger the CSS variable update.
 *   - disconnect(): Stop all observers and event listeners.
 *
 * @example
 * bindElementSizeToCssVars('.dekode-lib__hero-lx--featured-image', '--hero-featured-image');
 */
function bindElementSizeToCssVars(selector, cssVarPrefix, debounceDelay = 150) {
	let resizeTimeout = null;
	let observer = null;

	/**
	 * Updates the width and height CSS variables on the body element.
	 */
	function updateSizeVars() {
		const el = document.querySelector(selector);
		if (!el) return;

		const width = el.offsetWidth;
		const height = el.offsetHeight;

		document.body.style.setProperty(`${cssVarPrefix}-width`, `${width}px`);
		document.body.style.setProperty(`${cssVarPrefix}-height`, `${height}px`);
	}

	/**
	 * Debounced resize handler.
	 */
	function onResize() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(updateSizeVars, debounceDelay);
	}

	/**
	 * Starts observing the DOM for changes to watch for the target element.
	 */
	function startObserver() {
		const target = document.body;

		if (!target || typeof MutationObserver === 'undefined') return;

		observer = new MutationObserver(() => {
			updateSizeVars();
		});

		observer.observe(target, {
			childList: true,
			subtree: true,
		});
	}

	/**
	 * Disconnects the MutationObserver and event listeners.
	 */
	function disconnect() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
		window.removeEventListener('resize', onResize);
	}

	// Initial run
	window.addEventListener('load', updateSizeVars);
	window.addEventListener('resize', onResize);
	startObserver();

	return {
		update: updateSizeVars,
		disconnect
	};
}
```

### Example usage:

```js
const heroObserver = bindElementSizeToCssVars('.dekode-lib__hero-lx--featured-image', '--hero-featured-image');

// Manually update if needed
heroObserver.update();

// Clean up when no longer needed
// heroObserver.disconnect();
```

# Using ResizeObserver
This works best when the element is already present in the DOM.

`ResizeObserver` – Element size watcher
- What it does: Watches for size changes of a specific element.
- When to use: When you need to detect size changes of a specific element.
- Limitation: It does not detect changes in the DOM structure (like adding/removing elements).
- Performance: More efficient than `MutationObserver` for size changes.
- Browser support: Supported in most modern browsers, but check compatibility for older ones.

Example use cases:
- Updating layout or styles when a block resizes.
- Tracking when a media container resizes due to responsive changes.
- Reacting to image loads that change element height.

```js
/**
 * Binds the width and height of a specific DOM element to CSS variables on the <body>,
 * and updates them automatically whenever the element resizes.
 *
 * @param {string} selector - A CSS selector to find the element to observe.
 * @param {string} cssVarPrefix - The prefix for the CSS variables (e.g. '--my-element').
 *                                Will set `${prefix}-width` and `${prefix}-height`.
 * @returns {{ disconnect: Function }} An object with a `disconnect()` method to stop observing.
 *
 * @example
 * bindResizeObserverToCssVars('.dekode-lib__hero-lx--featured-image', '--hero-featured-image');
 */
function bindResizeObserverToCssVars(selector, cssVarPrefix) {
	const el = document.querySelector(selector);
	if (!el || typeof ResizeObserver === 'undefined') return { disconnect: () => {} };

	const observer = new ResizeObserver(entries => {
		for (const entry of entries) {
			const { width, height } = entry.contentRect;
			document.body.style.setProperty(`${cssVarPrefix}-width`, `${width}px`);
			document.body.style.setProperty(`${cssVarPrefix}-height`, `${height}px`);
		}
	});

	observer.observe(el);

	return {
		disconnect: () => observer.disconnect()
	};
}
```

### Example usage:

```js
const heroResize = bindResizeObserverToCssVars('.dekode-lib__hero-lx--featured-image', '--hero-featured-image');

// Later if needed:
// heroResize.disconnect();
```

## Combined Approach

You can combine both `MutationObserver` and `ResizeObserver` to handle both size changes and DOM structure changes. This is useful if you want to ensure that the CSS variables are always up-to-date, regardless of how the element is added or resized.

```js
/**
 * Watches for the presence and size of an element in the DOM.
 * Once available, binds its width and height to CSS custom properties on the <body>.
 * Uses MutationObserver to detect when the element is added,
 * and ResizeObserver to track size changes.
* - Applies fallback values if element is not found
 *
 * @param {string} selector - A CSS selector to target the element.
 * @param {string} cssVarPrefix - Prefix for CSS variables (e.g. '--hero' will set --hero-width and --hero-height).
 * @param {{ width?: string, height?: string }} [fallback] - Optional fallback values like { width: '100vw', height: '50vh' }
 * @param {Element} [targetEl=document.body] - Element where CSS variables will be applied
 * @returns {{ update: Function, disconnect: Function }} Object with manual update and cleanup method.
 */
function bindElementSizeVars(selector, cssVarPrefix, fallback = {}, targetEl = document.body) {
	let resizeObserver = null;
	let mutationObserver = null;
	let hasFoundElement = false;

	/**
	 * Set width/height CSS variables on the target element
	 * @param {string} width
	 * @param {string} height
	 */
	function setCssVars(width, height) {
		if (width) {
			targetEl.style.setProperty(`${cssVarPrefix}-width`, width);
		}
		if (height) {
			targetEl.style.setProperty(`${cssVarPrefix}-height`, height);
		}
	}

	/**
	 * Update CSS variables from a DOM element’s size
	 * @param {HTMLElement} el
	 */
	function updateCssVarsFromElement(el) {
		if (!el) return;
		const width = `${el.offsetWidth}px`;
		const height = `${el.offsetHeight}px`;
		setCssVars(width, height);
	}

	/**
	 * Initialize ResizeObserver on the given element
	 * @param {HTMLElement} el
	 */
	function startResizeObserver(el) {
		if (resizeObserver) resizeObserver.disconnect();
		if (!window.ResizeObserver) return;

		resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				updateCssVarsFromElement(entry.target);
			}
		});

		resizeObserver.observe(el);
	}

	/**
	 * Try to find the element and initialize observers
	 */
	function setupIfAvailable() {
		const el = document.querySelector(selector);
		if (el) {
			hasFoundElement = true;
			updateCssVarsFromElement(el);
			startResizeObserver(el);
		} else if (!hasFoundElement && fallback) {
			// Apply fallback only if element hasn’t been found
			setCssVars(fallback.width, fallback.height);
		}
	}

	/**
	 * Watch for DOM changes to detect element insertion
	 */
	function startMutationObserver() {
		if (!window.MutationObserver) return;

		mutationObserver = new MutationObserver(() => {
			setupIfAvailable();
		});

		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// Initial setup
	if (document.readyState === 'loading') {
		window.addEventListener('DOMContentLoaded', setupIfAvailable);
	} else {
		setupIfAvailable();
	}

	startMutationObserver();

	return {
		/** Manually re-check for element */
		update: setupIfAvailable,
		/** Disconnect all observers */
		disconnect() {
			if (resizeObserver) resizeObserver.disconnect();
			if (mutationObserver) mutationObserver.disconnect();
		}
	};
}
```

### Example usage:

```js
const heroTracker = bindElementSizeVars('.dekode-lib__hero-lx--featured-image', '--hero-featured-image');

// Manually force update if needed
// heroTracker.update();

// Clean up when done (e.g., SPA navigation)
// heroTracker.disconnect();
```