---
title: Direction Aware Hover
description: A Vue component that creates a direction-aware hover effect on images using GSAP for animations.

DirectionAwareHover:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'img'
      type: 'String'
      default: 'Required'
      description: 'URL of the image to be displayed.'
    - name: 'imageAlt'
      type: 'String'
      default: "'Hover image'"
      description: 'Alt text for the image.'
    - name: 'class'
      type: 'String'
      default: "''"
      description: 'Additional CSS classes for the main container.'
    - name: 'childrenClass'
      type: 'String'
      default: "''"
      description: 'CSS classes for the content container.'
    - name: 'imageClass'
      type: 'String'
      default: "''"
      description: 'Additional CSS classes for the image.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content to be displayed over the image on hover.'
---

## Usage

:tab-preview-code{component="DirectionAwareHover"}

### Props

:component-props{name="DirectionAwareHover"}

### Slots

:component-props{name="Slots"}

## How it Works

1. The component renders an image container with the provided image.
2. On mouse enter, it determines the direction of the mouse entry.
3. Based on the entry direction, it animates the image and content using GSAP.
4. On mouse leave, it animates the components back to their original positions.

## Customization

You can customize the DirectionAwareHover component in several ways:

- Use the `img` prop to set the image source.
- Adjust the `imageAlt` prop to provide appropriate alt text for accessibility.
- Use the `class`, `childrenClass`, and `imageClass` props to apply custom styles.
- Modify the content displayed on hover using the default slot.

## Dependencies

This component requires the GSAP library for animations. Make sure to install it in your project:

```
npm install gsap
```
