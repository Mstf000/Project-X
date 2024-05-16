import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Ensure this CSS file contains the necessary styles

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={onSubmit}>
                <svg width="317.5px" height="121.4px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317.5 121.4" style={{ background: '#596886' }} preserveAspectRatio="xMidYMid">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffd5af" fontSize="24" fontFamily="Arial, sans-serif">
                        Project X
                    </text>
                </svg>
                <div className="field">
                    <i className="icon-envelope"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        className="input"
                        required
                    />
                </div>
                <div className="field">
                    <i className="icon-lock"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="input"
                        required
                    />
                </div>
                <div className="submit-button">
                    <button type="submit" className="button">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
