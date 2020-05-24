import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unSubscribe = auth.onAuthStateChanged((userAuth) => {
      unSubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const createCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((object) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollections.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};
export default firebase;
