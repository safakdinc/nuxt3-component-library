---
title: 3D Card Effect
description: A set of components for creating interactive 3D card effects with hover animations.

CardContainer:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "multiplierX"
      type: "Number"
      default: "20"
      description: "Multiplier for the X-axis rotation effect."
    - name: "multiplierY"
      type: "Number"
      default: "10"
      description: "Multiplier for the Y-axis rotation effect."

CardItem:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "translateZ"
      type: "Number"
      default: "30"
      description: "The Z-axis translation distance in pixels when hovered."
    - name: "boxShadow"
      type: "Boolean"
      default: "false"
      description: "Whether to apply a box shadow effect when hovered."

Slots:
  head:
    - Slot
    - Description
  props:
    - name: "default"
      description: "Content for the card container or card item."
---

### Usage Example

:tab-preview-code{component="3DCardEffect"}

## Customization

You can customize the 3D Card Effect by:

- Adjusting the `multiplierX` and `multiplierY` props on `CardContainer`
- Modifying the `translateZ` and `boxShadow` props on `CardItem`
- Applying custom CSS classes or styles to the components
- Using slots to insert complex content into the cards

:tab-preview-code{component="3DCardEffectCustomization"}

### CardContainer

The `CardContainer` component wraps all `CardItem` components and manages the 3D effect behavior.

:component-props{name="CardContainer"}

### CardItem

The `CardItem` component represents an individual element within the 3D card that can have its own depth effect.

:component-props{name="CardItem"}

### Slots

Both `CardContainer` and `CardItem` use the default slot for their content.

:component-props{name="Slots"}

## Best Practices

1. Wrap all `CardItem` components within a `CardContainer`.
2. Adjust the `multiplierX` and `multiplierY` props on `CardContainer` to control the intensity of the 3D effect.
3. Use different `translateZ` values for `CardItem` components to create a sense of depth.
4. Consider disabling `boxShadow` on some `CardItem` components for varied visual effects.
5. Experiment with nested `CardItem` components for complex layouts.

## Accessibility

While these components create visually appealing effects, ensure that the content remains accessible to all users, including those using screen readers or keyboard navigation.

## Implementation Details

The `CardContainer` component handles the mouse movement tracking and applies the 3D rotation effect. It also provides the hover state context to its child components.

Key features:

- Uses CSS variables for dynamic rotation values
- Implements mouse event handlers for interactive effects
- Provides hover state context using Vue's `provide` API

The `CardItem` component represents individual elements within the 3D card that can have their own depth effect.

Key features:

- Applies Z-axis translation based on the `translateZ` prop
- Conditionally applies a box shadow effect
- Uses Vue's `inject` API to respond to the parent's hover state

For the full implementation details, please refer to the source code of each component.
