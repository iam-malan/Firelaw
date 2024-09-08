import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCJ5k22pOJ9tRtA48Sq1fshHoIP-2iWE5g",
  authDomain: "firelaw-f9f1a.firebaseapp.com",
  projectId: "firelaw-f9f1a",
  storageBucket: "firelaw-f9f1a.appspot.com",
  messagingSenderId: "873462024329",
  appId: "1:873462024329:web:c236caf3089a4d8751de58"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
