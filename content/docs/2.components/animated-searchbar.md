---
title: Animated Search Bar
description: A Vue component that creates an animated search bar with customizable styles.

AnimatedSearchBar:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'placeholder'
      type: 'String'
      default: '"Type to Search.."'
      description: 'Placeholder text for the search input.'
    - name: 'cancel_btn_color'
      type: 'String'
      default: '"white"'
      description: 'Color of the cancel button.'
    - name: 'cancel_btn_hover_color'
      type: 'String'
      default: '"#9E9E9E"'
      description: 'Hover color of the cancel button.'
    - name: 'search_btn_color'
      type: 'String'
      default: '"white"'
      description: 'Color of the search button.'
    - name: 'background'
      type: 'String'
      default: '"#191919"'
      description: 'Background color of the search bar.'
    - name: 'background_hover'
      type: 'String'
      default: '"#212121"'
      description: 'Background color of the search bar on hover.'
    - name: 'text_color'
      type: 'String'
      default: '"white"'
      description: 'Text color for the search input.'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'handleInput'
      description: 'Emitted when the input value changes, passing the current input value.'
---

## Usage

:tab-preview-code{component="AnimatedSearchBar"}

### Props

:component-props{name="AnimatedSearchBar"}

### Events

:component-props{name="Events"}

## Customization

You can customize the appearance of the AnimatedSearchBar component:

- Modify the props to change colors, placeholder text, and other visual aspects.
- Adjust the CSS variables in the `<style>` section to fine-tune sizes and animation properties.
- Extend the component's functionality by listening to the `handleInput` event.
