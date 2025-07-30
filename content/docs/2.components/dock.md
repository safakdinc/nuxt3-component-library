---
title: Dock
description: A macOS-style dock component with smooth animations and interactive hover effects.
---

# Dock

A beautiful macOS-style dock component that provides an elegant way to display navigation items or tools with smooth scaling animations on hover.

## Usage

:tab-preview-code{component="Dock"}

## Props

| Prop            | Type     | Default        | Description                                               |
| --------------- | -------- | -------------- | --------------------------------------------------------- |
| `items`         | `Array`  | `[]`           | Array of dock items to display                            |
| `size`          | `String` | `'medium'`     | Size of the dock items (`'small'`, `'medium'`, `'large'`) |
| `direction`     | `String` | `'horizontal'` | Dock orientation (`'horizontal'`, `'vertical'`)           |
| `spacing`       | `Number` | `8`            | Space between dock items in pixels                        |
| `magnification` | `Number` | `1.5`          | Scale factor for hover effect                             |

## Customization

You can customize the dock appearance by overriding CSS variables:

```css
.dock {
  --dock-bg: rgba(255, 255, 255, 0.1);
  --dock-border: rgba(255, 255, 255, 0.2);
  --dock-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  --dock-radius: 16px;
  --dock-padding: 8px;
}
```

## Examples

### Basic Dock

```vue
<template>
  <DocksItems />
</template>
```

### Custom Items

```vue
<template>
  <DocksItems :items="customItems" size="large" :magnification="2" />
</template>

<script setup>
const customItems = [
  { icon: 'finder', label: 'Finder' },
  { icon: 'safari', label: 'Safari' },
  { icon: 'mail', label: 'Mail' },
  { icon: 'photos', label: 'Photos' }
];
</script>
```

### Vertical Dock

```vue
<template>
  <DocksItems direction="vertical" :spacing="12" />
</template>
```

## Accessibility

The dock component includes several accessibility features:

- Keyboard navigation with arrow keys
- Focus indicators
- Screen reader support with proper ARIA labels
- Reduced motion support for users with motion sensitivity

## Browser Support

The dock component works in all modern browsers that support:

- CSS transforms
- CSS transitions
- Flexbox

## Animation Details

The dock uses CSS transforms and transitions to create smooth animations:

- **Hover Effect**: Items scale up using `transform: scale()`
- **Neighbor Effect**: Adjacent items get slightly scaled for a natural feel
- **Smooth Transitions**: All animations use cubic-bezier easing
- **Performance**: Uses `transform` properties for GPU
