import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useThemeMode } from '../../Context/ThemeMode';
import { toast } from 'react-toastify';
import { useTheUser } from '../../Context/TheUser';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../Context/Token';
import { validateUpUser } from './ValidateUpUser';

const UpdateUser = () => {
    const { theUser } = useTheUser();
    const { theToken } = useToken();
    const [user, setUser] = useState({
        name: {
            first: '',
            last: '',
            middle: '',
        },
        phone: '',
        image: {
            url: '',
            alt: '',
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: '',
        },
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const { darkMode } = useThemeMode();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${theUser._id}`, {
                    headers: { 'x-auth-token': theToken }
                });
                setUser({
                    name: {
                        first: res.data.name.first,
                        last: res.data.name.last,
                        middle: res.data.name.middle,
                    },
                    phone: res.data.phone,
                    image: {
                        url: res.data.image.url,
                        alt: res.data.image.alt,
                    },
                    address: {
                        state: res.data.address.state,
                        country: res.data.address.country,
                        city: res.data.address.city,
                        street: res.data.address.street,
                        houseNumber: res.data.address.houseNumber,
                        zip: res.data.address.zip,
                    },
                });
                setLoading(false);
            } catch (error) {
                setErrors({ general: 'Error fetching user' });
                setLoading(false);
            }
        };
        getUser();
    }, [theUser._id, theToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [main, sub] = name.split('.');

        if (sub) {
            setUser({
                ...user,
                [main]: {
                    ...user[main],
                    [sub]: value
                }
            });
        } else {
            setUser({
                ...user,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateUpUser(user, setErrors)) {
            try {
                await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${theUser._id}`, user, {
                    headers: { 'x-auth-token': theToken }
                });
                toast.success('User updated successfully');
                navigate('/');
            } catch (error) {
                toast.error('Error updating user');
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (errors.general) {
        return <p>{errors.general}</p>;
    }

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center align-items-center gap-3 '>
                    <div className="mb-3">
                        <label htmlFor="first" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first" name="name.first" value={user.name.first} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="middle" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="middle" name="name.middle" value={user.name.middle} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3 '>
                    <div className="mb-3">
                        <label htmlFor="last" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last" name="name.last" value={user.name.last} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3 '>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">Image URL</label>
                        <input type="text" className="form-control" id="url" name="image.url" value={user.image.url} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alt" className="form-label">Image Alt</label>
                        <input type="text" className="form-control" id="alt" name="image.alt" value={user.image.alt} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3 '>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" id="state" name="address.state" value={user.address.state} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" className="form-control" id="country" name="address.country" value={user.address.country} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3 '>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="address.city" value={user.address.city} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street" name="address.street" value={user.address.street} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3 '>
                    <div className="mb-3">
                        <label htmlFor="houseNumber" className="form-label">House Number</label>
                        <input type="text" className="form-control" id="houseNumber" name="address.houseNumber" value={user.address.houseNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" name="address.zip" value={user.address.zip} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center gap-3 '>
                {Object.keys(errors).map((key) => (
                    <div key={key} className="alert alert-danger">{errors[key]}</div>
                ))}
                <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
