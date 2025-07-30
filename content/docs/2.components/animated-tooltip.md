---
title: Animated Tooltip
description: A Vue component that creates an animated tooltip with a dynamic hover effect.

AnimatedTooltip:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "offset"
      type: "Number"
      default: "0"
      description: "Adjust offset for tooltip position."
    - name: "class"
      type: "String"
      default: "undefined"
      description: "Additional CSS classes to apply to the container."

Slots:
  head:
    - Slot
    - Description
  props:
    - name: "default"
      description: "Content to be displayed inside the main element."
    - name: "tooltip"
      description: "Content to be displayed inside the tooltip."
---

## Usage

:tab-preview-code{component="AnimatedTooltip"}

### Props

:component-props{name="AnimatedTooltip"}

### Slots

:component-props{name="Slots"}

## Customization

You can customize the AnimatedTooltip component in several ways:

- Use the default slot to define the main content.
- Use the `tooltip` slot to define the content of the tooltip.
- Adjust the CSS variables in the `<style>` section to modify the animations and appearance:
  - `--transition`: Controls the timing function of the animations.
  - `--rotate`: Controls the rotation of the tooltip (set dynamically).
  - `--translateX`: Controls the horizontal translation of the tooltip (set dynamically).

## Styling

The component uses SCSS for styling. Key style features include:

- A gradient underline effect for the tooltip.
- Scale transformation for the main content on hover.
- Smooth entrance and exit animations for the tooltip.

You can further customize the appearance by modifying the SCSS in the `<style>` section of the component.
