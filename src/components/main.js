import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import './main.css';
import { Link } from 'react-router-dom';

function HomePage() {
    const [name, setName] = useState('');
    const { addPlayer, players } = useContext(PlayerContext);
    const navigate = useNavigate();
    const [questionMarks, setQuestionMarks] = useState([]);

    const handleStartQuiz = () => {
        if (name) {
            addPlayer({ name, score: 0 });
            navigate('/quiz', {
                state: { name }
            });
        } else {
            alert('Please enter your name');
        }
    };

    const handleAddQuestionMark = (e) => {
        const newQuestionMark = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY
        };
        setQuestionMarks([...questionMarks, newQuestionMark]);
    };

    const handleShowAllPlayers = () => {
        alert(players.map(player => `${player.name}: ${player.score}`).join('\n'));
    };

    return (
        <div className='bg-image' onClick={handleAddQuestionMark}>
            {questionMarks.map((mark) => (
                <div
                    key={mark.id}
                    className='question-mark'
                    style={{ top: mark.x, left: mark.y }}
                >
                    ?
                </div>
            ))}

            <Link to="/top-players"> 
                <button className="text-white text-center bg-blue-500 mx-auto backdrop-blur-md w-fit border-white-200 border-solid p-3 rounded-2xl block mt-5">Top Players</button>
            </Link>
            <div className='flex justify-center mt-16'>
                <div className="relative max-w-xxl border backdrop-blur-md border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12 xl:p-7 lg:col-span-3 md:col-span-6">
                    <div className="block w-full mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white w-full">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Enter your name'
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-auto border bg-transparent border-gray-300 text-white text-base rounded-lg block w-full py-1.5 px-2 focus:outline-none"
                        />
                    </div>
                    <button type='button'
                            onClick={handleStartQuiz}
                            className='py-2.5 px-6 mx-auto flex justify-center text-sm rounded-lg bg-red-500 text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-700'>
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;