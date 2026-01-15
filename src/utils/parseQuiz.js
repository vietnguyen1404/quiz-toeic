/**
 * Parse quiz data from the text file content
 * Format expected:
 * [Correct Answer] - [Vietnamese description]
 * [English Question]
 * [Option A]
 * [Option B]
 * [Option C]
 */
export function parseQuizData(content) {
    const questions = [];
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let i = 0;
    let questionId = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Skip test headers (e.g., "TEST 1 – 1.5 POUND")
        if (line.toUpperCase().startsWith('TEST ')) {
            i++;
            continue;
        }

        // Skip page breaks represented as form feed characters
        if (line === '\f' || line.startsWith('\f')) {
            i++;
            continue;
        }

        // Check if this line is a question header (contains answer info)
        // Format: "Answer - Vietnamese description" or "Number. Answer – description"
        const hasAnswerMarker = line.includes(' - ') || line.includes(' – ');

        if (hasAnswerMarker && i + 1 < lines.length) {
            // Extract the correct answer from the header line
            // The correct answer is typically the first part before the dash
            const headerParts = line.split(/\s*[-–]\s*/);
            let correctAnswerHint = headerParts[0].trim();

            // Remove numbering if present (e.g., "1. Answer" -> "Answer")
            correctAnswerHint = correctAnswerHint.replace(/^\d+\.\s*/, '');

            // Get the question text (next line after header)
            let questionText = lines[i + 1];

            // If the question line starts with a number and dot, it might be part of format
            // Skip lines that look like option lines starting with A., B., C.
            if (questionText && (questionText.match(/^[A-C]\.\s/) || questionText.match(/^[A-C]\s/))) {
                i++;
                continue;
            }

            // Collect options (next 3 lines typically)
            const options = [];
            let optionIndex = i + 2;

            while (optionIndex < lines.length && options.length < 3) {
                let optionLine = lines[optionIndex];

                // Skip if we hit another question header
                if (optionLine.includes(' - ') && optionLine.includes('?')) {
                    break;
                }

                // Skip test headers
                if (optionLine.toUpperCase().startsWith('TEST ')) {
                    break;
                }

                // Clean up option text - remove leading A., B., C. prefixes if present
                optionLine = optionLine.replace(/^[A-C]\.\s*/, '').trim();

                // Skip empty lines
                if (optionLine.length > 0 && !optionLine.startsWith('\f')) {
                    options.push(optionLine);
                }

                optionIndex++;
            }

            // Only add if we have a valid question with options
            if (questionText && options.length >= 2) {
                // Find the correct answer among options
                let correctAnswer = findCorrectAnswer(options, correctAnswerHint);

                questions.push({
                    id: questionId++,
                    question: questionText,
                    options: options,
                    correctAnswer: correctAnswer
                });
            }

            i = optionIndex;
        } else {
            i++;
        }
    }

    return questions;
}

/**
 * Find the correct answer by matching the hint with options
 */
function findCorrectAnswer(options, hint) {
    const hintLower = hint.toLowerCase();

    // Try exact match first
    for (const option of options) {
        if (option.toLowerCase() === hintLower) {
            return option;
        }
    }

    // Try partial match - hint contains option or option contains hint
    for (const option of options) {
        const optionLower = option.toLowerCase();
        if (hintLower.includes(optionLower) || optionLower.includes(hintLower)) {
            return option;
        }
    }

    // Try matching key words
    const hintWords = hintLower.split(/\s+/);
    for (const option of options) {
        const optionLower = option.toLowerCase();
        for (const word of hintWords) {
            if (word.length > 2 && optionLower.includes(word)) {
                return option;
            }
        }
    }

    // Default to first option if no match found
    return options[0];
}

export default parseQuizData;
