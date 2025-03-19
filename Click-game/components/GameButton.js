function GameButton({ onClick, multiplier }) {
    try {
        const [clickPosition, setClickPosition] = React.useState(null);

        const handleClick = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            setClickPosition({ x, y });
            setTimeout(() => setClickPosition(null), 1000);
            
            onClick();
        };

        return (
            <div className="flex flex-col items-center space-y-4" data-name="game-button-container">
                <button
                    onClick={handleClick}
                    className="game-button text-white rounded-full w-48 h-48 flex items-center justify-center text-2xl font-bold relative overflow-hidden"
                    data-name="click-button"
                >
                    <div className="flex flex-col items-center relative z-10">
                        <i className="fas fa-hand-pointer text-4xl mb-2"></i>
                        <span>CLICK ME!</span>
                        {multiplier > 1 && (
                            <span className="text-sm mt-2 multiplier-badge px-3 py-1 rounded-full">
                                {multiplier}x Multiplier
                            </span>
                        )}
                    </div>
                    {clickPosition && (
                        <div
                            className="points-popup absolute text-lg"
                            style={{
                                left: `${clickPosition.x}px`,
                                top: `${clickPosition.y}px`
                            }}
                        >
                            +{2 * multiplier}
                        </div>
                    )}
                </button>
            </div>
        );
    } catch (error) {
        console.error('GameButton component error:', error);
        reportError(error);
        return null;
    }
}
