---
title: 3D Carousel
description: A Vue component that creates an interactive 3D carousel using Three.js and GSAP.

3DCarousel:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'items'
      type: 'Array'
      default: '[]'
      description: 'An array of image URLs to display in the carousel. Required.'
    - name: 'class'
      type: 'String'
      default: 'empty'
      description: 'Additional CSS classes to apply to the component.'
    - name: 'width'
      type: 'Number'
      default: '450'
      description: 'Width value for each carousel item.'
    - name: 'height'
      type: 'Number'
      default: '600'
      description: 'Height value for each carousel item.'

Slots:
  head:
    - Slot
    - Description
  props: []

Events:
  head:
    - Event
    - Description
  props: []
---

## Usage

:tab-preview-code{component="3DCarousel"}

### Props

:component-props{name="3DCarousel"}

## How it Works

1. The component creates a 3D scene using Three.js and CSS3DRenderer.
2. Images are positioned in a circular arrangement in 3D space.
3. The carousel rotates continuously using GSAP animations.
4. Users can interact with the carousel through mouse and touch events:
   - Clicking and dragging (or touching and swiping) rotates the carousel.
   - Releasing the mouse or touch resumes the continuous rotation.
5. The component is responsive and adjusts to window resizing.

## Customization

You can customize the ThreeDCarousel component in several ways:

- Modify the `items` prop to change the images displayed in the carousel.
- Adjust the `class` prop to add custom styles or utility classes.
- Fine-tune the 3D effect by modifying parameters like `radius`, camera position, or rotation speed in the component's script.
- Customize the size and appearance of image elements by modifying the CSS styles applied to them.

## Note

The ThreeDCarousel component relies on Three.js, CSS3DRenderer, and GSAP for 3D rendering and animations. Ensure these libraries are properly installed and imported in your project for the component to function correctly. The component is designed to work on both desktop and mobile devices, providing an interactive experience across platforms.
