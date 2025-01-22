import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

function QuizCompleted() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { score, totalQuestions } = state || JSON.parse(localStorage.getItem('quizResult')) || {};
    const { resetScores } = useContext(PlayerContext);

    useEffect(() => {
        if (state) {
            localStorage.setItem('quizResult', JSON.stringify({ score, totalQuestions }));
        }
    }, [state]);

    const handlePlayAgain = () => {
        navigate('/quiz');
        resetScores();
    };

    const getFinalMessage = () => {
        if (score >= 8) return "Siz dahosiz!";
        if (score >= 5) return "Siz yaxshiroq bajara olasiz!";
        return "Keyingi safar ko'proq harakat qiling!";
    };

    return (
        <div className="flex justify-center mt-32 items-center min-h-screen">
            <div className="w-full max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
                <h1 className="text-3xl font-bold text-center">Quiz Completed!</h1>
                <p className="text-2xl text-center mt-5">Your Score: {score} / {totalQuestions}</p>
                <p className="text-xl text-center mt-5">{getFinalMessage()}</p>
                <div className="flex flex-col mt-10">
                    <Link to="/">
                        <button type='button' className='py-2.5 w-32 mx-auto justify-center flex mt-5 px-6 text-sm bg-indigo-500 text-white rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>
                            Home
                        </button>
                    </Link>
                    <Link to="/top-players">
                        <button type='button' className='py-2.5 justify-center flex w-32 mx-auto mt-5 px-6 text-sm bg-indigo-500 text-white rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>
                            Top Players
                        </button>
                    </Link>
                    <button type='button' onClick={handlePlayAgain} className='py-2.5 justify-center flex w-32 mx-auto mt-5 px-6 text-sm bg-green-500 text-white rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-green-700'>
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizCompleted;