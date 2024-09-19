---
title: Accordion
description: A versatile UI component for creating collapsible content sections.

AccordionItem:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'open'
      type: 'Boolean'
      default: 'false'
      description: 'If true, the accordion item is open by default.'
    - name: 'maxHeight'
      type: 'Number'
      default: '300'
      description: 'The maximum height of the content area when open.'
    - name: 'duration'
      type: 'Number'
      default: '0.3'
      description: 'The duration of the open/close animation in seconds.'
    - name: 'name'
      type: 'String'
      default: 'required'
      description: 'A unique identifier for the accordion item.'

AccordionContainer:
  head:
    - Prop
    - Type
    - Default
    - Description
  props:
    - name: 'openSingle'
      type: 'Boolean'
      default: 'true'
      description: 'If true, only one accordion item can be open at a time.'

Slots:
  head:
    - Slot
    - Description
  props:
    - name: 'trigger'
      description: "Content for the accordion item's header/trigger."
    - name: 'default'
      description: 'Content for the expandable section of the accordion item.'
---

### Usage Example

:tab-preview-code{component="Accordion"}

### AccordionContainer

The `AccordionContainer` wraps all `AccordionItem` components and manages their behavior.

:component-props{name="AccordionContainer"}

### AccordionItem

The `AccordionItem` represents an individual section in the accordion.

The following table lists the available props for the Accordion component:

:component-props{name="AccordionItem"}

### Slots

You can use slots to customize the buttons and items content of the Accordion.

:component-props{name="Slots"}

## Best Practices

1. Provide unique `index` props for each `AccordionItem`.
2. Use clear, concise headers in the `trigger` slot.
3. Consider the `maxHeight` prop to manage long content.
4. Adjust the `duration` prop for optimal animation speed.
5. Use `openSingle` on `AccordionContainer` to control simultaneous open sections.

## Accessibility

The Accordion components support keyboard navigation and manage ARIA attributes automatically.

## Customization

You can customize the Accordion's appearance by:

- Applying custom CSS classes
- Adjusting the `buttonBackground` prop
- Using slots for complex content

For more examples and advanced usage, refer to the live demo at the top of this page.
