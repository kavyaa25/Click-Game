function ScorePanel({ score, clickValue, autoClickersCount }) {
    try {
        const level = Math.floor(Math.log10(score + 1)) + 1;
        const nextLevelScore = Math.pow(10, level);
        const progress = ((score - Math.pow(10, level - 1)) / (nextLevelScore - Math.pow(10, level - 1))) * 100;

        return (
            <div className="score-panel p-6 mb-8" data-name="score-panel">
                <div className="flex items-center justify-between mb-4">
                    <span className="level-badge" data-name="level-display">
                        Level {level}
                    </span>
                    <div className="w-2/3">
                        <div className="progress-bar" data-name="level-progress">
                            <div 
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col" data-name="total-score">
                        <span className="text-gray-300 text-sm">Total Score</span>
                        <span className="text-3xl font-bold text-white score-animation">
                            {score.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex flex-col" data-name="click-value">
                        <span className="text-gray-300 text-sm">Per Click</span>
                        <span className="text-2xl font-semibold text-green-400">
                            +{clickValue}
                        </span>
                    </div>
                    <div className="flex flex-col" data-name="auto-clickers">
                        <span className="text-gray-300 text-sm">Auto Clickers</span>
                        <span className="text-2xl font-semibold text-purple-400">
                            {autoClickersCount}
                        </span>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ScorePanel component error:', error);
        reportError(error);
        return null;
    }
}
