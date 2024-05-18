import React, { useState } from 'react';
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
        <div className="ring">
            <i style={{ '--clr': '#00ff0a' }}></i>
            <i style={{ '--clr': '#ff0057' }}></i>
            <i style={{ '--clr': '#fffd44' }}></i>
            <div className="login">
                <h2>Register</h2>
                <form onSubmit={onSubmit}>
                    <div className="inputBx">
                        <input type="text" name="username" placeholder="Username" value={username} onChange={onChange} required />
                    </div>
                    <div className="inputBx">
                        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                    </div>
                    <div className="inputBx">
                        <select name="level" value={level} onChange={onChange}>
                            <option value="" disabled>Select Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="inputBx">
                        <select name="gender" value={avatar.gender} onChange={onAvatarChange}>
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="inputBx">
                        <input type="text" name="hair" placeholder="Hair" value={avatar.hair} onChange={onAvatarChange} />
                    </div>
                    <div className="inputBx">
                        <input type="text" name="eyes" placeholder="Eyes" value={avatar.eyes} onChange={onAvatarChange} />
                    </div>
                    <div className="inputBx">
                        <input type="text" name="face" placeholder="Face" value={avatar.face} onChange={onAvatarChange} />
                    </div>
                    <div className="inputBx">
                        <button type="submit">{loading ? <div className="spinner"></div> : 'Register'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
