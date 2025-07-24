---
title: Flip Words
description: A set of components for creating animated word cycling effects with different styles.

FlipWordDefault:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "class"
      type: "String"
      default: "none"
      description: "Additional CSS classes to apply to the component."
    - name: "words"
      type: "Array"
      default: "['One', 'Two', 'Three']"
      description: "An array of words to cycle through."
    - name: "intervals"
      type: "Number"
      default: "2000"
      description: "The time in milliseconds between word changes."
    - name: "duration"
      type: "Number"
      default: "0.6"
      description: "The duration of the animation in seconds."
    - name: "ease"
      type: "String"
      default: "'power3.out'"
      description: "The easing function for the animation."

FlipWordFaded:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: "class"
      type: "String"
      default: "none"
      description: "Additional CSS classes to apply to the component."
    - name: "words"
      type: "Array"
      default: "['One', 'Two', 'Three']"
      description: "An array of words to cycle through."
    - name: "intervals"
      type: "Number"
      default: "500"
      description: "The time in milliseconds between word changes."
    - name: "duration"
      type: "Number"
      default: "0.6"
      description: "The duration of the animation in seconds."
    - name: "ease"
      type: "String"
      default: "'power3.out'"
      description: "The easing function for the animation."
    - name: "start"
      type: "Boolean"
      default: "true"
      description: "Whether the animation should start immediately."
---

### Usage Example

:tab-preview-code{component="FlipWord"}

## Customization

You can customize the FlipWord components by:

- Adjusting the `words` prop to change the displayed text
- Modifying the `intervals` and `duration` props to control the timing of animations
- Changing the `ease` prop to alter the animation style
- Applying custom CSS classes using the `class` prop

Here's an example of customized FlipWord components:

:tab-preview-code{component="FlipWordCustomization"}

### FlipWordDefault

The `FlipWordDefault` component creates a word cycling effect with a scrolling animation.

:component-props{name="FlipWordDefault"}

### FlipWordFaded

The `FlipWordFaded` component creates a word cycling effect with a faded scrolling animation.

:component-props{name="FlipWordFaded"}

## Best Practices

1. Choose appropriate `intervals` and `duration` values to ensure readability.
2. Use contrasting colors between the text and background for better visibility.
3. Consider the context where the component is used, as the animated effect can be visually striking.
4. For FlipWordFaded, use the `start` prop to control when the animation begins, especially in dynamic layouts.

## Accessibility

While these components add visual appeal, ensure that they don't interfere with the readability or accessibility of the content. Consider providing alternative static text for screen readers if the animated content contains important information.

## Implementation Details

Both components use GSAP (GreenSock Animation Platform) for smooth animations.

FlipWordDefault:

- Uses ScrollToPlugin for scrolling animation
- Creates a repeating timeline for continuous cycling
- Calculates distances dynamically based on element positions

FlipWordFaded:

- Uses a mask image for the fading effect
- Responds to window resize events to maintain proper animation
- Allows manual control of animation start/stop

For the full implementation details, please refer to the source code of each component.
