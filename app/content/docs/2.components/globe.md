---
title: 3D Globe Effect
description: A set of components for creating an interactive 3D globe effect with mouse movement animations using Three.js.

GlobeContainer:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'horizontalMoveMultiplier'
      type: 'Number'
      default: '2'
      description: 'Multiplier for adjusting the horizontal rotation of the globe when the mouse moves.'
    - name: 'verticalMoveMultiplier'
      type: 'Number'
      default: '2'
      description: 'Multiplier for adjusting the vertical movement of the globe items when the mouse moves.'

GlobeItem:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'class'
      type: 'String'
      default: 'null'
      description: 'Custom class to apply to the GlobeItem wrapper.'
    - name: 'positions'
      type: 'Object'
      default: '{ x: 0, y: 0, z: 0 }'
      description: 'Initial 3D positions (x, y, z) of the item in relation to the globe.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the globe container or globe item.'
---

## Usage Example

:tab-preview-code{component="Globe"}

## Customization

You can customize the 3D Globe Effect by:

- Adjusting the `horizontalMoveMultiplier` and `verticalMoveMultiplier` props on `GlobeContainer`
- Setting the `positions` prop on `GlobeItem` to position the items in 3D space
- Applying custom CSS classes or styles to the components
- Using slots to insert complex content into the globe items

:tab-preview-code{component="GlobeCustomization"}

### GlobeContainer

The `GlobeContainer` component wraps all `GlobeItem` components and manages the 3D effect behavior.

:component-props{name="GlobeContainer"}

### GlobeItem

The `GlobeItem` component represents individual items placed around the globe, each with a specific 3D position.

:component-props{name="GlobeItem"}

### Slots

Both `GlobeContainer` and `GlobeItem` use the default slot for their content.

:component-props{name="Slots"}

## Best Practices

1. Wrap all `GlobeItem` components within a `GlobeContainer`.
2. Define the `positions` prop on `GlobeItem` to position the items correctly on the globe.
3. Adjust the `horizontalMoveMultiplier` and `verticalMoveMultiplier` props on `GlobeContainer` to control the intensity of the interaction effects.
4. Use the `default` slot in both components to insert custom content.
5. Apply custom classes to `GlobeItem` for individual styling.

## Implementation Details

The `GlobeContainer` component manages mouse events and adjusts the rotation and position of its child components based on interaction.

Key features:

- Handles mouse events to rotate the globe and move items dynamically.
- Uses Three.js's `CSS3DRenderer` to render HTML content in 3D space.
- Provides control over the globe's interaction via the `horizontalMoveMultiplier` and `verticalMoveMultiplier` props.

The `GlobeItem` component defines the individual items around the globe with customizable 3D positions.

Key features:

- Renders items in 3D space using the `positions` prop.
- Can be styled with custom classes for further customization.
- Uses Vue's slot mechanism to allow custom HTML content inside each item.

For the full implementation details, please refer to the source code of each component.
