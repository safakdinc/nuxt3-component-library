---
title: Parallax Image
description: A Vue component that creates a parallax effect on an image as the user scrolls.

ParallaxImage:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "src"
      type: "String"
      default: "null"
      description: "The source URL of the image to be displayed."
    - name: "scrub"
      type: "Boolean, Number"
      default: "true"
      description: "Determines if the parallax effect should be tied directly to scroll position."
---

## Usage

:tab-preview-code{component="ParallaxImage"}

### Props

:component-props{name="ParallaxImage"}

## How it Works

1. The component renders an img element with the provided src.
2. On mount, it sets up a GSAP animation with ScrollTrigger.
3. As the user scrolls, the image's `objectPosition` is animated from 'center 100%' to 'center 0%'.
4. The parallax effect is triggered when the image enters the viewport and ends when it leaves.

## Customization

You can customize the appearance and behavior of the ParallaxImage component:

- Modify the `src` prop to change the displayed image.
- Adjust the `scrub` prop to change how the animation responds to scrolling.
- Modify the GSAP animation parameters in the component to adjust the parallax effect.

## Dependencies

This component requires the following libraries:

- GSAP (GreenSock Animation Platform)
- ScrollTrigger plugin for GSAP

Make sure these dependencies are installed and properly imported in your project.

## Note

The ParallaxImage component is designed to work within scrollable containers. Ensure that the parent element has sufficient height for scrolling to occur and trigger the parallax effect.
