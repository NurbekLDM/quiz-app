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

    const getHighestScore = () => {
        return players.reduce((max, player) => Math.max(max, player.score), 0);
    };

    const resetScores = () => {
        const resetPlayers = players.map(player => ({ ...player, score: 0 }));
        setPlayers(resetPlayers);
        localStorage.setItem('players', JSON.stringify(resetPlayers));
    };

    return (
        <PlayerContext.Provider value={{ players, addPlayer, updatePlayers, getHighestScore, resetScores }}>
            {children}
        </PlayerContext.Provider>
    );
};