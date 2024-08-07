import React, { useEffect, useState } from 'react';
import getAllUsers from '../../Components/Getting/getAllUsers';
import { useToken } from '../../Context/Token';
import { useTheUser } from '../../Context/TheUser';
import axios from 'axios';
import './Sandbox.css';
import { useLoading } from '../../Context/Loading';
import { toast } from 'react-toastify';

const Sandbox = () => {
    const { theToken } = useToken();
    const { theUser } = useTheUser();
    const [users, setUsers] = useState([]);
    const { setLoading } = useLoading(false);

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            try {
                const user = await getAllUsers(theToken);
                setUsers(user);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error('Error fetching users');
            }
        };
        fetchUsers();
    }, [theToken, theUser, setLoading]);

    const handleBusinessChange = (id) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === id ? { ...user, isBusiness: !user.isBusiness } : user
            )
        );
    };

    const handleDeleteCard = () => {
        axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${theUser._id}`,
            { headers: { 'x-auth-token': theToken } }
            )
            .then(response => {
                toast.success('Card deleted');
            })
            .catch(error => {
                toast.error('Error deleting card' + error);
            });
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Business</th>
                        <th>Change Business</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.isBusiness ? 'True' : 'False'}</td>
                            <td>
                                <button type="button" className="btn btn-outline-primary" onClick={() => handleBusinessChange(user._id)}>Change</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-outline-primary" onClick={handleDeleteCard}>Delete</button><br />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sandbox;
