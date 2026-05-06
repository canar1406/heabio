import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MultipleChoice from '../components/MultipleChoice';
import TrueFalse from '../components/TrueFalse';
import ShortAnswer from '../components/ShortAnswer';
import Sidebar from '../components/Sidebar';

// Utility to shuffle an array
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function Quiz({ quizzes }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [quizData, setQuizData] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  
  const [answersP1, setAnswersP1] = useState({});
  const [answersP2, setAnswersP2] = useState({});
  const [answersP3, setAnswersP3] = useState({});
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ correctOperations: 0, totalOperations: 0 });

  useEffect(() => {
    if (quizzes.length === 0) return;
    
    const quiz = quizzes.find(q => q.slug === slug);
    if (!quiz) {
      navigate('/');
      return;
    }
    
    // Shuffle questions
    const shuffledData = {
      ...quiz.data,
      part1_multipleChoice: shuffleArray(quiz.data.part1_multipleChoice || []),
      part2_trueFalse: shuffleArray(quiz.data.part2_trueFalse || []),
      part3_shortAnswer: shuffleArray(quiz.data.part3_shortAnswer || []),
    };
    
    setQuizData(shuffledData);
    setSelectedQuiz(quiz);
    setAnswersP1({});
    setAnswersP2({});
    setAnswersP3({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo(0, 0);
  }, [slug, quizzes, navigate]);

  const handleRetake = () => {
    // Force re-initialization by cloning the object (useEffect won't trigger if slug is same)
    if (selectedQuiz) {
        const shuffledData = {
          ...selectedQuiz.data,
          part1_multipleChoice: shuffleArray(selectedQuiz.data.part1_multipleChoice || []),
          part2_trueFalse: shuffleArray(selectedQuiz.data.part2_trueFalse || []),
          part3_shortAnswer: shuffleArray(selectedQuiz.data.part3_shortAnswer || []),
        };
        setQuizData(shuffledData);
        setAnswersP1({});
        setAnswersP2({});
        setAnswersP3({});
        setIsSubmitted(false);
        setScore(0);
        window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleAnswerP1 = (id, answer) => setAnswersP1(prev => ({ ...prev, [id]: answer }));
  const handleAnswerP2 = (qId, sId, answer) => setAnswersP2(prev => ({ 
    ...prev, 
    [qId]: { ...(prev[qId] || {}), [sId]: answer } 
  }));
  const handleAnswerP3 = (id, answer) => setAnswersP3(prev => ({ ...prev, [id]: answer }));

  const calculateScore = () => {
    let totalOperations = 0;
    let correctOperations = 0;

    // Part 1
    quizData.part1_multipleChoice.forEach(q => {
      totalOperations++;
      const correctOpt = q.options.find(o => o.isCorrect);
      if (answersP1[q.id] === correctOpt?.key) correctOperations++;
    });

    // Part 2
    quizData.part2_trueFalse.forEach(q => {
      q.statements.forEach(stmt => {
        totalOperations++;
        if (answersP2[q.id]?.[stmt.id] === stmt.isTrue) correctOperations++;
      });
    });

    // Part 3
    quizData.part3_shortAnswer.forEach(q => {
      totalOperations++;
      const userAnswer = answersP3[q.id]?.trim().toLowerCase() || '';
      const correctAns = q.correctAnswer?.trim().toLowerCase() || '';
      if (userAnswer === correctAns && userAnswer !== '') correctOperations++;
    });

    const finalScore = totalOperations > 0 ? (correctOperations / totalOperations) * 10 : 0;
    
    setStats({ correctOperations, totalOperations });
    setScore(finalScore);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (!quizData) {
      return <div className="p-12 text-center text-gray-500">Đang tải bài thi...</div>;
  }

  return (
    <div className="py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedQuiz.title}</h2>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
            <Sidebar 
                score={score} 
                stats={stats} 
                onSubmit={calculateScore} 
                isSubmitted={isSubmitted} 
                onRetake={handleRetake}
                onBack={handleBack}
            />

            <div className="flex-1 w-full space-y-10">
                {quizData.part1_multipleChoice?.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-100 inline-block uppercase tracking-wide">
                            Phần I. Trắc nghiệm nhiều phương án
                        </h3>
                        {quizData.part1_multipleChoice.map(q => (
                            <MultipleChoice 
                                key={q.id} 
                                data={q} 
                                selectedAnswer={answersP1[q.id]}
                                onChange={handleAnswerP1}
                                isSubmitted={isSubmitted}
                            />
                        ))}
                    </section>
                )}

                {quizData.part2_trueFalse?.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-100 inline-block uppercase tracking-wide">
                            Phần II. Trắc nghiệm Đúng/Sai
                        </h3>
                        {quizData.part2_trueFalse.map(q => (
                            <TrueFalse 
                                key={q.id} 
                                data={q} 
                                selectedAnswers={answersP2[q.id]}
                                onChange={handleAnswerP2}
                                isSubmitted={isSubmitted}
                            />
                        ))}
                    </section>
                )}

                {quizData.part3_shortAnswer?.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-100 inline-block uppercase tracking-wide">
                            Phần III. Trả lời ngắn
                        </h3>
                        {quizData.part3_shortAnswer.map(q => (
                            <ShortAnswer 
                                key={q.id} 
                                data={q} 
                                selectedAnswer={answersP3[q.id]}
                                onChange={handleAnswerP3}
                                isSubmitted={isSubmitted}
                            />
                        ))}
                    </section>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
