import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useThemeMode } from '../../Context/ThemeMode'
import './Card.css'
import { useLoading } from '../../Context/Loading'
import { toast } from 'react-toastify'


const OneCard = () => {
    const [card, setCard] = useState({});
    const { setLoading } = useLoading();
    const id = window.location.pathname.split('/').pop();
    const { darkMode } = useThemeMode();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`)
            .then(response => {
                setCard(response.data);
                setLoading(false);
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }, [id, setLoading]);

    return (
        <div className={darkMode ? "bg-secondary page" : "bg-primary-subtle page"}>
            <div className="card oneCard mb-3">
                {card.image && <img src={card.image.url} className="card-img-top" alt={card.image.alt} />}
                <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.description}</p>
                    <p className="card-text"><small className="text-body-secondary">{card.subtitle}</small></p>
                    <hr />
                    <div className="card-body">
                        <p>{card.phone}</p>
                        <p>{card.email}</p>
                        {card.address && (
                            <p>
                                {card.address.country}, {card.address.city} {card.address.street} {card.address.houseNumber}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneCard
