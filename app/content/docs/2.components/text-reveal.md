---
title: Text Reveal
description: A Vue component that reveals text with a smooth animation as the user scrolls.

TextReveal:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'triggerElement'
      type: 'String'
      default: 'null'
      description: 'CSS selector for the scrollable container. If null, defaults to window.'
    - name: 'class'
      type: 'String'
      default: 'h-[100vh] sticky top-0'
      description: 'CSS classes to apply to the text container.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content to be revealed. Typically text content.'
---

## Usage

To use the TextReveal component, import it into your Vue component and pass the desired text as its content. You can also customize the scrollable container and the CSS classes applied to the text.

:tab-preview-code{component="TextReveal"}

### Props

:component-props{name="TextReveal"}

### Slots

:component-props{name="Slots"}

## How it Works

1. The component splits the provided text into words using the SplitType library.
2. It sets up a GSAP ScrollTrigger for each word.
3. As the user scrolls, each word is revealed with a fade and blur animation.
4. The component can work within a custom scrollable container or use the window as the scroll context.

## Customization

You can customize the appearance and behavior of the TextReveal component:

- Modify the `class` prop to change the styling of the text container.
- Adjust the animation parameters in the `gsap.fromTo()` call within the component to change the reveal effect.
- Modify the `ScrollTrigger` configuration to adjust when and how the animations are triggered.

## Dependencies

This component requires the following libraries:

- GSAP (GreenSock Animation Platform)
- ScrollTrigger plugin for GSAP
- SplitType

Make sure these dependencies are installed and properly imported in your project.

## Note

The TextReveal component is designed to work within scrollable containers. Ensure that the parent element has sufficient height for scrolling to occur and trigger the animations.
