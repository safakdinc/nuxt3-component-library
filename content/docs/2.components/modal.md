---
title: Modal
description: A set of components for creating customizable modal dialogs with smooth transitions.

ModalButton:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'open'
      type: 'Boolean'
      default: 'false'
      description: 'Controls the initial open state of the modal.'

ModalDefault:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'open'
      type: 'Boolean'
      default: 'false'
      description: 'Controls the initial open state of the modal.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'default'
      description: 'Content for the modal body (ModalDefault only).'
    - name: 'button'
      description: 'Content for the button that opens the modal (ModalButton only).'

Events:
  head:
    - Event
    - Description
  props:
    - name: 'handleClose'
      description: 'Emitted when the modal is closed (ModalButton only).'
---

### `ModalDefault` Example

:tab-preview-code{component="ModalDefault"}

### `ModalButton` Example

:tab-preview-code{component="ModalButton"}

## Modal Components

These components provide an easy way to create modal dialogs with smooth transitions in your Vue.js application.

### ModalButton

The `ModalButton` component creates a button that, when clicked, opens a modal dialog. It manages its own open/close state and provides slots for both the button content and the modal content.

:component-props{name="ModalButton"}

#### Slots for ModalButton

:component-props{name="Slots"}

#### Events for ModalButton

:component-props{name="Events"}

### ModalDefault

The `ModalDefault` component creates a modal dialog without an associated button. It's useful when you want to control the modal's visibility from a parent component.

:component-props{name="ModalDefault"}

#### Slots for ModalDefault

:component-props{name="Slots"}

#### Events for ModalDefault

:component-props{name="Events"}

## Customization

Both modal components use Vue's `<Transition>` component for smooth enter/leave animations. You can customize the transitions by modifying the CSS classes in the component's `<style>` section.

## Accessibility

These modal components implement some basic accessibility features:

- The modal is rendered at the end of the document body to ensure proper stacking context.
- Clicking outside the modal (on the overlay) closes the modal.
- The modal content receives focus when opened, allowing for keyboard navigation.

For better accessibility, consider adding:

- `aria-labelledby` and `aria-describedby` attributes to the modal content
- Keyboard support for closing the modal (e.g., Esc key)
- Focus trapping within the modal when it's open

## Best Practices

1. Use `ModalButton` when you want a self-contained modal with its own trigger button.
2. Use `ModalDefault` when you need more control over the modal's open state or want to trigger it from multiple places.
3. Keep modal content concise and focused on a single task or piece of information.
4. Provide a clear way to close the modal, such as a close button within the modal content.
5. Use the modal sparingly to avoid disrupting the user's workflow.
