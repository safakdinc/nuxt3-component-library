---
title: Border Gradient
description: A versatile component for creating elements with animated gradient borders and backgrounds.

BorderGradient:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'background'
      type: 'String'
      default: "'black'"
      description: 'The background color of the inner content area.'
    - name: 'class'
      type: 'String'
      default: 'undefined'
      description: 'Additional CSS classes to apply to the inner content area.'
    - name: 'wrapperClass'
      type: 'String'
      default: 'undefined'
      description: 'Additional CSS classes to apply to the outer wrapper.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content to be displayed inside the gradient border.'
---

### Usage Example

:tab-preview-code{component="BorderGradient"}

## Customization

You can customize the BorderGradient component by:

- Adjusting the `background` prop to change the inner content area color.
- Applying custom CSS classes using the `class` and `wrapperClass` props.
- Modifying the gradient colors and animation in the component's `<style>` section.
- Adjusting the border radius by modifying the `rounded-2xl` class in the template.

Here's an example of a customized BorderGradient:

:tab-preview-code{component="BorderGradientCustomization"}

### BorderGradient

The `BorderGradient` component creates an element with an animated gradient border and background effect.

:component-props{name="BorderGradient"}

### Slots

The BorderGradient component uses the default slot for its content.

:component-props{name="Slots"}

## Best Practices

1. Use the `background` prop to ensure good contrast with your content.
2. Utilize the `class` prop to style the inner content area without affecting the gradient.
3. Apply the `wrapperClass` prop for positioning or sizing the entire component.
4. Keep the content within the component relatively simple to maintain readability.
5. Consider the context where the component is used, as the animated effect can be visually striking.

## Accessibility

While this component adds visual appeal, ensure that it doesn't interfere with the readability or accessibility of the content it contains. High contrast between the background and text content is crucial for readability.

## Implementation Details

The BorderGradient component uses layered divs, absolute positioning, CSS animations, and scoped styles to achieve its effect. The gradient is created using a complex `radial-gradient` with multiple color stops, creating a multi-color effect that animates smoothly.

Key features:

- Uses multiple nested `<div>` elements for gradient effects
- Employs absolute positioning for proper layering
- Utilizes CSS animations for the moving gradient effect
- Implements hover effects for interactivity

For the full implementation details, please refer to the source code of the component.
