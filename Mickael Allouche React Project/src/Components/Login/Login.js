import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../Context/Token';
import { toast } from 'react-toastify'; 
import { useThemeMode } from '../../Context/ThemeMode';
import { useLoading } from '../../Context/Loading';

const Login = () => {
    const { setTheToken } = useToken();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { darkMode } = useThemeMode();
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', user);
            const token = localStorage.setItem('token', response.data);
            setTheToken(token);
            setLoading(false);
            toast.success('You are now logged in!');
            navigate('/');
        } catch (err) {
            toast.error('Invalid email or password. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={darkMode ? 'bg-secondary logPage' : 'bg-primary-subtle logPage'}>
                <h1>Login</h1>
                <form className='d-flex  flex-column justify-content-center align-items-center mt-5 gap-3' onSubmit={handleSubmit}>
                    <div className='d-flex flex-wrap flex-row gap-5 align-items-center'>
                        <div className="mb-3">
                            <label htmlFor='email' className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' value={user.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' value={user.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className={darkMode ? "btn btn-dark" : "btn btn-primary" }>Submit</button>
                </form>
        </div>
    );
};

export default Login;
