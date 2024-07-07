import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useThemeMode } from '../../Context/ThemeMode';
import { toast } from 'react-toastify';
import { useToken } from '../../Context/Token';


const EditCard = () => {
    const { theToken } = useToken();
    const [card, setCard] = useState({
        title: '',
        description: '',
        subtitle: '',
        phone: '',
        email: '',
        address: {
            country: '',
            city: '',
            street: '',
            houseNumber: ''
        }
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const id = window.location.pathname.split('/').pop();
    const { darkMode } = useThemeMode();

    useEffect(() => {
        axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`)
            .then(response => {
                setCard(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching card:', error);
                setError('Error fetching card');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setCard(prevCard => ({
                ...prevCard,
                address: {
                    ...prevCard.address,
                    [addressField]: value
                }
            }));
        } else {
            setCard({ ...card, [name]: value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, card, 
            { headers: { 'x-auth-token': theToken} })
            .then(() => {
                toast.success('Card updated successfully');
            })
            .catch(error => {
                setError('Error updating card: ' + error.message);
                toast.error('Error updating card');
            });
    }

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <form onSubmit={handleSubmit}>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name='title' value={card.title} placeholder='Title' onChange={handleOnChange} />
                    <input type="text" className="form-control" name='description' value={card.description} placeholder='Description' onChange={handleOnChange} />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name='subtitle' value={card.subtitle} placeholder='Subtitle' onChange={handleOnChange} />
                    <input type="text" className="form-control" name="phone" value={card.phone} placeholder='Phone' onChange={handleOnChange} />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="email" value={card.email} placeholder='Email' onChange={handleOnChange} />
                    <input type="text" className="form-control" name="address.country" value={card.address.country} placeholder='Country' onChange={handleOnChange} />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="address.city" value={card.address.city} placeholder='City' onChange={handleOnChange} />
                    <input type="text" className="form-control" name="address.street" value={card.address.street} placeholder='Street' onChange={handleOnChange} />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="address.houseNumber" value={card.address.houseNumber} placeholder='House Number' onChange={handleOnChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditCard;
