---
title: Floating Label Input
description: A Vue component that creates an input field with a floating label and animated underline.

FloatingLabel:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'label'
      type: 'String'
      default: '"Label"'
      description: 'Text to be displayed as the floating label.'
    - name: 'type'
      type: 'String'
      default: '"text"'
      description: 'Type of the input field (e.g., text, password, email).'
    - name: 'underlineColor'
      type: 'String'
      default: '"aliceblue"'
      description: 'Color of the animated underline when the input is focused.'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'handleInput'
      description: 'Emitted when the input value changes.'
---

## Usage

:tab-preview-code{component="FloatingLabel"}

### Props

:component-props{name="FloatingLabel"}

### Events

:component-props{name="Events"}

## Customization

You can customize the FloatingLabel component:

- Modify the `label` prop to change the text of the floating label.
- Use the `type` prop to set the appropriate input type (e.g., text, password, email).
- Adjust the `underlineColor` prop to change the color of the animated underline.
- Modify the SCSS styles to adjust the animations, sizes, and other visual aspects.
