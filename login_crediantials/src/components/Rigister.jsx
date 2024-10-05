import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    // Password Regex Pattern: Minimum 8 characters and at least 1 number
    const passwordPattern = `(?=.*[0-9]).{8,}`;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? '' : 'Invalid email address.';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submission
        const emailError = validateEmail(email);

        if (emailError || !username || password === '') {
            setErrors({
                username: username ? '' : 'Username is required.',
                email: emailError,
                password: password ? '' : 'Password is required.'
            });
            return;
        }

        const userData = {
            userName: username,
            mail: email,
            psw: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/rigister/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success('Registration successful!', {
                    position: "top-center",
                    autoClose: 2000,
                });
                setUsername('');
                setEmail('');
                setPassword('');
                setErrors({ username: '', email: '', password: '' });

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error('Error: Registration failed. Please try again.', {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error. Please try again later.', {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    // Handle real-time input validation
    const handleInputChange = (field, value) => {
        if (field === 'username') {
            setUsername(value);
            setErrors((prev) => ({ ...prev, username: value ? '' : 'Username is required.' }));
        }
        if (field === 'email') {
            setEmail(value);
            setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="form-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            required
                        />
                        <span className="icon"><i className="fa fa-user"></i></span>
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="input-field">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                        />
                        <span className="icon"><i className="fa fa-envelope"></i></span>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            pattern={passwordPattern}
                            title="Password must be at least 8 characters long and contain at least one number."
                        />
                        <span className="icon"><i className="fa fa-lock"></i></span>
                        {errors.password && <p className="error">{errors.password}</p>}
                        <p className="password-hint">Minimum 8 characters, at least 1 number.</p>
                    </div>
                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
            <div className="welcome-section">
                <h1>WELCOME</h1>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
        </div>
    );
};

export default Register;
