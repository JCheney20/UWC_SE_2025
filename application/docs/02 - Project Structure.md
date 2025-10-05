# Project Structure

This document outlines the structure of the UniRide application project (as of 2025-10-04).

## Root Directory

The root directory contains configuration files for the project, as well as the main source code directories.

```
/
├── .expo/
├── .vscode/
├── app/
├── assets/
├── components/
├── docs/
├── node_modules/
├── utils/
├── .firebaserc
├── .gitignore
├── app.json
├── database.rules.json
├── eas.json
├── eslint.config.js
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── google-services.json
├── GoogleService-Info.plist
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── storage.rules
└── tsconfig.json
```

### Important Files

*   `app.json`: Expo configuration file.
*   `package.json`: Project dependencies and scripts.
*   `tsconfig.json`: TypeScript configuration.
*   `firebase.json`: Firebase configuration.
*   `google-services.json`: Google services configuration for Android.
*   `GoogleService-Info.plist`: Google services configuration for iOS.

## `app` Directory

This directory contains the main application logic, organized by routes using file-based routing with Expo Router.

```
app/
├── _layout.tsx
├── (auth)/
│   ├── register.tsx
│   └── sign-in.tsx
├── (driver)/
│   ├── _layout.tsx
│   ├── (modals)/
│   │   ├── _layout.tsx
│   │   └── accepted-ride-request.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── chat.tsx
│       ├── index.tsx
│       ├── map.tsx
│       └── profile.tsx
└── (passenger)/
    ├── _layout.tsx
    ├── (modals)/
    │   ├── _layout.tsx
    │   └── selected-driver.tsx
    └── (tabs)/
        ├── _layout.tsx
        ├── chat.tsx
        ├── index.tsx
        ├── map.tsx
        └── profile.tsx
```

*   `_layout.tsx`: Defines the root layout for the app.
*   `(auth)`: Contains authentication-related screens (sign-in, register).
*   `(driver)`: Contains screens specific to the driver user type.
*   `(passenger)`: Contains screens specific to the passenger user type.

## `assets` Directory

This directory contains static assets used in the application, such as images and fonts.

```
assets/
└── images/
    ├── android-icon-background.png
    ├── android-icon-foreground.png
    ├── android-icon-monochrome.png
    ├── background-gradient.jpg
    ├── favicon.png
    ├── icon.png
    ├── modal-header-image.jpg
    ├── partial-react-logo.png
    └── splash-icon.png
```

## `components` Directory

This directory contains reusable React components used throughout the application.

```
components/
├── GradientBackground.tsx
├── Map.tsx
└── ModalStyling.tsx
```

## `utils` Directory

This directory contains utility functions and helper modules.

```
utils/
├── firebase.ts
├── mock-data.ts
├── tamagui.ts
└── types.ts
```

*   `firebase.ts`: Firebase configuration and initialization.
*   `mock-data.ts`: Mock data for testing and development.
*   `tamagui.ts`: Tamagui configuration.
*   `types.ts`: TypeScript type definitions.
