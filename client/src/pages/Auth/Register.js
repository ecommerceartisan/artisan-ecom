import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import "../../styles/AuthStyle.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [answer, setAnswer] = useState("");

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
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                securityQuestions: [
                    {
                        question: selectedQuestion,
                        answer,
                    }
                ],
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Registration - Atisan Ecommerce"}>
            <div className="form-container">
                <h3>REGISTRATION</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder='Enter Full Name'
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder='Enter Email Address'
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder='Enter Password'
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            placeholder='Enter Phone Number'
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            placeholder='Enter Full Address'
                            required
                            autoFocus
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
                            placeholder='Answer to Security Question'
                            required
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register;
