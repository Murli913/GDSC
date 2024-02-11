import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./terms.css";

const Terms = () => {
    let navigate = useNavigate();
    const signwithoutuser = () => {
        navigate("/createblog");
     
    };
  return (
    <div>
  <div class="about-section">
  <h1 class="h11">Terms and Condition</h1>
  <div></div>
  <p></p>
  <p></p>
  <p></p>

  <p>1. Resize the browser window to see that this page is responsive by the way.</p>
  <p>2. Resize the browser window to see that this page is responsive by the way.</p>
  <p>3. Resize the browser window to see that this page is responsive by the way.</p>
  <p>4. Resize the browser window to see that this page is responsive by the way.</p>
  <p>5. Resize the browser window to see that this page is responsive by the way.</p>
  <p>6. Resize the browser window to see that this page is responsive by the way.</p>
  <p>7. Resize the browser window to see that this page is responsive by the way.</p>
  <p>8. Resize the browser window to see that this page is responsive by the way.</p>
  <p>9. Resize the browser window to see that this page is responsive by the way.</p>
  <p>10. Resize the browser window to see that this page is responsive by the way.</p>

      <button className="login-with-google-btn" onClick={signwithoutuser}>
        Aceept
      </button>
      </div>
        
        </div>
  )
}

export default Terms