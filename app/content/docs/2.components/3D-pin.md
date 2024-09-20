---
title: 3D Pin
description: A Vue component that creates a 3D pin effect with hover animations.

ThreeDPin:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the main card.'
    - name: 'pin'
      description: 'Content for the pin element.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the main card.'
    - name: 'pin'
      description: 'Content for the pin element.'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'mouseenter'
      description: 'Emitted when the mouse enters the component.'
    - name: 'mouseleave'
      description: 'Emitted when the mouse leaves the component.'
---

## Usage

:tab-preview-code{component="3DPin"}

### Slots

:component-props{name="Slots"}

### Events

:component-props{name="Events"}

## How it Works

1. The component renders a container with a pin and a card.
2. On hover, the card scales down and rotates, revealing the pin.
3. The pin and its accessories (stripe, dot, and animated circles) become visible on hover.
4. The component uses CSS transitions and animations for smooth effects.

## Customization

You can customize the appearance of the ThreeDPin component:

- Modify the content of the pin and card using the provided slots.
- Adjust the CSS variables in the `<style>` section to change colors, sizes, and animation properties.
- Extend the component's functionality by listening to the `mouseenter` and `mouseleave` events.

## Note

The ThreeDPin component uses CSS 3D transforms and animations. Ensure that your target browsers support these features for the best experience.
