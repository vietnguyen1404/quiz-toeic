/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array (new array, doesn't modify original)
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Select random questions from the question bank
 * @param {Array} questions - Full question bank
 * @param {number} count - Number of questions to select
 * @returns {Array} - Selected questions
 */
export function selectRandomQuestions(questions, count) {
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Calculate the quiz score
 * @param {Object} userAnswers - Map of question ID to selected answer
 * @param {Array} questions - Questions array with correct answers
 * @returns {Object} - Score details { correct, total, percentage }
 */
export function calculateScore(userAnswers, questions) {
    let correct = 0;

    questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        if (userAnswer && userAnswer === question.correctAnswer) {
            correct++;
        }
    });

    return {
        correct,
        total: questions.length,
        percentage: Math.round((correct / questions.length) * 100)
    };
}

/**
 * Get result details for each question
 * @param {Object} userAnswers - Map of question ID to selected answer
 * @param {Array} questions - Questions array
 * @returns {Array} - Array of result objects
 */
export function getResultDetails(userAnswers, questions) {
    return questions.map(question => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correctAnswer;

        return {
            ...question,
            userAnswer: userAnswer || null,
            isCorrect,
            wasAnswered: !!userAnswer
        };
    });
}
