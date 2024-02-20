import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";


const PoliceForgot = () => {
    const history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(auth,emalVal).then(data=>{
            alert("Check your gmail")
            history("/")
        }).catch(err=>{
            alert(err.code)
        })
    }
  return (
    <div>
            <div className="App">
            <h1>Forgot Password</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input name="email" /><br/><br/>
                <button>Reset</button>
            </form>
        </div>
    </div>
  )
}

export default PoliceForgot