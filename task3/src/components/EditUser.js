import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import UserForm from './UserForm';
import config from '../config.json';

const EditUser = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ name: '', email: ''});
    const onSubmit = (userObject) => {
        axios.put(config.baseURL + userId, userObject).then((res) => {
            if (res.status === 200) {
                toast.success('User updated successfully!');
                navigate('/user_list');
            } else {
                Promise.reject();
            }
        }).catch((error) => toast.error(error.response.data.message));
    };

    useEffect(() => {
        axios.get(config.baseURL + userId).then((res) => {
                const {name, email} = res.data;
                setFormValues({ name, email});
        }).catch((error) => toast.error(error.response.data.message));
    }, [userId]);

    return (
        <UserForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
            Update User
        </UserForm>
    );
};

export default EditUser;