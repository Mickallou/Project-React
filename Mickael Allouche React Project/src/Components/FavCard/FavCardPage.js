import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { useThemeMode } from '../../Context/ThemeMode';
import { useTheUser } from '../../Context/TheUser';
import './FavCardPage.css';
import { useFavCardUser } from '../../Context/FavCardUser';
import { useSearch } from '../../Context/Search';
import { useLoading } from '../../Context/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FavCardPage = () => {
    const [data, setData] = useState([]);
    const { darkMode } = useThemeMode();
    const { theUser } = useTheUser();
    const { favCardUser, setFavCardUser } = useFavCardUser();
    const { search } = useSearch()
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false); 
                navigate('/');
            });
    }, [setLoading, navigate]);

    useEffect(() => {
        if (theUser && data.length > 0) {
            const filteredCards = data.filter(card => card.likes.includes(theUser._id));
            setFavCardUser(filteredCards);
        }
    }, [data, theUser, setFavCardUser]); 

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
