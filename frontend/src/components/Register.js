import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        level: '',
        avatar: {
            gender: '',
            hair: '',
            eyes: '',
            face: '',
        },
    });
    const [loading, setLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(true);

    const navigate = useNavigate();

    const { username, password, confirmPassword, level, avatar } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Check username availability when username changes
        if (e.target.name === 'username') {
            checkUsernameAvailability(e.target.value);
        }
    };

    const onAvatarChange = (e) => {
        setFormData({
            ...formData,
            avatar: { ...avatar, [e.target.name]: e.target.value },
        });
    };

    const checkUsernameAvailability = async (username) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/check-username', { username });
            setUsernameAvailable(res.data.available);
        } catch (err) {
            console.error('Error checking username:', err.response.data);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
            setLoading(false);
            return;
        }

        if (!usernameAvailable) {
            Swal.fire({
                title: 'Error!',
                text: 'Username is already taken',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password,
                level,
                avatar
            });
            Swal.fire({
                title: 'Success!',
                text: 'Registration successful',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                navigate('/login');
            });
        } catch (err) {
            console.error('Error:', err.response.data);
            Swal.fire({
                title: 'Error!',
                text: 'Username is already taken',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
        }
        setLoading(false);
    };

    return (
        <div className="ring">
            <i style={{ '--clr': '#00ff0a' }}></i>
            <i style={{ '--clr': '#ff0057' }}></i>
            <i style={{ '--clr': '#fffd44' }}></i>
            <div className="login">
                <h2>Register</h2>
                <form onSubmit={onSubmit}>
                    <div className="inputBx">
                        <input type="text" name="username" placeholder="Username" value={username} onChange={onChange} required />
                        {!usernameAvailable && <span className="error">Username is already taken</span>}
                    </div>
                    <div className="inputBx">
                        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                    </div>
                    <div className="inputBx">
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={onChange} required />
                    </div>
                    <div className="inputBx">
                        <input type="submit" value="Register" />
                    </div>
                    <div className="links">
                        <a href="login">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
