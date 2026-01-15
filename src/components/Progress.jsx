/**
 * Progress component - Shows current question progress
 */
function Progress({ current, total }) {
    const percentage = (current / total) * 100;

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                    Question {current} of {total}
                </span>
                <span className="text-sm font-medium text-primary-600">
                    {Math.round(percentage)}%
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default Progress;
