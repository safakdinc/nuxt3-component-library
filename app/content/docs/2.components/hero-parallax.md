---
title: HeroParallax
description: A Vue component that creates a parallax effect with image grid for hero sections.

HeroParallax:
  head:
    - Prop
    - Description
  props:
    - name: 'items'
      description: 'An array of objects containing image data (img, name, link). Default is an empty array.'
    - name: 'triggerElement'
      description: 'Selector for the scrollable element. Defaults to window if not provided.'
    - name: 'class'
      description: 'Additional CSS classes to apply to the component. Default is an empty string.'

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

:tab-preview-code{component="HeroParallax"}

### Props

:component-props{name="HeroParallax"}

## How it Works

1. The component arranges images in a grid layout, with three images per row.
2. On scroll, it creates a parallax effect using GSAP and ScrollTrigger:
   - The entire container rotates and moves vertically.
   - Each row of images moves horizontally in alternating directions.
3. Images have a hover effect that lifts them slightly and reveals the image name.
4. The component is responsive and recalculates dimensions on window resize.

## Customization

You can customize the HeroParallax component in several ways:

- Modify the `items` prop to change the images and links displayed in the grid.
- Adjust the `class` prop to add custom styles or utility classes.
- Fine-tune the parallax effect by modifying GSAP animation parameters in the component's script.
- Customize the appearance of image cards by modifying the CSS classes and inline styles.

## Note

The HeroParallax component relies on GSAP and ScrollTrigger for animations. Ensure these libraries are properly installed and imported in your project for the component to function correctly. The component is designed to work with both window scrolling and custom scroll containers, providing flexibility in various layout scenarios.
