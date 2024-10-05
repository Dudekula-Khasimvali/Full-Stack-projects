import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email && !password) {
      toast.error("Please enter all the fields", { position: "top-center" });
    } else if (!email) {
      toast.error("Please enter email", { position: "top-center" });
    } else if (!password) {
      toast.error("Please enter password", { position: "top-center" });
    } else {
      try {
        // First fetch the user by email
        const response = await fetch(`http://localhost:8080/api/rigister/getBymail/${email}`);
        const userData = await response.json();

        // Check if the email exists in the database
        if (!userData) {
          toast.error("User with this email does not exist.", { position: "top-center" });
        } else {
          // If the email exists, check if the password matches
          if (userData.psw === password) {
            sessionStorage.setItem("USER_ID", userData.studentId);  // Store the user email or ID
            toast.success("Login successful", { position: "top-center" });
            setTimeout(() => {
              navigate("/manuplate"); // Redirect after successful login
            }, 1500);
          } else {
            toast.error("Incorrect password. Please try again.", { position: "top-center" });
          }
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error("An error occurred. Please try again.", { position: "top-center" });
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="form-content">
        <h2>Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon"><i className="fa fa-user"></i></span>
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon"><i className="fa fa-lock"></i></span>
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="link-section">
          
          <p>Don't Have Account?<a href='/rigister'>SignUp</a></p>
          <p>Forgot Password?<a href='/check'>Reset</a></p>
          
        </div>
        <ToastContainer />
      </div>
      <div className="welcome-section">
        <h1>WELCOME BACK!</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>
  );
}

export default Login;
