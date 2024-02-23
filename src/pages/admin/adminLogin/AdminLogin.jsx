import React, { useContext, useState } from "react";
import "./adminLogin.css";

import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider,  fireDb} from "../../../firebase/FirebaseConfig"; // Import firestore from FirebaseConfig
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

export default function AdminLogin({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log("result user", user);
      const userDetails = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userid: user.uid,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        // Add any other user details you want to store
      };
  
      // Save user details to Firestore under 'users' collection
      const userRef = doc(fireDb, "users", user.uid);
      setDoc(userRef, userDetails)
        .then(() => {
          localStorage.setItem("current user uid", user.uid);
          localStorage.setItem("isAuth", true);
          toast.success('Login success');
          navigate("/");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error('Error occurred during login');
        });
    });
  };
  
  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
