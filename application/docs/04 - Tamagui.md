# Quick Guide to Tamagui

This guide provides a quick overview of [Tamagui], a UI toolkit for React Native.

## Core Concepts

### What is Tamagui?

Tamagui is a styling library that combines the best of utility-first CSS (like Tailwind) and traditional CSS-in-JS libraries. It allows you to create a design system with themes, tokens, and responsive styles, and then use that system to build your components.

### Tokens

Tokens are the fundamental building blocks of your design system. They are design decisions that are represented as variables, such as colors, spacing, and font sizes.

In our project, tokens are defined in `utils/tamagui.ts`.

### Themes

Themes are collections of tokens that can be applied to your components. You can create multiple themes, such as a light theme and a dark theme, and easily switch between them.

### Components

Tamagui provides a set of core components, such as `View`, `Text`, `Button`, and `Image`, that are optimized for performance and styling. You can also create your own custom components and style them using the Tamagui style props.

## Styling

Tamagui provides a set of style props that you can use to style your components. These props are similar to CSS properties, but they are typed and optimized for performance.

```tsx
import { YStack, Text } from 'tamagui';

function MyComponent() {
  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      borderRadius="$3"
      space="$2"
    >
      <Text fontSize="$6" color="$color">
        Hello, Tamagui!
      </Text>
    </YStack>
  );
}
```

In this example:

*   `YStack` is a vertical stack component.
*   `padding="$4"` applies a padding from the space token `$4`.
*   `backgroundColor="$background"` applies the background color from the current theme.
*   `borderRadius="$3"` applies a border radius from the radius token `$3`.
*   `space="$2"` adds spacing between the children of the stack.

## Responsive Design

Tamagui has built-in support for responsive design. You can use the `$gt`, `$lt`, `$sm`, `$md`, `$lg`, and `$xl` props to apply different styles at different breakpoints.

```tsx
<YStack
  flexDirection={'$sm' ? 'column' : 'row'}
>
  {/* ... */}
</YStack>
```

In this example, the `flexDirection` will be `column` on small screens and `row` on larger screens.

## Where to Learn More

This guide provides a very basic introduction to Tamagui. To learn more, check out the [official Tamagui documentation](https://tamagui.dev/docs/core/introduction).
