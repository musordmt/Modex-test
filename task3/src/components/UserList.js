import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import toast from 'react-hot-toast';

import UserTableElement from './UserTableElement';
import config from '../config.json';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(config.baseURL).then(({ data }) => {
            setUsers(data);
        }).catch((error) => toast.error(error.response.data.message));
    }, []);

    const deleteUser = (id) => {
        axios.delete(config.baseURL + id).then((res) => {
            if (res.status === 204) { 
                toast.success('User deleted successfully!');
                setUsers(users.filter(user => user.id !== id));
            } else {
                Promise.reject();
            }
        }).catch((error) => toast.error(error.response.data.message));
    };

    const DataTable = () => {
        return users.map((res, i) => {
            return <UserTableElement obj={res} key={i} deleteUser={deleteUser}/>;
        });
    };

    return (
        <div className='table-wrapper'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default UserList;