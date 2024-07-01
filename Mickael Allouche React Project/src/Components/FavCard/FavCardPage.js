import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { useThemeMode } from '../../Context/ThemeMode';
import { useTheUser } from '../../Context/TheUser';
import './FavCardPage.css';

const FavCardPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theFavCards, setTheFavCards] = useState([]);
    const { darkMode } = useThemeMode();
    const { theUser } = useTheUser();

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
        if (theUser) {
            if (data.length > 0 && theUser._id) {
                const filteredCards = data.filter(card => card.likes.includes(theUser._id));
                setTheFavCards(filteredCards);
            }
        }
    }, [data, theUser]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            { theUser &&
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {theFavCards.map(card => (
                        <Card key={card._id} card={card} />
                    ))}
                </div>
            }
            { !theUser &&
                <p className='alertMess'>Please log in to view your favorite cards.</p>
            }
        </div>
    );
};

export default FavCardPage;
