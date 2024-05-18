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
        <div className="ring">
            <i style={{ '--clr': '#00ff0a' }}></i>
            <i style={{ '--clr': '#ff0057' }}></i>
            <i style={{ '--clr': '#fffd44' }}></i>
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="inputBx">
                        <input type="submit" value="Sign in" />
                    </div>
                </form>
                <div className="links">
                    <a href="#">Forget Password</a>
                    <a href="#">Signup</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
