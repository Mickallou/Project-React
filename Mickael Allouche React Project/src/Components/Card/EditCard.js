import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useThemeMode } from '../../Context/ThemeMode';
import { toast } from 'react-toastify';
import { useToken } from '../../Context/Token';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../Context/Loading';
import { validateNewCard } from './ValidateNewCard'; 

const EditCard = () => {
    const { theToken } = useToken();
    const [card, setCard] = useState({
        title: '',
        description: '',
        subtitle: '',
        phone: '',
        email: '',
        web: '',
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
    const { setLoading} = useLoading();
    const { id } = useParams();
    const { darkMode } = useThemeMode();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`)
            .then(response => {
                setCard({
                    title: response.data.title,
                    description: response.data.description,
                    subtitle: response.data.subtitle,
                    phone: response.data.phone,
                    email: response.data.email,
                    web: response.data.web,
                    image: {
                        url: response.data.image.url,
                        alt: response.data.image.alt,
                    },
                    address: {
                        state: response.data.address.state,
                        country: response.data.address.country,
                        city: response.data.address.city,
                        street: response.data.address.street,
                        houseNumber: response.data.address.houseNumber,
                        zip: response.data.address.zip,
                    },
                
                });
                setLoading(false);
            })
            .catch(error => {
                toast.error('Error loading card' + error);
                setLoading(false);
            });
    }, [id, setLoading]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const [main, sub] = name.split('.');

        if (sub) {
            setCard(prevCard => ({
                ...prevCard,
                [main]: {
                    ...prevCard[main],
                    [sub]: value
                }
            }));
        } else {
            setCard(prevCard => ({
                ...prevCard,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateNewCard(card, setErrors)) {
            toast.error('Please fix the errors before submitting.');
            return;
        }

        setLoading(true);
        await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, card, 
            { headers: { 'x-auth-token': theToken} })
            .then(() => {
                setLoading(false);
                toast.success('Card updated successfully');
                navigate('/myCards');
            })
            .catch(error => {
                toast.error('Error updating card' + error);
                setLoading(false);
            });

        console.log(card);
    };

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <form onSubmit={handleSubmit}>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name='title' value={card.title} onChange={handleOnChange} placeholder="Title" />
                    <input type="text" className="form-control" name='description' value={card.description} onChange={handleOnChange} placeholder="Description" />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name='subtitle' value={card.subtitle} onChange={handleOnChange} placeholder="Subtitle" />
                    <input type="text" className="form-control" name="phone" value={card.phone} onChange={handleOnChange} placeholder="Phone" />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="email" value={card.email} onChange={handleOnChange} placeholder="Email" />
                    <input type="text" className="form-control" name="web" value={card.web} onChange={handleOnChange} placeholder="Website" />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="image.url" value={card.image.url} onChange={handleOnChange} placeholder="Image URL" />
                    <input type="text" className="form-control" name="image.alt" value={card.image.alt} onChange={handleOnChange} placeholder="Image Alt" />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="address.state" value={card.address.state} onChange={handleOnChange} placeholder="State" />
                    <input type="text" className="form-control" name="address.country" value={card.address.country} onChange={handleOnChange} placeholder="Country" />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="address.city" value={card.address.city} onChange={handleOnChange} placeholder="City" />
                    <input type="text" className="form-control" name="address.street" value={card.address.street} onChange={handleOnChange} placeholder="Street" />
                </div>
                <div className="d-flex mb-3">
                    <input type="text" className="form-control" name="address.houseNumber" value={card.address.houseNumber} onChange={handleOnChange} placeholder="House Number" />
                    <input type="text" className="form-control" name="address.zip" value={card.address.zip} onChange={handleOnChange} placeholder="Zip Code" />
                </div>
                {Object.keys(errors).map((key) => (
                        <div key={key} className="alert alert-danger">{errors[key]}</div>
                    ))}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EditCard;
