import React, { useContext, useState } from "react";
import "./adminLogin.css";

import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";


export default function AdminLogin({setIsAuth}) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("current user uid", auth.currentUser.uid);
      localStorage.setItem("isAuth", true);
      toast.success('Login sucess');
     // setIsAuth(true);
      navigate("/");
    });
  };
  const signwithoutuser = () => {
   
      navigate("/terms");
   
  };

    return (
      <div className="loginPage">
         <p>Sign In With Unknow User</p>
      <button className="login-with-google-btn" onClick={signwithoutuser}>
        Sign in with Unknow User
      </button>
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>


    );
} 