import React, { useState, useEffect } from 'react'
import { useTheUser } from '../../Context/TheUser'
import axios from 'axios'
import Card from './Card'
import { useThemeMode } from '../../Context/ThemeMode'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../Context/Search'
import './Card.css'
import { toast } from 'react-toastify'
import { useLoading } from '../../Context/Loading'
import { ThreeDot } from 'react-loading-indicators'

const BusinessCard = () => {
    const {theUser} = useTheUser()
    const [businessCard, setBusinessCard] = useState([])
    const [data, setData] = useState([]);
    const { darkMode } = useThemeMode();
    const navigate = useNavigate();
    const { search } = useSearch()
    const { loading, setLoading } = useLoading(false)

    useEffect(() => {
            setLoading(true);
            axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                toast.error('Error loading business cards');
                setLoading(false);
            });
    }, [setLoading]);

    useEffect(() => {
        if (theUser && data.length > 0) {
            const filteredCards = data.filter(card => card.user_id.includes(theUser._id));
            setBusinessCard(filteredCards);
        }
    }, [data, theUser, setBusinessCard]);

    if (loading) {
        return (
            <div className={darkMode ? "bg-secondary pt-5 page" : "bg-primary-subtle pt-5 page"}>
                <ThreeDot color="#000000" size={200} />
            </div>
        )
    }

    return (
        <div className={darkMode ? "bg-secondary pt-5 page" : "bg-primary-subtle pt-5 page"}>
            {search &&
            <h1>Research Cards: {search}</h1>
            }
            <div className="d-flex flex-wrap gap-2 justify-content-center">
            { theUser &&
                <>
                <button className="btn newCard" onClick={() => navigate('/newCard')}>New Card</button>
                    {((search ? businessCard.filter(c => c.title.includes(search)) : businessCard)).map(card => (
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
