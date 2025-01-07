import React, { useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Link } from 'react-router-dom';

function TopPlayers() {
    const { players, updatePlayers, getHighestScore } = useContext(PlayerContext);

    useEffect(() => {
        updatePlayers();
        const quizResult = JSON.parse(localStorage.getItem('quizResult'));
        if (quizResult) {
            players.push({ name: 'You', score: quizResult.score });
        }
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Top Players</h1>
            <p className="text-xl text-center mt-5">Highest Score: {getHighestScore()}</p>
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