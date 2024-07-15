import React, { useState, useEffect } from 'react';
import { useThemeMode } from '../../Context/ThemeMode';
import axios from 'axios';
import './Home.css';
import Card from './../Card/Card';
import { useSearch } from '../../Context/Search';
import { useLoading } from '../../Context/Loading';
import { toast } from 'react-toastify';

const Home = () => {
    const { darkMode } = useThemeMode();
    const [data, setData] = useState([]);
    const { search } = useSearch()
    const { setLoading } = useLoading(false)

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


    return (
        <div className={darkMode ? 'bg-secondary p-3 page' : 'bg-primary-subtle p-3 page'}>
            {search &&
                <h1>Research cards: {search}</h1>
            }
            <div className="container d-flex flex-wrap gap-2 justify-content-center">
                {((search ? data.filter(c => c.title.includes(search)) : data)).map(card => (
                    <Card key={card._id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Home;
