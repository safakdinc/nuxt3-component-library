---
title: Tracing Beam
description: A Vue component that creates an animated tracing beam effect alongside content.

TracingBeam:
  head:
    - Prop
    - Description
  props:
    - name: "triggerElement"
      description: "Selector for the scrollable element. Defaults to window if not provided."
    - name: "class"
      description: "Additional CSS classes to apply to the component."

Slots:
  head:
    - Slot
    - Description
  props:
    - name: "default"
      description: "Content to be displayed alongside the tracing beam."
---

## Usage

:tab-preview-code{component="TracingBeam"}

### Props

:component-props{name="TracingBeam"}

### Slots

:component-props{name="Slots"}

## How it Works

1. The component renders a container with a decorative SVG path and a dot.
2. It uses GSAP and ScrollTrigger to animate the gradient of the SVG path based on scroll position.
3. The animation creates a "tracing" effect that follows the user's scroll progress.
4. The component adapts to the height of its content automatically.

## Customization

You can customize the TracingBeam component in several ways:

- Modify the `class` prop to add custom styles or utility classes.
- Adjust the SVG path, colors, or dimensions in the component's template for different visual effects.
- Change the GSAP animation parameters in the script section to alter the animation behavior.

## Note

The TracingBeam component relies on GSAP and ScrollTrigger for animations. Ensure these libraries are properly installed and imported in your project for the component to function correctly. The component is designed to work with both window scrolling and custom scroll containers.
