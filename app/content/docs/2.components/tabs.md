---
title: Tabs Components
description: A set of components for creating customizable horizontal and vertical tab layouts with smooth transitions.

TabsHorizontal:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'active'
      type: 'Number'
      default: '0'
      description: 'Index of the active tab'
    - name: 'tabs'
      type: 'Array'
      default: "['Tab 1', 'Tab 2']"
      description: 'Array of tab labels'
    - name: 'background'
      type: 'String'
      default: 'aliceblue'
      description: 'Background color of the active tab indicator'
    - name: 'class'
      type: 'String'
      default: '""'
      description: 'Additional CSS classes to apply to the tabs'

TabsVertical:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'active'
      type: 'Number'
      default: '0'
      description: 'Index of the active tab'
    - name: 'tabs'
      type: 'Array'
      default: '["Tab 1", "Tab 2"]'
      description: 'Array of tab labels'
    - name: 'background'
      type: 'String'
      default: 'aliceblue'
      description: 'Background color of the active tab indicator'
    - name: 'class'
      type: 'String'
      default: '""'
      description: 'Additional CSS classes to apply to the tabs'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'handleClick'
      description: 'Emitted when a tab is clicked, with the index of the clicked tab'
---

## TabsHorizontal

The TabsHorizontal component creates a horizontal tab layout with an animated underline indicator for the active tab.

### Usage

:tab-preview-code{component="TabsHorizontal"}

## TabsVertical

The TabsVertical component creates a vertical tab layout with an animated side indicator for the active tab.

### Usage

:tab-preview-code{component="TabsVertical"}

### Props

:component-props{name="TabsHorizontal"}

### Props

:component-props{name="TabsVertical"}

### Events

Both components emits the following events:

:component-props{name="Events"}

## Styling

Both components use SCSS for styling. They create a main container with pseudo-elements for the indicator background and the active indicator. The active indicator's position and size are controlled by CSS custom properties (--left, --width for TabsHorizontal; --top, --height for TabsVertical) that are updated dynamically using JavaScript.

The components also use the v-wave directive for a ripple effect on click, and they support custom background colors for the active indicator.
