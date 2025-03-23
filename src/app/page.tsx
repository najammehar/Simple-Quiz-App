// app/page.js
"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, Award, BookOpen, ChevronRight, 
         HelpCircle, AlertTriangle, Check, X, BarChart } from 'lucide-react';

export default function QuizApp() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correctAnswer: "JavaScript",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null); 
  const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions.length).fill(false));
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerClick = (option) => {
    // Prevent re-selection
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    
    // Update answered questions tracking
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    // Store user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;
    setUserAnswers(newUserAnswers);
    
    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswerStatus(null);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setAnsweredQuestions(Array(questions.length).fill(false));
    setUserAnswers(Array(questions.length).fill(''));
  };

  // Get option class based on selection and correctness
  const getOptionClass = (option) => {
    const baseClass = "p-4 rounded-lg transition-all duration-300 text-center hover:shadow-md cursor-pointer flex items-center ";
    
    if (selectedAnswer === null) {
      return baseClass + "bg-white border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50";
    }
    
    if (option === questions[currentQuestion].correctAnswer) {
      return baseClass + "bg-green-100 border border-green-400 text-green-800";
    }
    
    if (selectedAnswer === option) {
      return baseClass + "bg-red-100 border border-red-400 text-red-800";
    }
    
    return baseClass + "bg-white border border-gray-200 opacity-50";
  };

  // Calculate percentage for gradient-based score visualization
  const calculateScorePercentage = () => {
    return (score / questions.length) * 100;
  };

  // Get appropriate emoji and message based on score
  const getScoreMessage = () => {
    const percentage = calculateScorePercentage();
    if (percentage === 100) return { icon: <Award size={64} className="text-yellow-500" />, message: "Perfect Score!", subtext: "Amazing job! You've mastered this quiz!" };
    if (percentage >= 80) return { icon: <Award size={64} className="text-indigo-500" />, message: "Excellent Work!", subtext: "You're doing great! Keep it up!" };
    if (percentage >= 60) return { icon: <CheckCircle size={64} className="text-green-500" />, message: "Well Done!", subtext: "Good job, but there's still room for improvement." };
    if (percentage >= 40) return { icon: <HelpCircle size={64} className="text-blue-500" />, message: "Nice Try!", subtext: "Practice makes perfect! Try again to improve." };
    return { icon: <BookOpen size={64} className="text-purple-500" />, message: "Keep Learning!", subtext: "Don't give up! Review and try again." };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {showScore ? (
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">{getScoreMessage().icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                {getScoreMessage().message}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {getScoreMessage().subtext}
              </p>
              <div className="w-full h-4 bg-gray-200 rounded-full mb-2 flex items-center">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-600 transition-all duration-1000 flex items-center justify-end pr-1"
                  style={{ width: `${calculateScorePercentage()}%` }}
                >
                  {calculateScorePercentage() > 15 && <BarChart size={14} className="text-white" />}
                </div>
              </div>
              <div className="text-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">{score}</span>
                <span className="text-2xl text-gray-700">/{questions.length}</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                <AlertTriangle size={20} className="mr-2 text-amber-500" />
                Question Summary:
              </h3>
              {questions.map((q, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                      answeredQuestions[index] && q.correctAnswer === userAnswers[index] ? 
                      'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {answeredQuestions[index] && q.correctAnswer === userAnswers[index] ? 
                        <Check size={16} /> : <X size={16} />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{q.question}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {answeredQuestions[index] && userAnswers[index] !== q.correctAnswer && 
                          <span className="text-red-600">Your answer: {userAnswers[index]}</span>
                        }
                        {answeredQuestions[index] && userAnswers[index] !== q.correctAnswer && <br />}
                        Correct answer: <span className="font-medium text-indigo-600">{q.correctAnswer}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={restartQuiz}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
            >
              <BookOpen size={20} className="mr-2" />
              Take Quiz Again
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  Knowledge Quiz
                </h2>
                <div className="bg-white/20 px-3 py-1 rounded-full text-white font-medium text-sm flex items-center">
                  <HelpCircle size={14} className="mr-1" />
                  Question {currentQuestion + 1}/{questions.length}
                </div>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2.5 mt-4">
                <div 
                  className="bg-white h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <HelpCircle size={24} className="mr-2 text-indigo-600" />
                  {questions[currentQuestion].question}
                </h3>
                
                {answerStatus && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    answerStatus === 'correct' 
                      ? 'bg-green-100 border-l-4 border-green-500 text-green-800' 
                      : 'bg-red-100 border-l-4 border-red-500 text-red-800'
                  }`}>
                    <div className="font-medium flex items-center">
                      {answerStatus === 'correct' 
                        ? <><CheckCircle size={18} className="mr-2" /> Correct!</> 
                        : <><XCircle size={18} className="mr-2" /> Incorrect. The correct answer is {questions[currentQuestion].correctAnswer}.</>}
                    </div>
                  </div>
                )}
                
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={getOptionClass(option)}
                      onClick={() => handleAnswerClick(option)}
                    >
                      <div className="w-6 h-6 rounded-full border border-indigo-300 flex items-center justify-center mr-3 flex-shrink-0 text-black">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-black">{option}</span>
                      {selectedAnswer === option && option === questions[currentQuestion].correctAnswer && 
                        <CheckCircle size={18} className="ml-auto text-green-600" />}
                      {selectedAnswer === option && option !== questions[currentQuestion].correctAnswer && 
                        <XCircle size={18} className="ml-auto text-red-600" />}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  <Award size={14} className="mr-1 text-indigo-600" />
                  Score: {score}/{questions.length}
                </div>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all flex items-center ${
                    selectedAnswer === null
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md transform hover:-translate-y-1'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}