import { useState } from 'react';
import Question from './Question';
import Progress from './Progress';
import Results from './Results';
import { calculateScore, getResultDetails } from '../utils/quizUtils';

/**
 * Quiz component - Main quiz logic and navigation
 */
function Quiz({ questions, onRestart }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleSelectAnswer = (answer) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: answer
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsCompleted(true);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setUserAnswers({});
        setIsCompleted(false);
        onRestart();
    };

    if (isCompleted) {
        const score = calculateScore(userAnswers, questions);
        const resultDetails = getResultDetails(userAnswers, questions);

        return (
            <Results
                score={score}
                results={resultDetails}
                onRestart={handleRestart}
            />
        );
    }

    const isAnswered = userAnswers[currentQuestion.id] !== undefined;
    const isLastQuestion = currentIndex === questions.length - 1;
    const answeredCount = Object.keys(userAnswers).length;

    return (
        <div className="card max-w-2xl mx-auto animate-slide-up">
            <Progress current={currentIndex + 1} total={questions.length} />

            <Question
                question={currentQuestion}
                selectedAnswer={userAnswers[currentQuestion.id]}
                onSelectAnswer={handleSelectAnswer}
            />

            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${currentIndex === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Previous
                </button>

                <span className="text-sm text-gray-500">
                    {answeredCount} of {questions.length} answered
                </span>

                {isLastQuestion ? (
                    <button
                        onClick={handleSubmit}
                        className="btn-primary"
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${isAnswered
                            ? 'bg-primary-500 text-white hover:bg-primary-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Next Question
                    </button>
                )}
            </div>
        </div>
    );
}

export default Quiz;
