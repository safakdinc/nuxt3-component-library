---
title: Expandable Card
description: A Vue component that creates an expandable card with smooth animations.

ExpandableCard:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'cardInfo'
      type: 'Object'
      default: 'required'
      description: 'Object containing card information (title, description, image source, CTA text).'
    - name: 'buttonClass'
      type: 'String'
      default: 'null'
      description: 'Custom CSS class for the CTA button.'
    - name: 'backgroundClass'
      type: 'String'
      default: 'null'
      description: 'Custom CSS class for the card background.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Default slot for custom content.'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'handleClick'
      description: 'Emitted when the CTA button is clicked while the card is expanded.'
---

## Usage

:tab-preview-code{component="ExpandableCard"}

### Props

:component-props{name="ExpandableCard"}

### Slots

:component-props{name="Slots"}

### Events

:component-props{name="Events"}

## How it Works

1. The component renders a compact card with an image, title, description, and CTA button.
2. Clicking the card expands it into a full-screen modal with additional content.
3. The component uses GSAP and Flip for smooth animations during expansion and collapse.
4. The expanded view includes a scrollable content area and a semi-transparent overlay.

## Customization

You can customize the ExpandableCard component:

- Modify the `cardInfo` prop to change the card's content, image, and CTA text.
- Use the `buttonClass` prop to add custom styling to the CTA button.
- Use the `backgroundClass` prop to customize the card's background appearance.
- Adjust the CSS variables and classes to change the appearance of the card and modal.
- Extend the component's functionality by listening to the `handleClick` event.

## Note

The ExpandableCard component uses GSAP and Flip for animations. Ensure that you have these libraries installed and imported in your project for the animations to work correctly.
