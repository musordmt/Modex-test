import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import UserForm from './UserForm';
import config from '../config.json';

const CreateUser = () => {
    const [ formValues ] = useState({name: '', email: ''});

    const navigate = useNavigate();

    const onSubmit = (userObject) => {
        axios.post(config.baseURL, userObject).then(res => {
            if (res.status === 201) {
                toast.success('User created successfully!');
                navigate('/user_list');
            } else
                Promise.reject();
        }).catch((error) => {toast.error(error.response.data.message)});
    }

    return (
        <UserForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
            Create User
        </UserForm>
    );
};

export default CreateUser;