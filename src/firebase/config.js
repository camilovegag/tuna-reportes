import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSGSnZe6LuyhJE2ZWHIq0Q_za_jPuKvoM",
  authDomain: "tuna-reportes.firebaseapp.com",
  projectId: "tuna-reportes",
  storageBucket: "tuna-reportes.appspot.com",
  messagingSenderId: "770038555687",
  appId: "1:770038555687:web:dd1dc90c7c40c89999da02",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
