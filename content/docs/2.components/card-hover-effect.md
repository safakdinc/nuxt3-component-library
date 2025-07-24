---
title: Hover Card Effect
description: A set of components for creating interactive hover card effects that track mouse movements and respond with dynamic animations.

HoverContainer:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "items"
      type: "Array"
      default: "required"
      description: "Array of items to display in the hover container."
    - name: "itemMinWidth"
      type: "Number"
      default: "200"
      description: "Minimum width for each item in pixels."
    - name: "itemMaxWidth"
      type: "Number"
      default: "300"
      description: "Maximum width for each item in pixels."
    - name: "rowPadding"
      type: "Number"
      default: "16"
      description: "Vertical spacing between rows in pixels."
    - name: "colPadding"
      type: "Number"
      default: "16"
      description: "Horizontal spacing between columns in pixels."
    - name: "maxColumns"
      type: "Number"
      default: "null"
      description: "Maximum number of columns per row. Works together with itemMaxWidth."
    - name: "class"
      type: "String"
      default: "null"
      description: "A custom CSS class to style the hover container."

HoverCard:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "class"
      type: "String"
      default: "null"
      description: "A custom CSS class to style the hover card."
    - name: "customization"
      type: "CustomizationProps"
      default: "default values"
      description: "Object containing customization options for the hover effect."

CustomizationProps:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "borderIntensity"
      type: "Number"
      default: "0.4"
      description: "Intensity of the border effect (0-1)."
    - name: "glowIntensity"
      type: "Number"
      default: "0.06"
      description: "Intensity of the glow effect (0-0.2)."
    - name: "borderColor"
      type: "String"
      default: "white"
      description: "Color of the border effect (white, blue, purple, green, red, gold)."
    - name: "glowColor"
      type: "String"
      default: "white"
      description: "Color of the glow effect (white, blue, purple, green, red, gold)."
    - name: "animationSpeed"
      type: "Number"
      default: "0.4"
      description: "Speed of animations in seconds."
    - name: "borderRadius"
      type: "Number"
      default: "10"
      description: "Border radius in pixels."
    - name: "effectSize"
      type: "Number"
      default: "500"
      description: "Size of the hover effect in pixels."
    - name: "effectType"
      type: "String"
      default: "radial"
      description: "Type of effect (radial, linear, spotlight)."

Slots:
  head:
    - Slot
    - Description
  props:
    - name: "default"
      description: "Content for the hover container. Receives item and index as slot props."
---

## Usage Example

:tab-preview-code{component="HoverEffect"}

## Customization

You can customize the Hover Card Effect by:

- **Layout Control**: Use `itemMinWidth`, `itemMaxWidth`, and `maxColumns` to control the responsive layout
- **Hover Effects**: Pass a `customization` object to `HoverCard` to control visual effects
- **Colors**: Choose from predefined colors (white, blue, purple, green, red, gold) for borders and glow
- **Effect Types**: Select from radial, linear, or spotlight effect types
- **Animation**: Control animation speed and effect intensity
- **Custom Styling**: Apply custom CSS classes to both container and cards

:tab-preview-code{component="HoverEffectCustomization"}

### Layout Options

The `HoverContainer` now includes responsive layout controls:

- `maxColumns`: Limits the maximum number of columns per row
- `itemMaxWidth`: Sets the maximum width for individual items
- Both properties work together - you can limit columns AND item width simultaneously
- `itemMinWidth`: Ensures items don't shrink below a minimum size

### HoverContainer

The `HoverContainer` component wraps all `HoverCard` components and manages both the responsive layout and mouse movement tracking to provide dynamic hover effects.

:component-props{name="HoverContainer"}

### HoverCard

The `HoverCard` component represents individual elements within the hover container that react to mouse movement with customizable dynamic lighting or gradient effects.

:component-props{name="HoverCard"}

### CustomizationProps

The customization object allows fine-grained control over the visual effects:

:component-props{name="CustomizationProps"}

### Slots

The `HoverContainer` uses a scoped slot that provides access to item data and index.

:component-props{name="Slots"}

## Best Practices

1. **Layout Control**: Use `maxColumns` and `itemMaxWidth` together for precise responsive control
2. **Content Structure**: Use the scoped slot to access item data: `<template #default="{ item, index }">`
3. **Customization**: Pass a customization object to control visual effects consistently across cards
4. **Performance**: The container uses debounced resize handling and efficient mouse tracking
5. **Accessibility**: Ensure content within cards remains accessible and keyboard navigable
6. **Color Consistency**: Use the predefined color options for consistent theming

## Examples

### Basic Usage

```vue
<HoverContainer :items="frameworks">
  <template #default="{ item }">
    <HoverCard class="p-6">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </HoverCard>
  </template>
</HoverContainer>
```

### With Layout Control

```vue
<HoverContainer :items="frameworks" :max-columns="3" :item-max-width="250" :item-min-width="200">
  <template #default="{ item }">
    <HoverCard class="p-6">
      <img :src="item.image" :alt="item.name" />
      <h3>{{ item.name }}</h3>
    </HoverCard>
  </template>
</HoverContainer>
```

### With Custom Effects

```vue
<HoverContainer :items="frameworks">
  <template #default="{ item }">
    <HoverCard
      :customization="{
        borderColor: 'blue',
        glowColor: 'purple',
        effectType: 'spotlight',
        borderIntensity: 0.6
      }"
      class="p-6">
      <h3>{{ item.name }}</h3>
    </HoverCard>
  </template>
</HoverContainer>
```

## Implementation Details

### HoverContainer Features

The `HoverContainer` component combines responsive layout management with dynamic hover effects:

**Layout Management:**

- Built on top of the `Responsive` component for intelligent grid layouts
- Supports `maxColumns` and `itemMaxWidth` constraints working together
- Automatic resize handling with debounced calculations
- Flexible spacing control with `rowPadding` and `colPadding`

**Mouse Tracking:**

- Tracks mouse movement using the `mousemove` event for dynamic hover effects
- Uses Vue's `provide` API to share hover state and mouse position with child components
- Provides `clientX`, `clientY`, and `isHovered` to all child `HoverCard` components

### HoverCard Features

The `HoverCard` component provides highly customizable visual effects:

**Visual Effects:**

- Multiple effect types: radial, linear, and spotlight gradients
- Customizable colors from a predefined palette
- Adjustable intensities for both border and glow effects
- Smooth animations with configurable speed

**Technical Implementation:**

- Uses TypeScript interfaces with `withDefaults` for type safety
- Dynamically adjusts styles based on mouse coordinates using CSS custom properties
- Uses Vue's `inject` API to access mouse position and hover state from parent container
- Efficient rendering with computed styles and CSS variables

**Customization Object:**

```typescript
interface CustomizationProps {
  borderIntensity?: number; // 0-1, controls border opacity
  glowIntensity?: number; // 0-0.2, controls glow effect
  borderColor?: string; // Predefined color options
  glowColor?: string; // Independent glow color
  animationSpeed?: number; // Animation duration in seconds
  borderRadius?: number; // Card border radius in pixels
  effectSize?: number; // Hover effect size in pixels
  effectType?: "radial" | "linear" | "spotlight"; // Effect type
}
```

### Performance Considerations

- Uses `ResizeObserver` for efficient layout recalculation
- Debounced resize handling to prevent excessive calculations
- CSS transforms and custom properties for smooth animations
- Efficient mouse tracking without excessive re-renders

For the full implementation details, please refer to the source code of each component.
