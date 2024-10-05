import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPsw() {
  const location = useLocation();
  const { studentId } = location.state || {}; // Retrieve studentId from the previous component
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const navigate = useNavigate();

  async function handleUpdatePassword() {
    if (!newPassword || !reEnterPassword) {
      toast.error("Please fill all fields", { position: "top-center" });
      return;
    }
    if (newPassword !== reEnterPassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      return;
    }

    try {
      // Corrected: Send the 'psw' field instead of 'newPassword'
      const response = await fetch(`http://localhost:8080/api/rigister/update/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ psw: newPassword }), // Send 'psw' to match backend field name
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully!", { position: "top-center" });
        
        setTimeout(() => {
          navigate("/login");
        },2000);
      } else {
        toast.error(data.message || "Failed to update password. Please try again.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.", { position: "top-center" });
    }
  }

  return (
    <div className="auth-container">
      <div className="form-content">
        <h2>Enter New Password</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdatePassword(); }}>
          <div className="input-field">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Re-enter Password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Update Password</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPsw;
