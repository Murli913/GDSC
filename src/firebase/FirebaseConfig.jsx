// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import  { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBgNe8aV6-EdMtFfEZs96Ljp9LHSSDvRA8",
  authDomain: "complaints-1b9a9.firebaseapp.com",
  projectId: "complaints-1b9a9",
  storageBucket: "complaints-1b9a9.appspot.com",
  messagingSenderId: "492042939484",
  appId: "1:492042939484:web:8d30d4f1e6c0912b97ca99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireDb=getFirestore(app);
export const storage = getStorage(app)
export const auth=getAuth(app);

export const provider=new GoogleAuthProvider();