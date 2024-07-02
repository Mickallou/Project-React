import React, { useState, useEffect } from 'react';
import { useThemeMode } from '../../Context/ThemeMode';
import axios from 'axios';
import './Home.css';
import Card from './../Card/Card';

const Home = () => {
    const { darkMode } = useThemeMode();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    console.log('data:', data);
    return (
        <div className={darkMode ? 'bg-secondary p-3 page' : 'bg-primary-subtle p-3 page'}>
            <div className="container d-flex flex-wrap gap-2 justify-content-center">
                {data.map(card => (
                    <Card key={card._id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Home;
