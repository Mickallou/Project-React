import React, { useState } from 'react';
import { validateForm } from './Validate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: {
            first: '',
            last: '',
            middle: ''
        },
        phone: '',
        email: '',
        password: '',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: ''
        },
        isBusiness: false
    });

    const [errors, setErrors] = useState({});
    const navigate  = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [main, sub] = name.split('.');

        if (sub) {
            setFormData({
                ...formData,
                [main]: {
                    ...formData[main],
                    [sub]: value
                }
            });
        } else if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (validateForm(formData, setErrors)) {
            try {
                const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', formData);
                navigate('/');
                console.log(response.data);
            } catch (err) {
                setErrors({ apiError: 'Something went wrong. Please try again.' });
                console.log(err);
            }
        }
    };

    return (
        <div>
            <form className='d-flex flex-column justify-content-center align-items-center mt-5 gap-3' onSubmit={handleSubmit}>
                <div className='d-flex flex-row gap-5'>
                        <input type="text" placeholder='First Name*' className="form-control" name='name.first' value={formData.name.first} onChange={handleChange} required />
                        <input type="text" placeholder='Middle Name' className="form-control" name='name.middle' value={formData.name.middle} onChange={handleChange} />
                </div>
                <div className='d-flex flex-row gap-5'>
                        <input type="text" placeholder='Last Name*' className="form-control" name='name.last' value={formData.name.last} onChange={handleChange} required />
                        <input type="text" placeholder='Phone Number*' className="form-control" name='phone' value={formData.phone} onChange={handleChange} required />
                </div>
                <div className='d-flex flex-row gap-5'>
                        <input type="email" placeholder='Email*' className="form-control" name='email' value={formData.email} onChange={handleChange} required />
                        <input type="password" placeholder='Password*' className="form-control" name='password' value={formData.password} onChange={handleChange} required />
                </div>
                <div className='d-flex flex-row gap-5'>
                        <input type="text" placeholder='Image URL' className="form-control" name='image.url' value={formData.image.url} onChange={handleChange} />
                        <input type="text" placeholder='Image ALT' className="form-control" name='image.alt' value={formData.address.state} onChange={handleChange} />
                </div>
                <div className='d-flex flex-row gap-5'>
                        <input type="text" placeholder='State' className="form-control" name='address.state' value={formData.address.state} onChange={handleChange} />
                        <input type="text" placeholder='Country*' className="form-control" name='address.country' value={formData.address.country} onChange={handleChange} required />
                </div>
                <div className='d-flex flex-row gap-5'>
                        <input type="text" placeholder='City*' className="form-control" name='address.city' value={formData.address.city} onChange={handleChange} required />
                        <input type="text" placeholder='Street*' className="form-control" name='address.street' value={formData.address.street} onChange={handleChange} required />
                </div>
                <div className='d-flex flex-row gap-5'>
                        <input type="text" placeholder='House Number*' className="form-control" name='address.houseNumber' value={formData.address.houseNumber} onChange={handleChange} required />
                        <input type="text" placeholder='ZIP Code*' className="form-control" name='address.zip' value={formData.address.zip} onChange={handleChange} required />
                </div>
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor='isBusiness' className="form-check-label">Business</label>
                    <input type="checkbox" className="form-check-input" name='isBusiness' checked={formData.isBusiness} onChange={handleChange} />
                </div>
                {Object.keys(errors).map((key) => (
                    <div key={key} className="alert alert-danger">{errors[key]}</div>
                ))}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Register;
