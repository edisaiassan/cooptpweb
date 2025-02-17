import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDwkUyQmY8W0i9kOr-9aTpcbiJ-HmKwDsA",
  authDomain: "presentation-67cec.firebaseapp.com",
  projectId: "presentation-67cec",
  storageBucket: "presentation-67cec.firebasestorage.app",
  messagingSenderId: "1040503107188",
  appId: "1:1040503107188:web:978fe92cfe8a4e2bf7ab21",
  measurementId: "G-351C53TJSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//Initialize firestore
export const db = getFirestore(app)
export const storage = getStorage()
//Authentication (not required for this article)
export const auth = getAuth(app)