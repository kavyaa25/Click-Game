function Navbar({ score, username, onLogout }) {
    try {
        return (
            <nav className="navbar p-4 text-white" data-name="navbar">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4" data-name="navbar-brand">
                        <i className="fas fa-gamepad text-2xl"></i>
                        <span className="text-xl font-bold">Clicker Game</span>
                    </div>
                    <div className="flex items-center space-x-6" data-name="navbar-content">
                        <div className="flex items-center space-x-2" data-name="score-display">
                            <i className="fas fa-coins"></i>
                            <span className="font-semibold">{score.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2" data-name="user-info">
                            <i className="fas fa-user-circle"></i>
                            <span>{username}</span>
                        </div>
                        <button 
                            onClick={onLogout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                            data-name="logout-button"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navbar component error:', error);
        reportError(error);
        return null;
    }
}
