import { useState, useEffect, useCallback } from 'react';
import Quiz from './components/Quiz';
import { selectRandomQuestions } from './utils/quizUtils';

const QUESTIONS_PER_QUIZ = 13;

function App() {
    const [allQuestions, setAllQuestions] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizState, setQuizState] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await fetch('/quiz.json');
                if (!response.ok) {
                    throw new Error('Failed to load quiz data');
                }
                const questions = await response.json();

                if (questions.length === 0) {
                    throw new Error('No questions found in quiz file');
                }

                setAllQuestions(questions);
                setQuizState('ready');
            } catch (err) {
                setError(err.message);
                setQuizState('error');
            }
        };

        loadQuestions();
    }, []);

    const startQuiz = useCallback(() => {
        const selected = selectRandomQuestions(allQuestions, QUESTIONS_PER_QUIZ);
        setQuizQuestions(selected);
        setQuizState('started');
    }, [allQuestions]);

    const restartQuiz = useCallback(() => {
        setQuizState('ready');
    }, []);

    if (quizState === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card text-center animate-pulse">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading questions...</p>
                </div>
            </div>
        );
    }

    if (quizState === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card text-center max-w-md">
                    <div className="text-5xl mb-4">😕</div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-danger-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (quizState === 'ready') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card text-center max-w-lg animate-slide-up">
                    <div className="text-6xl mb-4">📝</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        TOEIC English Quiz Master
                    </h1>
                    <h2 className='text-2xl font-bold text-danger-600 mb-2'>Go study, Văn Hưng!!!</h2>
                    <p className="text-gray-600 mb-6">
                        Test your English listening comprehension skills with {QUESTIONS_PER_QUIZ} random questions
                        from our bank of {allQuestions.length}+ questions.
                    </p>

                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-bold text-primary-600">{allQuestions.length}</div>
                                <div className="text-sm text-primary-700">Total Questions</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">{QUESTIONS_PER_QUIZ}</div>
                                <div className="text-sm text-primary-700">Per Quiz</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 text-left mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <span>📋</span> How it works:
                        </h3>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                {QUESTIONS_PER_QUIZ} questions randomly selected each time
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                Select your answer for each question
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                Submit to see your score and review answers
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={startQuiz}
                        className="btn-primary w-full text-lg py-4"
                    >
                        Start Quiz 🚀
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <Quiz questions={quizQuestions} onRestart={restartQuiz} />
        </div>
    );
}

export default App;
