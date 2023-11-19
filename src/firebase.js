import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJxQrGD2A1GFQOiRufGZdW38fIy1pzRaI",
  authDomain: "astroshop-97352.firebaseapp.com",
  databaseURL: "https://astroshop-97352-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "astroshop-97352",
  storageBucket: "astroshop-97352.appspot.com",
  messagingSenderId: "537442119874",
  appId: "1:537442119874:web:884bd624d867ec43ac4b5b",
  measurementId: "G-L21YHPE92W",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
