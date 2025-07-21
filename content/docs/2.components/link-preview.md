---
title: Link Preview
description: A Vue component that displays a preview image of a linked website on hover.

LinkPreview:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'url'
      type: 'String'
      default: '"https://astrilya.com"'
      description: 'The URL of the website to preview.'
    - name: 'width'
      type: 'Number'
      default: '800'
      description: 'The width of the preview image.'
    - name: 'height'
      type: 'Number'
      default: '800'
      description: 'The height of the preview image.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the link text or element.'
---

## Usage

:tab-preview-code{component="LinkPreview"}

### Props

:component-props{name="LinkPreview"}

### Slots

:component-props{name="Slots"}

## Customization

You can customize the LinkPreview component:

- Modify the `url`, `width`, and `height` props to change the preview image.
- Adjust the CSS in the `<style>` section to alter the animation, size, or positioning of the preview image.
- Use the default slot to customize the appearance of the link text or element.
