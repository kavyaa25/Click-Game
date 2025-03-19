function Achievements({ achievements }) {
    try {
        return (
            <div className="bg-white rounded-lg p-6 shadow-lg" data-name="achievements-container">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <i className="fas fa-medal text-purple-600 mr-2"></i>
                    Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-name="achievements-list">
                    {achievements.map((achievement) => (
                        <div 
                            key={achievement.id}
                            className={`achievement-item p-4 rounded-lg border ${
                                achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-200'
                            }`}
                            data-name={`achievement-${achievement.id}`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    achievement.unlocked ? 'bg-green-500' : 'bg-gray-200'
                                }`}>
                                    <i className={`fas ${achievement.icon} text-white`}></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{achievement.name}</h3>
                                    <p className="text-sm text-gray-600">{achievement.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Achievements component error:', error);
        reportError(error);
        return null;
    }
}
