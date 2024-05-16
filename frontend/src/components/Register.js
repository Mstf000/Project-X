import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        level: '',
        avatar: {
            gender: '',
            hair: '',
            eyes: '',
            face: '',
        },
    });
    const [loading, setLoading] = useState(false);

    const { username, password, level, avatar } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('Form Data:', formData);
    };

    const onAvatarChange = (e) => {
        setFormData({
            ...formData,
            avatar: { ...avatar, [e.target.name]: e.target.value },
        });
        console.log('Avatar Data:', avatar);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Submitting form data:', formData);
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('Response:', res.data);
        } catch (err) {
            console.error('Error:', err.response.data);
        }
        setLoading(false);
    };

    return (
        <div className="register-container">
            <form onSubmit={onSubmit}>
                <svg width="317.5px" height="121.4px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317.5 121.4" style={{ background: '#596886' }} preserveAspectRatio="xMidYMid">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffd5af" fontSize="24" fontFamily="Arial, sans-serif">
                        Project X
                    </text>
                </svg>

                <div className="field">
                    <i className="icon-envelope"></i>
                    <input type="text" name="username" className="input" placeholder="Username" value={username} onChange={onChange} required />
                </div>

                <div className="field">
                    <i className="icon-lock"></i>
                    <input type="password" name="password" className="input" placeholder="Password" value={password} onChange={onChange} required />
                </div>

                <div className="field">
                    <select name="level" className="input" value={level} onChange={onChange}>
                        <option value="" disabled>Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div className="field">
                    <select name="gender" className="input" value={avatar.gender} onChange={onAvatarChange}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="field">
                    <input type="text" name="hair" className="input" placeholder="Hair" value={avatar.hair} onChange={onAvatarChange} />
                </div>

                <div className="field">
                    <input type="text" name="eyes" className="input" placeholder="Eyes" value={avatar.eyes} onChange={onAvatarChange} />
                </div>

                <div className="field">
                    <input type="text" name="face" className="input" placeholder="Face" value={avatar.face} onChange={onAvatarChange} />
                </div>

                <div className="submit-button">
                    <button id="button" type="submit">{loading ? <div className="spinner"></div> : 'Register'}</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
