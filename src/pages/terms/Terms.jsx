import React from 'react'
import { useNavigate } from 'react-router-dom';


const Terms = () => {
    let navigate = useNavigate();
    const signwithoutuser = () => {
   
        navigate("/createblog");
     
    };
  return (
    <div>
         <p>Click submit if you are agree with terms and condition</p>
      <button className="login-with-google-btn" onClick={signwithoutuser}>
        Sign in with Unknow User
      </button>
        
        </div>
  )
}

export default Terms