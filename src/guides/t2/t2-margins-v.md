---
title: T2 Margins v3
date: git Last Modified
---

# T2 Margins v3
If you're used old one and move to v3 You can remove the duplicate settings (`t2/custom-block-margin`) from theme.json

[[toc]]


## Usefully links
- [T2 Docs](https://t2.teft.io/extensions/custom-block-margin/)
- [T2 Git margins](https://github.com/DekodeInteraktiv/T2/tree/main/packages/extension-library/src/custom-block-margin)
- Nasjonalbiblioteket
  - [PHP Setup](https://github.com/DekodeInteraktiv/nasjonalbiblioteket/blob/main/packages/wordpress/mu-plugins/t2-config/includes/block-margin.php)
  - [Theme.json spacings](https://github.com/DekodeInteraktiv/nasjonalbiblioteket/blob/7bf5745efee7f0fff69453d58ecf1b9115eddd78/packages/wordpress/themes/block-base/theme.json#L369)
- Litex 2025
  - [PHP Setup](https://github.com/DekodeInteraktiv/litex-2025/blob/stage/packages/themes/block-theme/includes/t2-margins.php)
  - [Theme.json spacings](https://github.com/DekodeInteraktiv/litex-2025/blob/a7103f58c71912a040abd9d557e151ef4dd7d5d7/packages/themes/block-theme/theme.json#L233)


### Setting version
You need to set a version in `t2.json`. This is used to determine which version
of the extension to use.

If you don't set a version, the extension will trigger a warning and fallback to
version `1`. Latest (and recommended) version is `3`.

```json
{
	"t2/custom-block-margin": {
		"version": 3
	}
}
```

## v3
This version will override [Block Spacing API](https://developer.wordpress.org/news/2023/03/everything-you-need-to-know-about-spacing-in-block-themes/) for all containers with inner blocks in flow layout, including Post Content/root blocks, Group, Column, Media and Text, Cover, T2 Accordion, T2 Factbox, T2 Infobox, T2 Simple Media and Text, T2 Tabs etc. and enforce the same block spacing rules everywhere. ([All current containers](https://github.com/DekodeInteraktiv/T2/blob/main/packages/extension-library/src/custom-block-margin/v3.php#L32)). Out of the box this extension uses the [default spacing scale in WordPress](https://fullsiteediting.com/lessons/theme-json-layout-and-spacing-options/#h-how-to-use-the-default-spacing-scale).

### Extending
If you are using a different spacing scale for your project, or want to change any other part of the setup, you can use the built in filters:
```
t2/custom_block_margin/v3/gaps
t2/custom_block_margin/v3/default_gap
t2/custom_block_margin/v3/last_gap
t2/custom_block_margin/v3/last_selectors
t2/custom_block_margin/v3/containers
```


### Setting new spacing sizes
To change spacing sizes for a project first change the spacing sizes in `theme.json` (`settings.spacing.spacingSizes`). We recommend using the [default spacing scale](https://fullsiteediting.com/lessons/theme-json-layout-and-spacing-options/#h-how-to-use-the-default-spacing-scale) (20-80) for consistency, using 50 as medium reference point for gap between two paragraph blocks. If you need to add additional spacing sizes, add to the top (90) or bottom (10).

#### Example: Changing spacing scale to only `normal` and `small` in `theme.json`.
```json
{
	"settings": {
	"spacing": {
		"defaultSpacingSizes": false,
		"spacingSizes": [
		{
			"slug": "small",
			"name": "Small",
			"size": "1rem",
		},
		{
			"slug": "normal",
			"name": "Normal",
			"size": "2rem",
		},
		]
	}
	}
}
```

Then updated Custom Block Margin setup correspondingly with the same gaps and update the default and last gaps.

Gaps must keep old keys like `50`, `60`, `70` etc. to keep compatibility with default WordPress spacing scale. You can use the `t2/custom_block_margin/v3/gaps` filter to change the gaps.

```php
\add_filter( 't2/custom_block_margin/v3/gaps', function ( array $gaps ): array {
  return [
    'none' => [
      ...$gaps['none'],
    ],
    'small' => [
      ...$gaps['50'],
    ],
    'normal' => [],
  ];
} );

\add_filter( 't2/custom_block_margin/v3/default_gap', fn() => 'normal' );
\add_filter( 't2/custom_block_margin/v3/last_gap', fn() => 'normal' );
```
#### Example adding more gaps and keep the default spacing scale
This has to be done  if you add extra spacing sizes to the `theme.json` file.

In this exmaple I added `10` and place before original `none` and `90`, `100` after original `$gaps` to be rendered correctly in wordpress gutenberg sizes picker, or T2 spacing elements.

```php
\add_filter( 't2/custom_block_margin/v3/gaps', function ( array $gaps = [] ): array {
	$pre_gaps = [
		'none' => $gaps['none'],
		'10'   => [],
	];

	$after_gaps = [
		'90'  => [],
		'100' => [],
	];

	return $pre_gaps + $gaps + $after_gaps;
});
```

And the Theme json:

```json
"spacingSizes": [
	{
		"name": "4XL (64/120)",
		"slug": "100",
		"size": "clamp(4rem, 2.6765rem + 5.2941vw, 7.5rem)"
	},
	{
		"name": "3XL (64/80)",
		"slug": "90",
		"size": "clamp(4rem, 3.5588rem + 1.1765vw, 5rem)"
	},
	// ... Other standard 20 to 80
	{
		"name": "3XS (4/8)",
		"slug": "10",
		"size": "clamp(0.25rem, 0.2093rem + 0.3488vw, 0.5rem)"
	}
],
```

#### For reference, this is the current default spacing scale in WordPress:
| Key | Value | Alias |
|-|-|-|
| `–wp–preset–spacing–20` | 0.44rem  | 2X-Small |
| `–wp–preset–spacing–30` | 0.67rem  | X-Small |
| `–wp–preset–spacing–40` | 1rem | Small |
| `–wp–preset–spacing–50` | 1.5rem | Medium |
| `–wp–preset–spacing–60` | 2.25rem | Large |
| `–wp–preset–spacing–70` | 3.38rem | X-Large |
| `–wp–preset–spacing–80` | 5.06rem | 2X-Large |

### Add/remove block containers:
Use the `t2/custom_block_margin/v3/containers` filter to add or remove supported containers. ([All current containers](https://github.com/DekodeInteraktiv/T2/blob/main/packages/extension-library/src/custom-block-margin/v3.php#L32))

```php
\add_filter( 't2/custom_block_margin/v3/containers', function ( array $containers ): array {
  return [
    ...$containers,
    '.some-additional-container',
  ];
} );
```