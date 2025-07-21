---
title: Animated Beam
description: A Vue component that creates an animated SVG line connecting two elements with a gradient effect.

AnimatedBeam:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'reverse'
      type: 'Boolean'
      default: 'false'
      description: 'Reverses the direction of the gradient animation.'
    - name: 'container'
      type: 'HTMLElement'
      default: 'null'
      description: 'The container element for the SVG (required).'
    - name: 'from'
      type: 'HTMLElement'
      default: 'null'
      description: 'The starting element for the line (required).'
    - name: 'to'
      type: 'HTMLElement'
      default: 'null'
      description: 'The ending element for the line (required).'
    - name: 'curvature'
      type: 'Number'
      default: '0'
      description: 'The curvature of the line.'
    - name: 'startXOffset'
      type: 'Number'
      default: '0'
      description: 'X-axis offset for the starting point.'
    - name: 'startYOffset'
      type: 'Number'
      default: '0'
      description: 'Y-axis offset for the starting point.'
    - name: 'endXOffset'
      type: 'Number'
      default: '0'
      description: 'X-axis offset for the ending point.'
    - name: 'endYOffset'
      type: 'Number'
      default: '0'
      description: 'Y-axis offset for the ending point.'
    - name: 'pathWidth'
      type: 'Number'
      default: '2'
      description: 'Width of the path stroke.'
    - name: 'pathOpacity'
      type: 'Number'
      default: '0.2'
      description: 'Opacity of the base path.'
    - name: 'gradientStartColor'
      type: 'String'
      default: '"#6344F5"'
      description: 'Start color of the gradient.'
    - name: 'gradientStopColor'
      type: 'String'
      default: '"#18CCFC"'
      description: 'End color of the gradient.'
    - name: 'pathColor'
      type: 'String'
      default: '"gray"'
      description: 'Color of the base path.'
    - name: 'delay'
      type: 'Number'
      default: '0'
      description: 'Delay before the animation starts (in seconds).'
    - name: 'duration'
      type: 'Number'
      default: 'Math.random() * 3 + 4'
      description: 'Duration of the animation (in seconds).'
---

## Usage

:tab-preview-code{component="AnimatedBeam"}

### Props

:component-props{name="AnimatedBeam"}

## How it Works

1. The component creates an SVG path between two specified elements.
2. It uses a gradient effect that animates along the path.
3. The path automatically updates when the window is resized.
4. GSAP is used for smooth animation of the gradient.

## Customization

You can customize the AnimatedBeam component by:

- Adjusting the `curvature` prop to change the curve of the line.
- Modifying the `startXOffset`, `startYOffset`, `endXOffset`, and `endYOffset` props to fine-tune the connection points.
- Changing the `gradientStartColor` and `gradientStopColor` props to alter the gradient colors.
- Adjusting the `pathWidth` and `pathOpacity` to change the appearance of the base path.
- Setting the `delay` and `duration` props to control the timing of the animation.
