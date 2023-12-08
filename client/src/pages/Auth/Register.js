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
    const [buildingHouseNo, setBuildingHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [barangay, setBarangay] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [region, setRegion] = useState("");
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
                address: {
                    buildingHouseNo,
                    street,
                    barangay,
                    city,
                    province,
                    region,
                },
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
        <Layout title={"Registration - Artisan Ecommerce"}>
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
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={buildingHouseNo}
                            onChange={(e) => setBuildingHouseNo(e.target.value)}
                            className="form-control"
                            placeholder='Enter Building/House No.'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="form-control"
                            placeholder='Enter Street'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={barangay}
                            onChange={(e) => setBarangay(e.target.value)}
                            className="form-control"
                            placeholder='Enter Barangay'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control"
                            placeholder='Enter City'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="form-control"
                            placeholder='Enter Province'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="form-control"
                            placeholder='Enter Region'
                            required
                        />
                    </div>
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
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
