import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useThemeMode } from '../../Context/ThemeMode'
import './Card.css'


const OneCard = () => {
    const [card, setCard] = useState({});
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
    }
    , [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <div class="card oneCard mb-3">
                <img src={card.image.url} class="card-img-top" alt={card.image.alt} />
                <div class="card-body">
                    <h5 class="card-title">{card.title}</h5>
                    <p class="card-text">{card.description}</p>
                    <p class="card-text"><small class="text-body-secondary">{card.subtitle}</small></p>
                    <hr />
                    <div class="card-body">
                        <p>{card.phone}</p>
                        <p>{card.email}</p>
                        <p>{card.address.country}, {card.address.city} {card.address.street} {card.address.houseNumber}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default OneCard
