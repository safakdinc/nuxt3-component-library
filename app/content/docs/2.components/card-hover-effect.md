---
title: Hover Card Effect
description: A set of components for creating interactive hover card effects that track mouse movements and respond with dynamic animations.

HoverContainer:
  head:
    - Prop
    - Type
    - Default
    - Description
  props: []

HoverCard:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'class'
      type: 'String'
      default: 'null'
      description: 'A custom CSS class to style the hover card.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the hover container or hover card.'
---

## Usage Example

:tab-preview-code{component="HoverEffect"}

## Customization

You can customize the Hover Card Effect by:

- Applying custom CSS classes or styles to the components.
- Using slots to insert complex content into the hover cards.
- Tracking mouse movement inside the container to create a dynamic hover effect.

:tab-preview-code{component="HoverEffectCustomization"}

### HoverContainer

The `HoverContainer` component wraps all `HoverCard` components and manages the mouse movement tracking to provide dynamic hover effects.

### HoverCard

The `HoverCard` component represents individual elements within the hover container that react to mouse movement with a dynamic lighting or gradient effect.

:component-props{name="HoverCard"}

### Slots

Both `HoverContainer` and `HoverCard` use the default slot for their content.

:component-props{name="Slots"}

## Best Practices

1. Wrap all `HoverCard` components within a `HoverContainer`.
2. Use the `default` slot to insert custom content such as text, images, or icons inside the hover cards.
3. Customize the hover effect by modifying the CSS properties, such as the gradient size and position.
4. Ensure that the `mouseMove`, `mouseEnter`, and `mouseLeave` events are handled in the `HoverContainer` to provide smooth hover interactions.

## Implementation Details

The `HoverContainer` component tracks the mouse's `x` and `y` coordinates and provides this data to its child `HoverCard` components through Vue's `provide` and `inject` APIs.

Key features:

- Tracks mouse movement using the `mousemove` event to create dynamic hover effects.
- Uses Vue's `provide` API to share the hover state and mouse position with child components.
- Applies radial gradients dynamically based on mouse position to create the hover lighting effect.

The `HoverCard` component responds to the mouse position provided by `HoverContainer` and applies a visual effect (e.g., gradient, shadow) based on the hover state.

Key features:

- Dynamically adjusts the card's style based on mouse coordinates using CSS custom properties.
- Provides a customizable hover effect through CSS, allowing the developer to define gradient, opacity, and transition properties.
- Uses Vue's `inject` API to access mouse position and hover state from the parent container.

For the full implementation details, please refer to the source code of each component.
