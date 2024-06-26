import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { useTheUser } from '../../Context/TheUser';
import axios from 'axios';
import { useToken } from '../../Context/Token';

const Card = ({ card }) => {
    const { theUser } = useTheUser();
    const { theToken } = useToken();
    const [userFavTheCard, setUserFavTheCard] = useState(false);

    useState(() => {
        if (theUser && card.likes.includes(theUser._id)) {
            setUserFavTheCard(true);
        }
    }, [theUser, card.likes]);

    const handleClickedFavCard = () => {
        if (theUser) {
            const newLikes = userFavTheCard ? 
                card.likes.filter(like => like !== theUser._id) : 
                [...card.likes, theUser._id];

            axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                { likes: newLikes },
                { headers: { 'x-auth-token': theToken } }
                )
                .then(response => {
                    card.likes = newLikes;
                    setUserFavTheCard(!userFavTheCard);
                })
                .catch(error => {
                    console.error('Error updating likes:', error);
                });
        }
    };

    const handleClickedCard = () => {
        return (
            <Link to={`/card/${card._id}`} />
        );
    };

    return (
        <div className="card">
            <img src={card.image.url} className="card-img-top" alt={card.image.alt} onClick={handleClickedCard} />
            <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <h6 className="card-subtitle mb-2 mt-1 text-body-secondary">{card.subtitle}</h6>
                <hr />
                <p className="mb-1">Phone: {card.phone}</p>
                <p className="address mb-1">Address: {card.address.street} {card.address.houseNumber}, {card.address.city} {card.address.country}</p>
                <p>Card Number: {card.bizNumber}</p>
                <section className="iconCard d-flex mt-4 justify-content-end gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill={userFavTheCard ? 'red' : 'currentColor'} onClick={handleClickedFavCard} className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                </section>
            </div>
        </div>
    );
};

export default Card;
