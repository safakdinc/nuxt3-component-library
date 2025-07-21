---
title: TracingCurveContainer
description: A Vue component that creates an interactive 3D curved line animation with scroll-triggered content.

TracingCurveContainer:
  props:
    - name: 'curveData'
      type: 'Array'
      default: []
      description: 'An array of objects containing line and item data for each curve.'
    - name: 'triggerElement'
      type: 'String | Window'
      default: 'window'
      description: 'The element to use as the scroll trigger. Can be a CSS selector string or the window object.'
---

## Usage

The TracingCurveContainer component creates an interactive 3D curved line animation with scroll-triggered content. It uses Three.js for 3D rendering and GSAP for animations.

:tab-preview-code{component="TracingCurve"}

### Props

:component-props{name="TracingCurveContainer"}

## How it Works

1. The component creates a 3D scene using Three.js and CSS3DRenderer.
2. It generates curved lines based on the provided `curveData`.
3. Each curve is associated with a content item (title, subtitle, and texts).
4. As the user scrolls, the camera moves along the z-axis, revealing the curves and content.
5. ScrollTrigger is used to control the animations based on scroll position.
6. Content items are revealed and hidden with smooth animations as they enter and leave the viewport.

## Customization

You can customize the TracingCurveContainer component by modifying the `curveData` prop:

- Adjust the `start` and `end` coordinates of each line to change its position and length.
- Modify the `curvature` values to change the shape of the curve.
- Customize the `item` content (title, subtitle, and texts) for each curve.

## Note

- This component relies on Three.js and GSAP libraries. Make sure they are properly installed and imported in your project.
- The component uses 3D transforms and animations, which may affect performance on low-end devices. Consider optimizing for your target audience.
- Ensure that the container element has a defined height (e.g., 100vh) for proper rendering and scrolling behavior.

This documentation provides an overview of the TracingCurveContainer component, its usage, props, how it works, customization options, and important notes. You can further customize this documentation to include any additional details or examples specific to your project's needs.

</script>
