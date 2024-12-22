import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function QuizCompleted() {
    const { state } = useLocation();
    const { score, totalQuestions } = state || {};

    return (
        <div className="flex justify-center mt-32 items-center min-h-screen">
            <div className="w-full max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
                <h1 className="text-3xl font-bold text-center">Quiz Completed!</h1>
                <p className="text-2xl text-center mt-5">Your Score: {score} / {totalQuestions}</p>
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
                </div>
            </div>
        </div>
    );
}

export default QuizCompleted;