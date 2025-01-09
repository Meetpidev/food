// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; // Optional: Create a CSS file for styling

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user'); // State for user type

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', { email, password, userType }); // Log user type
        // Here you would typically handle login logic (e.g., API call)
        navigate('/'); // Redirect after login (or to another page)
    };

    return (
        <div className="auth-container">
            <div className="auth-header"  style={{ display: 'flex'}}>
            <h2>Login</h2>
                <div className="user-type" style={{ display: 'flex'}}>
                
                    <label>
                        <input
                            type="radio"
                            value="user"
                            checked={userType === 'user'}
                            onChange={(e) => {
                                setUserType(e.target.value);
                                console.log('Selected User Type:', e.target.value); // Log user type
                            }}
                        />
                        User
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="admin"
                            checked={userType === 'admin'}
                            onChange={(e) => {
                                setUserType(e.target.value);
                                console.log('Selected User Type:', e.target.value); // Log user type
                            }}
                        />
                        Admin
                    </label>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Login;
