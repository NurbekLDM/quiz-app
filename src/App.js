import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/main';
import QuestionPage from './components/card';
import TopPlayers from './components/TopPlayers';
import { PlayerProvider } from './context/PlayerContext';
import QuizCompleted from './components/QuizCompleted';

function App() {
    return (
        <PlayerProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quiz" element={<QuestionPage />} />
                    <Route path="/top-players" element={<TopPlayers />} />
                    <Route path="/quiz-result" element={<QuizCompleted />} />
                </Routes>
            </Router>
        </PlayerProvider>
    );
}

export default App;
