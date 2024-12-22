import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('players')) || []);

    const addPlayer = (player) => {
        const existingPlayerIndex = players.findIndex(p => p.name === player.name);
        let updatedPlayers;

        if (existingPlayerIndex !== -1) {
  
            updatedPlayers = players.map((p, index) => {
                if (index === existingPlayerIndex) {
                    return {
                        ...p,
                        score: Math.max(p.score, player.score)
                    };
                }
                return p;
            });
        } else {
             updatedPlayers = [...players, player];
        }

        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    const updatePlayers = () => {
        const updatedPlayers = JSON.parse(localStorage.getItem('players')) || [];
        setPlayers(updatedPlayers);
    };

    return (
        <PlayerContext.Provider value={{ players, addPlayer, updatePlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};