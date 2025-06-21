---
title: Floating Content
description: A set of components for creating an interactive 3D float effect with mouse movement animations using Three.js.

FloatingContentContainer:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'horizontalMoveMultiplier'
      type: 'Number'
      default: '2'
      description: 'Multiplier for adjusting the horizontal rotation of the container when the mouse moves.'
    - name: 'verticalMoveMultiplier'
      type: 'Number'
      default: '2'
      description: 'Multiplier for adjusting the vertical movement of the items when the mouse moves.'

FloatingContentItem:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'class'
      type: 'String'
      default: 'null'
      description: 'Custom class to apply to the FloatingContentItem wrapper.'
    - name: 'positions'
      type: 'Object'
      default: '{ x: 0, y: 0, z: 0 }'
      description: 'Initial 3D positions (x, y, z) of the item in relation to the container.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the floating content container or item.'
---

## Usage Example

:tab-preview-code{component="FloatingContent"}

## Customization

You can customize the 3D Floating Content Effect by:

- Adjusting the `horizontalMoveMultiplier` and `verticalMoveMultiplier` props on `FloatingContentContainer`
- Setting the `positions` prop on `FloatingContentItem` to position the items in 3D space
- Applying custom CSS classes or styles to the components
- Using slots to insert complex content into the floating items

:tab-preview-code{component="FloatingContentCustomization"}

### FloatingContentContainer

The `FloatingContentContainer` component wraps all `FloatingContentItem` components and manages the 3D effect behavior.

:component-props{name="FloatingContentContainer"}

### FloatingContentItem

The `FloatingContentItem` component represents individual items placed within the container, each with a specific 3D position.

:component-props{name="FloatingContentItem"}

### Slots

Both `FloatingContentContainer` and `FloatingContentItem` use the default slot for their content.

:component-props{name="Slots"}

## Best Practices

1. Wrap all `FloatingContentItem` components within a `FloatingContentContainer`.
2. Define the `positions` prop on `FloatingContentItem` to position the items correctly in 3D space.
3. Adjust the `horizontalMoveMultiplier` and `verticalMoveMultiplier` props on `FloatingContentContainer` to control the intensity of the interaction effects.
4. Use the `default` slot in both components to insert custom content.
5. Apply custom classes to `FloatingContentItem` for individual styling.

## Implementation Details

The `FloatingContentContainer` component manages mouse events and adjusts the rotation and position of its child components based on interaction.

Key features:

- Handles mouse events to rotate the container and move items dynamically.
- Uses Three.js's `CSS3DRenderer` to render HTML content in 3D space.
- Provides control over the container's interaction via the `horizontalMoveMultiplier` and `verticalMoveMultiplier` props.

The `FloatingContentItem` component defines the individual items within the container with customizable 3D positions.

Key features:

- Renders items in 3D space using the `positions` prop.
- Can be styled with custom classes for further customization.
- Uses Vue's slot mechanism to allow custom HTML content inside each item.

For the full implementation details, please refer to the source code of each component.
