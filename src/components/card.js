import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlayerContext } from '../context/PlayerContext';
import './card.css';

const fetchQuestions = async () => {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    console.log(response.data);
    return response.data;
};

function QuestionPage() {
    const { state } = useLocation();
    const { name } = state || {};
    const { data: countries, isLoading: isQueryLoading, error } = useQuery({
        queryKey: ["questions"],
        queryFn: fetchQuestions,
    });

    const { addPlayer } = useContext(PlayerContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [countdown, setCountdown] = useState(15);
    const [questions, setQuestions] = useState([]);

    const generateQuestions = () => {
        if (!countries || countries.length === 0) return;
        const newQuestions = [];
        for (let i = 0; i < 10; i++) {
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            if (!randomCountry.capital || randomCountry.capital.length === 0) {
                i--;
                continue;
            }
            const correctAnswer = randomCountry.capital[0];
            const incorrectAnswers = [];
            while (incorrectAnswers.length < 3) {
                const randomIncorrectCountry = countries[Math.floor(Math.random() * countries.length)];
                if (randomIncorrectCountry.capital && randomIncorrectCountry.capital[0] !== correctAnswer) {
                    incorrectAnswers.push(randomIncorrectCountry.capital[0]);
                }
            }
            newQuestions.push({
                country: randomCountry.name.common,
                flag: randomCountry.flags?.png || randomCountry.flags?.svg,
                correct_answer: correctAnswer,
                options: [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5),
            });
        }
        setQuestions(newQuestions);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (countries?.length > 0) {
            generateQuestions();
        }
    }, [countries]);

    useEffect(() => {
        if (countdown === 0) {
            handleNextQuestion(); // Vaqt tugaganda keyingi savolga o'tishi
            return;
        }

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [countdown]);

    useEffect(() => {
        setCountdown(15); // Har yangi savolda qayta o'rnatiladi
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (score > 0) {
            localStorage.setItem('quizResult', JSON.stringify({ score: totalScore + score, totalQuestions: questions.length * 10 }));
        }
    }, [score]);

    const handleAnswer = (answer) => {
        if (selectedAnswer) return; // Javob tanlanganda qayta ishlamaslik uchun
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].correct_answer) {
            setScore((prevScore) => prevScore + 1);
        }
        setShowAnswer(true);
    };

    const handleNextQuestion = () => {
      
        setShowAnswer(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setTotalScore((prevTotalScore) => prevTotalScore + score);
            addPlayer({ name, score: totalScore + score });
            navigate('/quiz-result', { state: { score: totalScore + score, totalQuestions: questions.length } });
        }
    };



    if (isLoading || isQueryLoading) return (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-blue-500 text-xl font-semibold">Yuklanmoqda...</p>
        </div>
      ); 
    if (error) return <div>Error: {error.message}</div>;

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <div>No questions available</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className="text-xl text-center mb-6">What is capital of {currentQuestion.country}</p>
                <img src={currentQuestion.flag} alt="flag" className="mx-auto mb-6" />
                <p className="text-center text-red-500 text-lg mb-4">Time left: {countdown} seconds</p>
                <p className="text-center text-lg mb-4">Score: {score}</p>

                <ul>
                    {currentQuestion.options.map((answer, index) => (
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
                        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuestionPage;
