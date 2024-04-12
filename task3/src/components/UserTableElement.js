import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserTableElement = ({obj, deleteUser}) => {
    const { id, name, email } = obj;

    const handleUser = () => {
        deleteUser(id);
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                <Link className='edit-link' to={'/edit_user/' + id}>Edit</Link>
                <Button onClick={handleUser} size='sm' variant='danger'>Delete</Button>
            </td>
        </tr>
    );
};

export default UserTableElement;