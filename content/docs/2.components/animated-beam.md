---
title: Animated Beam
description: A Vue component system that creates animated SVG lines connecting multiple elements with gradient effects using a single SVG container.

AnimatedBeamWrapper:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "class"
      type: "String"
      default: '""'
      description: "Additional CSS classes to apply to the wrapper container."

AnimatedBeamLine:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "from"
      type: "HTMLElement"
      default: "null"
      description: "The starting element for the line (required)."
    - name: "to"
      type: "HTMLElement"
      default: "null"
      description: "The ending element for the line (required)."
    - name: "reverse"
      type: "Boolean"
      default: "false"
      description: "Reverses the direction of the gradient animation."
    - name: "curvature"
      type: "Number"
      default: "0"
      description: "The curvature of the line. For horizontal beams, affects vertical curve. For vertical beams, affects horizontal curve."
    - name: "curvatureX"
      type: "Number"
      default: "undefined"
      description: "Horizontal curvature displacement. Overrides auto-detection when specified."
    - name: "curvatureY"
      type: "Number"
      default: "undefined"
      description: "Vertical curvature displacement. Overrides auto-detection when specified."
    - name: "startXOffset"
      type: "Number"
      default: "0"
      description: "X-axis offset for the starting point."
    - name: "startYOffset"
      type: "Number"
      default: "0"
      description: "Y-axis offset for the starting point."
    - name: "endXOffset"
      type: "Number"
      default: "0"
      description: "X-axis offset for the ending point."
    - name: "endYOffset"
      type: "Number"
      default: "0"
      description: "Y-axis offset for the ending point."
    - name: "pathWidth"
      type: "Number"
      default: "2"
      description: "Width of the path stroke."
    - name: "pathOpacity"
      type: "Number"
      default: "0.2"
      description: "Opacity of the base path."
    - name: "gradientStartColor"
      type: "String"
      default: '"#6344F5"'
      description: "Start color of the gradient."
    - name: "gradientStopColor"
      type: "String"
      default: '"#18CCFC"'
      description: "End color of the gradient."
    - name: "pathColor"
      type: "String"
      default: '"gray"'
      description: "Color of the base path."
    - name: "delay"
      type: "Number"
      default: "0"
      description: "Delay before the animation starts (in seconds)."
    - name: "duration"
      type: "Number"
      default: "Math.random() * 3 + 4"
      description: "Duration of the animation (in seconds)."
    - name: "morphDuration"
      type: "Number"
      default: "0.5"
      description: "Duration of the morphing animation when path changes (in seconds)."
---

## Usage

:tab-preview-code{component="AnimatedBeam"}

The AnimatedBeam system consists of two components:

- `AnimatedBeamWrapper`: Container component that manages a single SVG for all beams
- `AnimatedBeamLine`: Individual beam components that render paths within the wrapper

### Props

#### AnimatedBeamWrapper

:component-props{name="AnimatedBeamWrapper"}

#### AnimatedBeamLine

:component-props{name="AnimatedBeamLine"}

## How it Works

1. **AnimatedBeamWrapper** creates a single SVG container that manages all beam paths and gradients
2. **AnimatedBeamLine** components register themselves with the wrapper and contribute path data
3. All beams are rendered within the same SVG for optimal performance
4. The system uses a provide/inject pattern for communication between wrapper and lines
5. Paths automatically recalculate when the container is resized or elements move
6. GSAP is used for smooth morphing animations when paths change

## Architecture Benefits

- **Performance**: Single SVG eliminates multiple DOM elements
- **Automatic Updates**: Responsive design with automatic path recalculation
- **Smooth Animations**: GSAP-powered morphing between path states

## Customization

You can customize the AnimatedBeam components by:

**Path Appearance:**

- Using `curvature` for automatic curve direction based on beam orientation (vertical beams curve horizontally, horizontal beams curve vertically)
- Using `curvatureX` and `curvatureY` for precise manual control over curve direction in both axes
- Modifying offset props (`startXOffset`, `startYOffset`, `endXOffset`, `endYOffset`) to fine-tune connection points
- Changing `pathWidth` and `pathOpacity` to alter the base path appearance

**Gradient Colors:**

- Setting `gradientStartColor` and `gradientStopColor` to customize gradient colors
- Using `pathColor` to change the base path color

**Animation Timing:**

- Configuring `delay` and `duration` to control animation timing
- Setting `morphDuration` to adjust the speed of path morphing animations
- Using `reverse` to change gradient animation direction

**Best Practices:**

- Always wrap `AnimatedBeamLine` components in conditional rendering (`v-if`) to ensure template refs are available
- Use the wrapper's `class` prop to control positioning and sizing
- Consider performance when adding many beams - the single SVG architecture handles this efficiently

## Important Notes

- Template refs must be available before rendering `AnimatedBeamLine` components
- The wrapper automatically handles resize events and path recalculation
- Each beam gets a unique gradient ID for proper rendering
- GSAP MorphSVG plugin is used for smooth path transitions
