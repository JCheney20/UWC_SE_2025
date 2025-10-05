import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5YGxOF8o7-o9Mgh4VoEHYcRzSDIAW0sg",
  authDomain: "uniride-c7f82.firebaseapp.com",
  projectId: "uniride-c7f82",
  storageBucket: "uniride-c7f82.firebasestorage.app",
  messagingSenderId: "733757254065",
  appId: "1:733757254065:web:07110dc4d1161bf1a33590",
  measurementId: "G-7R1X6WB2NM"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators if in development
if (__DEV__) {
  const host = "192.168.18.215";
  connectAuthEmulator(auth, `http://${host}:9099`);
  connectFirestoreEmulator(db, host, 8080);
  connectStorageEmulator(storage, host, 9199);
}

export { auth, db, storage };
