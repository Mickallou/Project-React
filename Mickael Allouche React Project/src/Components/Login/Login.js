import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../Context/Token';
import { toast } from 'react-toastify'; 

const Login = () => {
    const { setTheToken } = useToken();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', user);
            const token = localStorage.setItem('token', response.data);
            setTheToken(token);
            toast.success('You are now logged in!');
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            toast.error('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className='w-auto h-auto p-3'>
            <h1>Login</h1>
            <form className='d-flex flex-column justify-content-center align-items-center mt-5 gap-3' onSubmit={handleSubmit}>
                <div className='d-flex flex-row gap-5'>
                    <div className="mb-3">
                        <label htmlFor='email' className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={user.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={user.password} onChange={handleChange} required />
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
