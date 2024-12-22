import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlayerContext } from '../context/PlayerContext';
import './card.css';

const fetchQuestions = async (category, type, difficulty) => {
    const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    console.log(response.data.results);
    return response.data.results;
};

function QuestionPage() {
    const { state } = useLocation();
    const { category, type, difficulty, name } = state || {};
    const { data: quizData, isLoading: isQueryLoading, error } = useQuery({
        queryKey: ["questions", category, type, difficulty],
        queryFn: () => fetchQuestions(category, type, difficulty),
        enabled: !!category && !!type && !!difficulty, // Faqat kerakli parametrlar mavjud bo'lsa so'rov yuborish
    });

    const { addPlayer } = useContext(PlayerContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        const savedIndex = localStorage.getItem('currentQuestionIndex');
        return savedIndex ? JSON.parse(savedIndex) : 0;
    });
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(() => {
        const savedScore = localStorage.getItem('score');
        return savedScore ? JSON.parse(savedScore) : 0;
    });
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (quizData?.length > 0) {
            setCurrentQuestionIndex(0);
            setScore(0);
        }
    }, [quizData]);

    useEffect(() => {
        localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
        localStorage.setItem('score', JSON.stringify(score));
    }, [currentQuestionIndex, score]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleNextQuestion();
        }, 15000);

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };
    }, [currentQuestionIndex]);

    useEffect(() => {
        setCountdown(15);
    }, [currentQuestionIndex]);

    const handleAnswer = (answer) => {
        if (selectedAnswer) return; 
                setSelectedAnswer(answer);
        if (answer === currentQuestion.correct_answer) {
            setScore((prevScore) => {
                const newScore = prevScore + 1;
                updatePlayerScore(newScore);
                return newScore;
            });
        }
        setShowAnswer(true);
    };

    const updatePlayerScore = (newScore) => {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const updatedPlayers = players.map((player) => {
            if (player.name === name) {
                return { ...player, score: newScore };
            }
            return player;
        });
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    const handleNextQuestion = () => {
        setShowAnswer(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            addPlayer({ name, score });
            navigate('/quiz-result', { state: { score, totalQuestions: quizData.length } });
        }
    };

    if (isLoading || isQueryLoading) return <div className="text-blue mx-auto">Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const currentQuestion = quizData?.[currentQuestionIndex];

    if (!currentQuestion) {
        return <div>No questions available</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Question {currentQuestionIndex + 1} of {quizData.length}
                </h2>
                <p className="text-xl text-center mb-6">{currentQuestion?.question}</p>
                <p className="text-center text-red-500 text-lg mb-4">Time left: {countdown} seconds</p>

                <ul>
                    {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort().map((answer, index) => (
                        <li
                            key={index}
                            className={`py-2 px-4 mb-3 rounded-md text-center text-lg cursor-pointer transition-all duration-300 ${
                                showAnswer
                                    ? answer === currentQuestion.correct_answer
                                        ? "bg-green-400 text-white"
                                        : answer === selectedAnswer
                                            ? "bg-red-400 text-white"
                                            : "bg-gray-200"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => handleAnswer(answer)}
                        >
                            {answer}
                        </li>
                    ))}
                </ul>
                {showAnswer && (
                    <button
                        onClick={handleNextQuestion}
                        className="py-2.5 px-6 justify-center flex mt-5 text-sm bg-blue-500 text-white rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-700">
                        {currentQuestionIndex === quizData.length - 1 ? "Finish" : "Next Question"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuestionPage;
