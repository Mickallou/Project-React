import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { useThemeMode } from '../../Context/ThemeMode';
import { useTheUser } from '../../Context/TheUser';
import './FavCardPage.css';
import { useFavCardUser } from '../../Context/FavCardUser';
import { useSearch } from '../../Context/Search';

const FavCardPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useThemeMode();
    const { theUser } = useTheUser();
    const { favCardUser, setFavCardUser } = useFavCardUser();
    const { search } = useSearch()

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
            const filteredCards = data.filter(card => card.likes.includes(theUser._id));
            setFavCardUser(filteredCards);
        }
    }, [data, theUser, setFavCardUser]); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            { search && 
                <h1>Research cards: {search}</h1>
            }

            { theUser &&
                <div className="d-flex flex-wrap gap-2 justify-content-center">

                    {(search ? favCardUser.filter(c => c.title.includes(search)) : favCardUser).map(card => (
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
