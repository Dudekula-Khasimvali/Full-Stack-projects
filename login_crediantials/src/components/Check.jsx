import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Check() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleCheck() {
    if (!email) {
      toast.error("Please enter your email", { position: "top-center" });
      return;
    }

    try {
      // Fetch the user by email
      const response = await fetch(`http://localhost:8080/api/rigister/getBymail/${email}`);
      const data = await response.json();

      if (!data) {
        toast.error("User with this email does not exist.", { position: "top-center" });
      } else {
        toast.success("Email verified. Please enter a new password.", { position: "top-center" });

        // Navigate to ForgotPsw component with studentId and email
        setTimeout(() => {
          navigate("/forgotpsw", { state: { studentId: data.studentId, email } });
        }, 1500);
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      toast.error("An error occurred. Please try again.", { position: "top-center" });
    }
  }

  return (
    <div className="auth-container">
      <div className="form-content">
        <h2>Reset Password</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
          <div className="input-field">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Verify Email</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Check;
