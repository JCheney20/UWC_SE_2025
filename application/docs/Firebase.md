# Quick Guide to Firebase

This guide provides a quick overview of Firebase and how we use it in the UniRide project.

## What is Firebase?

Firebase is a platform developed by Google for creating mobile and web applications. It provides a suite of tools and services to help you build, improve, and grow your app.

In this project, we are using the following Firebase services:

*   **Authentication:** For managing user sign-up, sign-in, and sessions.
*   **Firestore:** A NoSQL database for storing and syncing data in real-time.
*   **Storage:** For storing and managing user-generated content, such as profile pictures.

## Firebase Setup

Our Firebase configuration is located in `utils/firebase.ts`. This file initializes the Firebase app and exports the authentication, Firestore, and storage services.

### Emulators

In development mode (`__DEV__`), we are using the Firebase Local Emulator Suite. This allows us to test our Firebase integration locally without interacting with the live Firebase services.

The emulators are configured to run on the following ports:

*   **Authentication:** `9099`
*   **Firestore:** `8080`
*   **Storage:** `9199`

## Using Firebase Services

To use the Firebase services in your components, you can import them from `utils/firebase.ts`.

### Authentication

```tsx
import { auth } from '@/utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// ...

const handleSignUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // ...
  } catch (error) {
    // ...
  }
};
```

### Firestore

```tsx
import { firestore } from '@/utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

// ...

const addData = async () => {
  try {
    const docRef = await addDoc(collection(firestore, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
```

### Storage

```tsx
import { storage } from '@/utils/firebase';
import { ref, uploadBytes } from 'firebase/storage';

// ...

const uploadImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, 'images/my-image.jpg');
  await uploadBytes(storageRef, blob);
};
```

## Where to Learn More

For more detailed information about Firebase, please refer to the [official Firebase documentation](https://firebase.google.com/docs).
