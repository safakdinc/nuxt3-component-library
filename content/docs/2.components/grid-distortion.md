---
title: Grid Distortion
description: A Vue component that creates an interactive grid distortion effect on images with mouse movement and chromatic aberration

GridDistortion:
  head:
    - Prop
    - Type
    - Required
    - Description
  props:
    - name: "src"
      type: "String"
      default: "true"
      description: "Source URL of the image to be distorted."
---

## Usage

:tab-preview-code{component="GridDistortion"}

### Props

:component-props{name="GridDistortion"}

## How it Works

1. The component creates a Three.js scene with a custom shader that applies distortion effects to the provided image
2. The image is rendered on a plane geometry with proper aspect ratio preservation
3. Mouse movement triggers three main effects:
   - Grid-based distortion following the mouse movement
   - Smooth easing of the distortion effect
   - Chromatic aberration effect that intensifies with mouse movement

## Features

1. **Responsive Design**
   - Automatically adjusts to container size
   - Maintains image aspect ratio
   - Handles window resize events

2. **Interactive Effects**
   - Smooth mouse tracking with easing
   - Grid-based pixel displacement
   - Dynamic chromatic aberration
   - Fluid animation transitions

3. **Performance Optimized**
   - Efficient WebGL rendering
   - Proper resource cleanup
   - Optimized event handlers

## Customization

You can customize the GridDistortion component by modifying these aspects:

- Grid density (adjust the `20.0` value in the fragment shader)
- Distortion strength (modify the `0.2` multiplier in the fragment shader)
- Chromatic aberration intensity (adjust the `0.01` value)
- Animation easing factor (modify the `easeFactor` value)

## Note

This component requires Three.js as a dependency. Ensure your project has Three.js installed:
