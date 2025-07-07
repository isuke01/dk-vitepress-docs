# LibMetaColorPopupControl

A WordPress Block Editor component that provides a color picker popup control with meta field support. This component wraps the `ColorSelectPopup` component and integrates with WordPress post meta using the `withPostMeta` HOC.

[[toc]]
## Features

- **Meta Integration**: Automatically saves/loads color values to/from WordPress post meta
- **Flexible Value Storage**: Transform color values before saving (full object, hex only, slug only, etc.)
- **WordPress Components**: Built on top of WordPress `@wordpress/components`
- **All ColorSelectPopup Props**: Supports all props from the underlying `ColorSelectPopup` component

## Installation

```javascript
import LibMetaColorPopupControl from './path/to/LibMetaColorPopupControl';
```

## Basic Usage

### Simple Color Picker (saves full color object)

```javascript
<LibMetaColorPopupControl
  label="Background Color"
  pickerLabel="Select Background Color"
  help="Choose a background color for your content"
  metaKey="background_color"
/>
```

**Saved value:**
```javascript
{
  color: '#2D438C',
  name: 'Dark Blue',
  slug: 'dark-blue',
  alpha: 1
}
```

### Save Only Hex Color Value

```javascript
<LibMetaColorPopupControl
  label="Text Color"
  pickerLabel="Select Overlay Color"
  help="Choose text color"
  metaKey="text_color"
  valueTransform={(colorObj) => colorObj.color}
/>
```

**Saved value:**
```javascript
"#2D438C"
```

### Save Only Color Slug

```javascript
<LibMetaColorPopupControl
  label="Theme Color"
  pickerLabel="Select Overlay Color"
  help="Choose from theme colors"
  metaKey="theme_color"
  valueTransform={(colorObj) => colorObj.slug}
/>
```

**Saved value:**
```javascript
"dark-blue"
```

### Save Color and Alpha Only

```javascript
<LibMetaColorPopupControl
  label="Overlay Color"
  pickerLabel="Select Overlay Color"
  help="Choose overlay color with transparency"
  metaKey="overlay_color"
  valueTransform={(colorObj) => ({
    color: colorObj.color,
    alpha: colorObj.alpha
  })}
/>
```

**Saved value:**
```javascript
{
  color: '#2D438C',
  alpha: 0.8
}
```

## Advanced Examples

### With Custom onChange Handler

```javascript
<LibMetaColorPopupControl
  label="Border Color"
  metaKey="border_color"
  onChange={(value) => {
    console.log('Color changed:', value);
    // Additional logic here
  }}
  valueTransform={(colorObj) => colorObj.color}
/>
```

### With ColorSelectPopup Props

```javascript
<LibMetaColorPopupControl
  label="Accent Color"
  metaKey="accent_color"
  // ColorSelectPopup specific props
  colors={[
    { name: 'Red', slug: 'red', color: '#FF0000' },
    { name: 'Blue', slug: 'blue', color: '#0000FF' },
    { name: 'Green', slug: 'green', color: '#00FF00' }
  ]}
  disableCustomColors={false}
  clearable={true}
  valueTransform={(colorObj) => colorObj.color}
/>
```

### Convert to RGBA Format

```javascript
const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0, 0, 0, ${alpha})`;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

<LibMetaColorPopupControl
  label="Background Color"
  metaKey="bg_color_rgba"
  valueTransform={(colorObj) => hexToRgba(colorObj.color, colorObj.alpha)}
/>
```

**Saved value:**
```javascript
"rgba(45, 67, 140, 1)"
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the control |
| `help` | `string` | - | Help text displayed below the control |
| `metaKey` | `string` | - | **Required.** WordPress meta key to save the value to |
| `className` | `string` | - | Additional CSS class name |
| `onChange` | `function` | `() => {}` | Callback function called when value changes |
| `valueTransform` | `function` | `(value) => value` | Function to transform the value before saving |

### Inherited Props

This component also accepts all props from `ColorSelectPopup`. Common ones include:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `array` | - | Array of color objects with `name`, `slug`, and `color` properties |
| `disableCustomColors` | `boolean` | `false` | Whether to disable custom color picker |
| `clearable` | `boolean` | `false` | Whether the color can be cleared/reset |

## ValueTransform Examples

### Common Transform Functions

```javascript
// Save only hex color
const saveHexOnly = (colorObj) => colorObj.color;

// Save only slug
const saveSlugOnly = (colorObj) => colorObj.slug;

// Save color with alpha
const saveColorWithAlpha = (colorObj) => ({
  color: colorObj.color,
  alpha: colorObj.alpha
});

// Save as CSS custom property
const saveCSSCustomProp = (colorObj) => `var(--color-${colorObj.slug})`;

// Save as RGB values
const saveRGBValues = (colorObj) => {
  const hex = colorObj.color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return { r, g, b };
};
```

## Meta Field Registration

Don't forget to register your meta fields in PHP:

```php
// In your theme's functions.php or plugin file
add_action('init', function() {
    register_post_meta('post', 'background_color', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
});
```

## Notes

- The component uses the `withPostMeta` HOC which provides `metaValue` and `setMetaValue` props
- The `id` prop is currently hardcoded to "text-campaign-top" - you may want to make this configurable
- The component saves the full color object by default, use `valueTransform` to customize the saved format
- All `ColorSelectPopup` props are passed through via `...restProps`

## Dependencies

- `@wordpress/components`
- `@components/components` (for ColorSelectPopup)
- `withPostMeta` HOC from your helpers