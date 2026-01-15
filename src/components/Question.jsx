/**
 * Question component - Displays a single question with options
 */
function Question({ question, selectedAnswer, onSelectAnswer, showResults = false }) {
    const getOptionClass = (option) => {
        if (!showResults) {
            // Quiz in progress - show selected state
            return selectedAnswer === option
                ? 'option-btn option-selected'
                : 'option-btn option-default';
        }

        // Results mode - show correct/incorrect states
        const isCorrect = option === question.correctAnswer;
        const isUserAnswer = option === selectedAnswer;

        if (isCorrect && isUserAnswer) {
            return 'option-btn option-correct';
        } else if (isCorrect) {
            return 'option-btn option-missed';
        } else if (isUserAnswer) {
            return 'option-btn option-incorrect';
        }
        return 'option-btn bg-gray-50 border-gray-200 opacity-60';
    };

    const getOptionIcon = (option) => {
        if (!showResults) return null;

        const isCorrect = option === question.correctAnswer;
        const isUserAnswer = option === selectedAnswer;

        if (isCorrect) {
            return (
                <span className="ml-auto flex-shrink-0">
                    <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            );
        } else if (isUserAnswer) {
            return (
                <span className="ml-auto flex-shrink-0">
                    <svg className="w-6 h-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            );
        }
        return null;
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {question.question}
            </h2>
            <div className="space-y-2">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => !showResults && onSelectAnswer(option)}
                        disabled={showResults}
                        className={`${getOptionClass(option)} flex items-center`}
                    >
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-4 font-semibold text-gray-600">
                            {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {getOptionIcon(option)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
