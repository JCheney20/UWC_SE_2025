# Quick Guide to Expo Router

This guide provides a quick overview of Expo Router, a file-based routing system for React Native and web applications built with Expo.

## File-Based Routing

Expo Router uses the file system to define routes in your application. Each file in the `app` directory corresponds to a route.

For example:

*   `app/hello-world.tsx` maps to the `/hello-world` route.

### Index Routes

Files named `index.tsx` are treated as the default route for a directory.

*   `app/(driver)/(tabs)/index.tsx` is the default route for the `(tabs)` directory inside `(driver)`.

## Layouts

Layouts are special files that wrap around a route segment and its children. They are used to share UI components, such as headers and tab bars, between multiple screens.

Layouts are defined in `_layout.tsx` files.

*   `app/_layout.tsx`: The root layout for the entire application.
*   `app/(driver)/_layout.tsx`: The layout for the driver section of the app.
*   `app/(driver)/(tabs)/_layout.tsx`: The layout for the tab navigator in the driver section.

## Route Groups

Route groups are a way to organize your routes without affecting the URL structure. A directory wrapped in parentheses, such as `(driver)`, is a route group.

In our project, we use route groups to separate the driver and passenger sections of the app:

*   `(driver)`: Contains all routes related to the driver.
*   `(passenger)`: Contains all routes related to the passenger.
*   `(auth)`: Contains all routes related to authentication.

This allows us to apply different layouts to each section of the app.

## Dynamic Routes

Expo Router supports dynamic routes, which are useful when you need to create pages for a variable path, such as a user profile.

Dynamic routes are created by wrapping a file or directory name in square brackets. For example, `app/users/[id].tsx` would match `/users/1`, `/users/2`, etc.

## Navigating Between Routes

You can navigate between routes using the `Link` component or the `router` object from the `expo-router` package.

### `Link` Component

The `Link` component is a declarative way to navigate between routes.

```tsx
import { Link } from 'expo-router';

<Link href="/sign-in">Go to Sign In</Link>
```

### `router` Object

The `router` object provides imperative navigation methods.

```tsx
import { router } from 'expo-router';

router.push('/sign-in');
router.replace('/home');
router.back();
```

This guide covers the basic concepts of Expo Router. For more detailed information, please refer to the [official Expo Router documentation](https://docs.expo.dev/router/introduction/).
