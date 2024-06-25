import React, { useContext, createContext, useState } from 'react';

const FavCardContext = createContext();

export const FavCardProvider = ({ children }) => {
    const [favCards, setFavCards] = useState([]);

    const toggleFavCard = (cardId) => {
        if (favCards.includes(cardId)) {
            setFavCards(favCards.filter(id => id !== cardId));
        } else {
            setFavCards([...favCards, cardId]);
        }
    };

    return (
        <FavCardContext.Provider value={{ favCards, toggleFavCard }}>
            {children}
        </FavCardContext.Provider>
    );
};

export const useFavCard = () => {
    return useContext(FavCardContext);
};
