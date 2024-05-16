import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        code: '',
    });

    const { title, description, code } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/projects', formData);
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
                    placeholder='Title'
                    name='title'
                    value={title}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <textarea
                    placeholder='Description'
                    name='description'
                    value={description}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <textarea
                    placeholder='Code'
                    name='code'
                    value={code}
                    onChange={onChange}
                    required
                />
            </div>
            <input type='submit' value='Add Project' />
        </form>
    );
};

export default ProjectForm;
