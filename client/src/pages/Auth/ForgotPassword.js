import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate hook for navigation
import Layout from '../../components/Layout/Layout'; // Layout component for page structure
import toast from 'react-hot-toast'; // Toast notifications for user feedback
import "../../styles/AuthStyle.css"; // Styling for the component

const ForgotPassword = () => {
  // State variables to store user input
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setAnswer] = useState('');

  // React Router's useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to handle form submission when resetting the password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the '/api/v1/auth/forgot-password' endpoint
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        // If the request is successful, show a success message and navigate to the login page
        toast.success(res.data.message);
        navigate('/login');
      } else {
        // If there's an error, show an error message
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // If there's an unexpected error, display a generic error message
      toast.error('Something went wrong');
    }
  };

  return (
    // Page layout structure with a title and a form for resetting the password
    <Layout title="Reset Password - Artisan Ecommerce">
      <div className="form-container">
        <h3>Reset Password</h3>
        <form onSubmit={handleSubmit}>
          {/* Input field for email */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Email Address"
              required
            />
          </div>
          {/* Input field for secret answer */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter Your Secret Answer"
              required
            />
          </div>
          {/* Input field for new password */}
          <div className="mb-3">
            <input
              type="password" // Use "password" type for password input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Password"
              required
            />
          </div>
          {/* Submit button for password reset */}
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
