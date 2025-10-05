# UniRide

UniRide is a mobile application that allows users to plan and book their own rides.

## Technologies

- [React Native] / [Expo](https://expo.dev)
- [Expo Router](https://docs.expo.dev/versions/latest/routing/introduction/) (Routing Library)
- [Tamagui](https://tamagui.dev) (UI Library)
- [Firebase](https://firebase.google.com/) (Backend as a Service)

## Installation

The package manager used is [pnpm](https://pnpm.io/). I'd [recommend using it](https://refine.dev/blog/pnpm-vs-npm-and-yarn/#improved-speed) for the project (and any other projects) but you can use any package manager you want.

1. Install dependencies with your favourite package manager

   ```bash
   pnpm install
   ```

2. Login to your Firebase account

   ```bash
   pnpx firebase login
   ```

3. Optional, if you are not invited to the firebase project, you can create your own firebase project and add it to the `default` value in `.firebaserc`

## Running the application

1. Start the [firebase emulator suite](https://firebase.google.com/docs/emulator-suite). If you have trouble connecting later, ensure that ports 9099, 8080, and 9199 are open.

   ```bash
   pnpx firebase emulators:start
   ```

2. Copy the `.env.local.example` file to `.env.local`

3. Depending on how you wish to run the application, fill the `EXPO_PUBLIC_FIREBASE_EMULATOR_HOST` in the `.env.local` with:
   - ios emulator: `localhost`
   - android emulator: `10.0.2.2`
   - Expo Go: your computer's IP address on the network your phone is connected to. (On Windows, you can find this by running `ipconfig` in the command prompt.)

4. Start the mobile application. If you are using Expo Go, you can run the application on your phone by scanning the QR code on the screen.

   ```bash
   pnpm start
   ```

## Further Reading

In the `/docs` folder you'll find documentation to help you get started with the project technologies.

## Additional Resources

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Firebase documentation](https://firebase.google.com/docs/): Learn more about Firebase products that you can use in your apps.
- [Firebase CLI](https://firebase.google.com/docs/cli): Command-line tools for Firebase.
