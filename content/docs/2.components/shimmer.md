---
title: Shimmer Loading
description: A Vue component that creates a shimmer loading effect, ideal for placeholder content.

ShimmerLoading:
  head:
    - Prop
    - Description
  props:
    - name: 'background'
      description: 'Background color of the loading element. Default is "#c2c2c2".'
    - name: 'shimmer'
      description: 'Color of the shimmer effect. Default is "#ffffff".'
---

## Usage

:tab-preview-code{component="ShimmerLoading"}

### Props

:component-props{name="ShimmerLoading"}

## Customization

You can customize the ShimmerLoading component in several ways:

- Adjust the `background` prop to change the base color of the loading element.
- Modify the `shimmer` prop to alter the color of the shimmer effect.
- Customize the size and shape by applying CSS to the component's parent element.
- Fine-tune the animation by modifying the keyframes and animation properties in the component's style section.
