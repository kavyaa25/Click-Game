function Leaderboard({ leaders }) {
    try {
        return (
            <div className="bg-white rounded-lg p-6 shadow-lg" data-name="leaderboard-container">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                    Leaderboard
                </h2>
                <div className="space-y-4" data-name="leaderboard-list">
                    {leaders.map((player, index) => (
                        <div 
                            key={player.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                            data-name={`leaderboard-item-${index}`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                    index === 0 ? 'bg-yellow-500' :
                                    index === 1 ? 'bg-gray-300' :
                                    index === 2 ? 'bg-orange-400' :
                                    'bg-gray-200'
                                } text-white font-bold`}>
                                    {index + 1}
                                </span>
                                <span className="font-medium">{player.username}</span>
                            </div>
                            <span className="text-blue-600 font-semibold">
                                {player.score.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Leaderboard component error:', error);
        reportError(error);
        return null;
    }
}
