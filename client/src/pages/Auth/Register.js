import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import Layout from '../../components/Layout/Layout'; // Layout component for page structure
import toast from 'react-hot-toast'; // Toast notifications for user feedback
import "../../styles/AuthStyle.css"; // Styling for the component

const Register = () => {
    // State variables to store user input
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    // React Router hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission for user registration
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the '/api/v1/auth/register' endpoint
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                // If the request is successful, show a success message and navigate to the login page
                toast.success(res.data && res.data.message);
                navigate("/login");
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

    // Page layout structure with a title and a registration form
    return (
        <Layout title={"Registration - Atisan Ecommerce"}>
            <div className="form-container">
                <h3>REGISTRATION</h3>
                <form onSubmit={handleSubmit}>
                    {/* Input field for user's full name */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder='Enter Full Name'
                            required
                            autoFocus
                        />
                    </div>
                    {/* Input field for user's email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter Email Address'
                            required
                            autoFocus
                        />
                    </div>
                    {/* Input field for user's password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter Password'
                            required
                            autoFocus
                        />
                    </div>
                    {/* Input field for user's phone number */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder='Enter Phone Number'
                            required
                            autoFocus
                        />
                    </div>
                    {/* Input field for user's full address */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder='Enter Full Address'
                            required
                            autoFocus
                        />
                    </div>
                    {/* Input field for a secret question answer */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='What is your Favorite food?'
                            required
                            autoFocus
                        />
                    </div>
                    {/* Submit button for user registration */}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register;
