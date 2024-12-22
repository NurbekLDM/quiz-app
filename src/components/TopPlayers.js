import React, { useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Link } from 'react-router-dom';

function TopPlayers() {
    const { players, updatePlayers } = useContext(PlayerContext);

    useEffect(() => {
        updatePlayers();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Top Players</h1>
            <ul className="mt-5">
                {players.sort((a, b) => b.score - a.score).map((player, index) => (
                    <li key={index} className="text-xl text-center">
                        {player.name}: {player.score} points
                    </li>
                ))}
            </ul>
            <Link to="/">
                <button className='btn flex justify-center rounded-lg mt-8 p-2 w-24 bg-blue-500 text-white mx-auto'>
                    Home
                </button>
            </Link>
        </div>
    );
}

export default TopPlayers;