import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigate, useLocation } from "react-router-dom"; // React Router hooks for navigation
import Layout from '../../components/Layout/Layout'; // Layout component for page structure
import toast from 'react-hot-toast'; // Toast notifications for user feedback
import { useAuth } from '../../context/auth'; // Custom context for managing user authentication
import "../../styles/AuthStyle.css"; // Styling for the component

const Login = () => {
    // State variables to store user input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth(); // Custom authentication context

    // React Router hooks for navigation
    const navigate = useNavigate();
    const location = useLocation();

    // Function to handle form submission when logging in
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the '/api/v1/auth/login' endpoint
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                // If the request is successful, show a success message and update the authentication context
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                // If there's an error, show an error message
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // If there's an unexpected error, display a generic error message
            toast.error("Something went wrong");
        }
    };

    return (
        // Page layout structure with a title and a login form
        <Layout title={"Sign In - Atisan Ecommerce"}>
            <div className="form-container">
                <h3>L O G I N</h3>
                <form onSubmit={handleSubmit}>
                     {/* Input field for email */}
                     <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter Email Address'
                            required
                        />
                    </div>
                    {/* Input field for password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter Password'
                            required
                        />
                    </div>
                    {/* Submit button for login */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </div>
                    {/* Button for resetting the password (navigate to the forgot password page) */}
                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {navigate('/forgot-password')}}
                        >
                            Forgot Password
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
