import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import './main.css';
import { Link } from 'react-router-dom';

function HomePage() {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const { addPlayer } = useContext(PlayerContext);
    const navigate = useNavigate();
    const [questionMarks, setQuestionMarks] = useState([]);

    const handleStartQuiz = () => {
        if (name) {
            addPlayer({ name, score: 0 });
            setIsLoading(true);
            navigate('/quiz', {
                state: { category, type, difficulty, name }
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
             <button className="text-white text-center bg-blue-500 mx-auto backdrop-blur-md w-fit border-white-200 border-solid p-3 rounded-2xl  block mt-5">Top Players</button>
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
                    <div className="block w-full mb-4">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-white w-full">Category</label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="category"
                            required
                            className="h-auto border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1.5 px-2 focus:outline-none">
                            <option defaultValue="" >Choose category</option>
                           <option value="9">General Knowledge</option> 
                           <option value="10">Entertainment: Books</option>
                           <option value="11">Entertainment: Films </option>
                            <option value="12">Entertainment: Music </option>
                            <option value="13">Entertainment: Musicals & Theatres</option>
                            <option value="14">Entertainment: Televesion </option>
                            <option value="15">Entertainment: Video games</option>
                            <option value="16">Entertainment: Board game </option>
                            <option value="17">Science & Nature </option>
                            <option value="18">Science & Computers </option>
                            <option value="19">Science & Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports </option>
                            <option value="22">Geography </option>
                            <option value="23">History </option>
                            <option value="24">Politics </option>
                            <option value="25">Art </option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </select>
                    </div>
                    <div className="block w-full mb-4">
                        <label htmlFor="small_select" className="block mb-2 text-sm font-medium text-white w-full">Type</label>
                        <select
                            required
                            onChange={(e) => setType(e.target.value)}
                            id="small_select"
                            className="h-auto border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1.5 px-2 focus:outline-none">
                            <option defaultValue="">Choose type</option>
                            <option value="multiple">Multiple</option>
                            <option value="boolean">True/False</option>
                        </select>
                    </div>
                    <div className="block w-full mb-4">
                        <label htmlFor="difficulty_select" className="block mb-2 text-sm font-medium text-white w-full">Difficulty</label>
                        <select
                            required
                            onChange={(e) => setDifficulty(e.target.value)}
                            id="difficulty_select"
                            className="h-auto border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1.5 px-2 focus:outline-none">
                            <option defaultValue="">Choose difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
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