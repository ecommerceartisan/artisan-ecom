import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import "../../styles/AuthStyle.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');  // New state for selected security question
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();

    const securityQuestions = [
        "In what city were you born?",
        "What is the name of your favorite pet?",
        "What is your mother's maiden name?",
        "What high school did you attend?",
        "What was the name of your elementary school?",
        "What was the make of your first car?",
        "What was your favorite food as a child?",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', {
                email,
                newPassword,
                securityQuestions: [
                    {
                        question: selectedQuestion,
                        answer,
                    }
                ],
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title="Reset Password - Artisan Ecommerce">
            <div className="form-container">
                <h3>Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Email Address"
                            required
                        />
                    </div>
                    {/* Dropdown for security questions */}
                    <div className="mb-3">
                        <label htmlFor="securityQuestion">Select a Security Question</label>
                        <select
                            id="securityQuestion"
                            className="form-control"
                            value={selectedQuestion}
                            onChange={(e) => setSelectedQuestion(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a question</option>
                            {securityQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Secret Answer"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
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
