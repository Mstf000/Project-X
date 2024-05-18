import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Ensure this CSS file contains the necessary styles
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate hook

    const { username, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log(res.data);

            // Display success alert
            Swal.fire({
                title: 'Success!',
                text: 'Login successful',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,

            }).then(() => {
                // Redirect to homepage
                navigate('/projects');
            });
        } catch (err) {
            console.error(err.response.data);

            // Display error alert
            Swal.fire({
                title: 'Error!',
                text: 'Login failed',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
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
                    <a href="register">Register</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
