import React, { useState } from 'react';
import axios from 'axios';

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

    const { username, password, level, avatar } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onAvatarChange = (e) =>
        setFormData({
            ...formData,
            avatar: { ...avatar, [e.target.name]: e.target.value },
        });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <select name='level' value={level} onChange={onChange}>
                    <option value='' disabled>
                        Select Level
                    </option>
                    <option value='beginner'>Beginner</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='advanced'>Advanced</option>
                </select>
            </div>
            <div>
                <select name='gender' value={avatar.gender} onChange={onAvatarChange}>
                    <option value='' disabled>
                        Select Gender
                    </option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Hair'
                    name='hair'
                    value={avatar.hair}
                    onChange={onAvatarChange}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Eyes'
                    name='eyes'
                    value={avatar.eyes}
                    onChange={onAvatarChange}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Face'
                    name='face'
                    value={avatar.face}
                    onChange={onAvatarChange}
                />
            </div>
            <input type='submit' value='Register' />
        </form>
    );
};

export default Register;
