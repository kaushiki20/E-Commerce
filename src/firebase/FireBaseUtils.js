import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRef } from "react";

const config = {
  apiKey: "AIzaSyDIJdpwdIgIPhdh3G-dYXH3sVxRH8uJvuo",
  authDomain: "ecommerce-db-d1465.firebaseapp.com",
  databaseURL: "https://ecommerce-db-d1465.firebaseio.com",
  projectId: "ecommerce-db-d1465",
  storageBucket: "ecommerce-db-d1465.appspot.com",
  messagingSenderId: "340541680777",
  appId: "1:340541680777:web:1cd93794c922b5a84dea58",
  measurementId: "G-6J0HZVCWF5",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userRef;
};

export default firebase;
