import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update({ studentId, initialData = {}, onUpdateSuccess, onCancel }) { // Default to empty object
  const [userData, setUserData] = useState(initialData);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 8 || password.length === 8) {
      setPasswordError('Password must be at least 8 characters and cannot be exactly 8 characters long.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Update user details
  async function handleUpdate() {
    if (!validatePassword(userData.psw)) {
      return; // Prevent update if validation fails
    }

    try {
      const response = await fetch(`http://localhost:8080/api/rigister/update/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        toast.success('Updated Changes Successfully!');
        onUpdateSuccess(); // Notify parent of success
      } else {
        setError('Error updating user details');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  }

  return (
    <div className="card shadow-lg p-4">
      <h2 className="text-center mb-4">Edit Account Details</h2>
      <div className="form-group">
        <label>Student ID</label>
        <input 
          type="text" 
          value={userData.studentId} 
          className="form-control" 
          readOnly 
        />
      </div>
      <div className="form-group">
        <label>User Name</label>
        <input 
          type="text" 
          value={userData.userName} 
          onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
          className="form-control" 
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={userData.mail} 
          onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
          className="form-control" 
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          value={userData.psw} 
          onChange={(e) => setUserData({ ...userData, psw: e.target.value })}
          className="form-control" 
        />
        {passwordError && <p className="text-danger">{passwordError}</p>} {/* Display password error */}
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-outline-success" onClick={handleUpdate}>Save Changes</button>
      <button className="btn btn-secondary ml-2" onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default Update;
