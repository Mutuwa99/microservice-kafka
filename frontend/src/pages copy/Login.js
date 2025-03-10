import React, { useState } from 'react';
import '../css/login.css'; // Import CSS file if you have one
import { useNavigate } from 'react-router-dom'; 
import $ from 'jquery'; // Import jQuery

function Login() {
    const [formToggle, setFormToggle] = useState('loginForm');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State variable to store the error message
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = (e) => {
        e.preventDefault();

        // AJAX request using jQuery
        $.ajax({
            url: 'http://a3fe3c5d0baf64c6c9b9a7369c3107d5-1386907883.us-east-1.elb.amazonaws.com:8000/api/v2/auth/login',
            method: 'POST',
            contentType: 'application/json',    
            data: JSON.stringify({ username, password }),
            success: function(data) {
                if (data.success) {
                    // Navigate to the dashboard route and pass user data and other data as state
                    localStorage.setItem('authToken', data.user.token);
                    localStorage.setItem('email', data.user.email);
                    

                        if(data.user.role == 'Admin'){
                            navigate('/dashboard', { 
                                state: { 
                                    userData: data
                                } 
                            });
                        }else{
                            //you are a doctor 
                            navigate('/doctors-dash', { 
                                state: { 
                                    userData: data
                                } 
                            });

                            localStorage.setItem('id', data.user.id);

                        }        
                } else {
                    // Login failed, set error message
                    setError('Invalid username or password');
                }
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error('Error logging in:', error);
                setError('Error logging in. Please try again later.');
            }
        });
    };

    return (
        <>
        <div className="login-page"> {/* Add a class name for the login page */}
      
            <input
                type="radio"
                id="loginForm"
                name="formToggle"
                checked={formToggle === 'loginForm'}
                onChange={() => setFormToggle('loginForm')}
            />
            <input
                type="radio"
                id="registerForm"
                name="formToggle"
                checked={formToggle === 'registerForm'}
                onChange={() => setFormToggle('registerForm')}
            />
            <input
                type="radio"
                id="forgotForm"
                name="formToggle"
                checked={formToggle === 'forgotForm'}
                onChange={() => setFormToggle('forgotForm')}
            />
             
            {formToggle === 'loginForm' && (
                <div className="wrapper" id="loginFormContent">
                    <form onSubmit={handleSubmit}> {/* Add onSubmit event handler to the form */}
                        <h2>Patient Management App</h2>
                        {error && <p className="error">{error}</p>} {/* Render error message if exists */}
                        <div className="input-box">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="input-box">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="checkbox1">
                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>
                            <label htmlFor="forgotForm">Forgot Password</label>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <div className="link">
                            <p>Don't have an account? <label htmlFor="registerForm">Register</label></p>
                        </div>
                    </form>
                </div>
            )}

            {/* Add other form contents for register and forgot password here */}
        </div>
        </> 
    );
}

export default Login;
