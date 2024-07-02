import React, { useState, useEffect } from 'react'
import { useTheUser } from '../../Context/TheUser'
import axios from 'axios'
import Card from './Card'
import { useThemeMode } from '../../Context/ThemeMode'
import { useNavigate } from 'react-router-dom'
import './Card.css'

const BusinessCard = () => {
    const {theUser} = useTheUser()
    const [businessCard, setBusinessCard] = useState([])
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useThemeMode();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false); 
            });
    }, []);

    useEffect(() => {
        if (theUser && data.length > 0) {
            const filteredCards = data.filter(card => card.user_id.includes(theUser._id));
            setBusinessCard(filteredCards);
        }
    }, [data, theUser, setBusinessCard]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
            { theUser &&
                <>
                <button className="btn newCard" onClick={() => navigate('/newCard')}>New Card</button>
                    {businessCard.map(card => (
                        <Card key={card._id} card={card} />
                    ))}
                </>
                }
            { !theUser &&
                <p className='alertMess'>Please log in to view your business cards.</p>
            }
        
            </div>
        </div>
    )
}

export default BusinessCard
