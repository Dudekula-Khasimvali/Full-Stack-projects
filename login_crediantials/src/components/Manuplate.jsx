import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Manuplate.css';
import Update from './Update'; // Import the Update component

function Manuplate() {
  const [userData, setUserData] = useState({
    studentId: '',
    userName: '',
    mail: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false); // For toggling edit mode

  useEffect(() => {
    const studentId = sessionStorage.getItem("USER_ID"); // Retrieve studentId from sessionStorage

    if (studentId) {
      fetchUserData(studentId);
    } else {
      setError('No student ID found.');
      setLoading(false);
    }
  }, []);

  async function fetchUserData(studentId) {
    try {
      const response = await fetch(`http://localhost:8080/api/rigister/getByid/${studentId}`);
      
      if (response.ok) {
        const data = await response.json();
        setUserData(data);  // Update the state with fetched user data
      } else {
        setError('Error fetching user details');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const studentId = userData.studentId;

      try {
        const response = await fetch(`http://localhost:8080/api/rigister/delete/${studentId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Account deleted successfully!');
          sessionStorage.removeItem("USER_ID"); // Clear session data
          window.location.href = '/'; // Redirect to home page after deletion
        } else {
          setError('Error deleting account');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      }
    }
  }

  function handleUpdateSuccess() {
    setEditing(false); // Exit editing mode on successful update
    fetchUserData(userData.studentId); // Refresh user data
  }

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {editing ? (
            <Update
              studentId={userData.studentId}
              initialData={userData}
              onUpdateSuccess={handleUpdateSuccess}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <div className="card shadow-lg p-4">
              <h2 className="text-center mb-4">Account Details</h2>
              <p><strong>Student ID:</strong> {userData.studentId}</p>
              <p><strong>User Name:</strong> {userData.userName}</p>
              <p><strong>Email:</strong> {userData.mail}</p>
              <p><strong>Password:</strong> {userData.psw}</p>

              <button className="btn btn-outline-primary" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete Account</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manuplate;
