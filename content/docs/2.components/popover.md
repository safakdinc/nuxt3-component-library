---
title: Popover
description: A Vue component that creates a customizable popover with various trigger modes and placement options.

Popover:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'mode'
      type: 'String'
      default: "'hover'"
      description: "Trigger mode for the popover. Can be 'click' or 'hover'."
    - name: 'open'
      type: 'Boolean'
      default: 'undefined'
      description: 'Controls the open state of the popover.'
    - name: 'disabled'
      type: 'Boolean'
      default: 'false'
      description: 'Disables the popover when true.'
    - name: 'openDelay'
      type: 'Number'
      default: '0'
      description: 'Delay in milliseconds before opening the popover (for hover mode).'
    - name: 'closeDelay'
      type: 'Number'
      default: '0'
      description: 'Delay in milliseconds before closing the popover (for hover mode).'
    - name: 'transitionName'
      type: 'String'
      default: "'popover'"
      description: 'Name of the transition effect for the popover.'
    - name: 'placement'
      type: 'String'
      default: "'bottom'"
      description: "Placement of the popover. Can be 'top', 'bottom', 'left', or 'right'."
    - name: 'arrow'
      type: 'Boolean'
      default: 'true'
      description: 'Shows an arrow on the popover when true.'
    - name: 'arrowClass'
      type: 'String'
      default: "'bg-gray-500'"
      description: 'CSS class for styling the arrow.'
    - name: 'offset'
      type: 'Number'
      default: '8'
      description: 'Offset distance of the popover from the trigger element.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'trigger'
      description: 'Content for the trigger element. Provides `open` and `close` properties.'
    - name: 'default'
      description: 'Content for the popover panel. Provides `open` and `close` properties.'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'update:open'
      description: 'Emitted when the open state of the popover changes.'
---

## Usage

:tab-preview-code{component="Popover"}

### Props

:component-props{name="Popover"}

### Slots

:component-props{name="Slots"}

### Events

:component-props{name="Events"}

## Customization

You can customize the Popover component in several ways:

- Use the `mode` prop to choose between hover and click triggers.
- Adjust the `placement` prop to change the popover's position relative to the trigger.
- Modify the `openDelay` and `closeDelay` props to control timing for hover mode.
- Use the `transitionName` prop to apply custom transition effects.
- Style the arrow using the `arrowClass` prop.
- Control the distance between the trigger and popover using the `offset` prop.
