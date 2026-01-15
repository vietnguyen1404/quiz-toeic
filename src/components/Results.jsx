import Question from './Question';

/**
 * Results component - Displays final score and answer review
 */
function Results({ score, results, onRestart }) {
    const getScoreColor = () => {
        if (score.percentage >= 80) return 'text-success-600';
        if (score.percentage >= 60) return 'text-yellow-600';
        return 'text-danger-600';
    };

    const getScoreMessage = () => {
        if (score.percentage >= 80) return 'Excellent! Great job! 🎉';
        if (score.percentage >= 60) return 'Good effort! Keep practicing! 💪';
        return 'Keep studying! You can do better! 📚';
    };

    const getScoreEmoji = () => {
        if (score.percentage >= 80) return '🏆';
        if (score.percentage >= 60) return '⭐';
        return '📖';
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Score Card */}
            <div className="card text-center">
                <div className="text-6xl mb-4">{getScoreEmoji()}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                <p className="text-gray-600 mb-6">{getScoreMessage()}</p>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                    <div className={`text-5xl font-bold ${getScoreColor()} mb-2`}>
                        {score.correct}/{score.total}
                    </div>
                    <div className="text-gray-500 text-lg">
                        {score.percentage}% Correct
                    </div>
                </div>

                {/* Score breakdown bar */}
                <div className="flex h-4 rounded-full overflow-hidden bg-gray-200 mb-6">
                    <div
                        className="bg-gradient-to-r from-success-400 to-success-500 transition-all duration-1000"
                        style={{ width: `${score.percentage}%` }}
                    />
                    <div
                        className="bg-gradient-to-r from-danger-400 to-danger-500"
                        style={{ width: `${100 - score.percentage}%` }}
                    />
                </div>

                <button
                    onClick={onRestart}
                    className="btn-primary inline-flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Another Quiz
                </button>
            </div>

            {/* Answer Review */}
            <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Answer Review
                </h3>

                <div className="space-y-8">
                    {results.map((result, index) => (
                        <div
                            key={result.id}
                            className={`p-5 rounded-xl border-2 ${result.isCorrect
                                    ? 'border-success-200 bg-success-50/50'
                                    : 'border-danger-200 bg-danger-50/50'
                                }`}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${result.isCorrect ? 'bg-success-500' : 'bg-danger-500'
                                    }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {result.isCorrect ? (
                                            <span className="text-success-600 text-sm font-medium">✓ Correct</span>
                                        ) : (
                                            <span className="text-danger-600 text-sm font-medium">✗ Incorrect</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Question
                                question={result}
                                selectedAnswer={result.userAnswer}
                                showResults={true}
                                onSelectAnswer={() => { }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Results;
