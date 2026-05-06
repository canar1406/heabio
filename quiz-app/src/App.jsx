import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';

export default function App() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error('Failed to load quiz data', err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#f4f7f6] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home quizzes={quizzes} />} />
            <Route path="/quiz/:slug" element={<Quiz quizzes={quizzes} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
