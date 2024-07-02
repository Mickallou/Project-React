import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../Context/ThemeMode';
import { useToken } from '../../Context/Token';
import { validateNewCard } from './ValidateNewCard';

const NewCard = () => {
    const { darkMode } = useThemeMode();
    const { theToken } = useToken();
    const [card, setCard] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
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
        }
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [main, sub] = name.split('.');

        if (sub) {
            setCard((prevCard) => ({
                ...prevCard,
                [main]: {
                    ...prevCard[main],
                    [sub]: value
                }
            }));
        } else {
            setCard((prevCard) => ({
                ...prevCard,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(card);

        if (validateNewCard(card, setErrors)) {
            try {
                const response = await axios.post(
                    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
                    card,
                    {
                        headers: {
                            'x-auth-token': theToken,
                        },
                    }
                );
                navigate('/myCards');
                console.log(response.data);
            } catch (err) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    apiError: 'Something went wrong. Please try again.'
                }));
                console.error(err);
            }
        }
    };

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <div className='d-flex flex-column  justify-content-center align-items-center gap-3 app'>
                <h1>New Card</h1>
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
                    <div className='d-flex flex-row gap-5'>
                        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
                        <input type="text" name="subtitle" placeholder="Subtitle" onChange={handleChange} required />
                        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
                    </div>
                    <div className='d-flex flex-row gap-5'>
                        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
                        <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="text" name="web" placeholder="Web" onChange={handleChange} required />
                    </div>
                    <div className='d-flex flex-row gap-5'>
                        <input type="text" name="image.url" placeholder="Image URL" onChange={handleChange} />
                        <input type="text" name="image.alt" placeholder="Image Alt" onChange={handleChange} />
                        <input type="text" name="address.state" placeholder="State" onChange={handleChange} />
                    </div>
                    <div className='d-flex flex-row gap-5'>
                        <input type="text" name="address.country" placeholder="Country" onChange={handleChange} required />
                        <input type="text" name="address.city" placeholder="City" onChange={handleChange} required />
                        <input type="text" name="address.street" placeholder="Street" onChange={handleChange} required />
                    </div>
                    <div className='d-flex flex-row gap-5'>
                        <input type="text" name="address.houseNumber" placeholder="House Number" onChange={handleChange} required />
                        <input type="text" name="address.zip" placeholder="Zip" onChange={handleChange} required />
                    </div>
                    {Object.keys(errors).map((key) => (
                        <div key={key} className="alert alert-danger">{errors[key]}</div>
                    ))}
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default NewCard;
