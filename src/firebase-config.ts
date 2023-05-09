// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
} from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "libman-v2.firebaseapp.com",
  projectId: "libman-v2",
  storageBucket: "libman-v2.appspot.com",
  messagingSenderId: "675239463297",
  appId: "1:675239463297:web:4854601a5a183dd2b90080",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// Import types
import { User, Book, Transaction, Review } from "./types";

// export
export const usersCollectionRef = createCollection<User>("users");
export const booksCollectionRef = createCollection<Book>("books");
export const transactionCollectionRef =
  createCollection<Transaction>("transactions");
export const reviewCollectionRef = createCollection<Review>("reviews");
