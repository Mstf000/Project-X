import React, { useState } from 'react';
import axios from 'axios';

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
            <input type='submit' value='Login' />
        </form>
    );
};

export default Login;
