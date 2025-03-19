function ThemeSelector({ currentTheme, onThemeChange }) {
    try {
        const [notification, setNotification] = React.useState(null);

        const themes = [
            { id: 'light', name: 'Light', icon: 'fa-sun', color: 'bg-yellow-400' },
            { id: 'dark', name: 'Dark', icon: 'fa-moon', color: 'bg-gray-800' },
            { id: 'neon', name: 'Neon', icon: 'fa-bolt', color: 'bg-purple-500' }
        ];

        const handleThemeChange = (themeId) => {
            onThemeChange(themeId);
            setNotification({
                theme: themeId,
                message: `${themeId.charAt(0).toUpperCase() + themeId.slice(1)} Mode Activated`
            });
            setTimeout(() => setNotification(null), 2000);
        };

        return (
            <div data-name="theme-selector">
                {notification && (
                    <div className={`theme-notification ${notification.theme}`}>
                        {notification.message}
                    </div>
                )}
                
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                        <i className="fas fa-palette mr-2 text-purple-600"></i>
                        Theme Settings
                    </h3>
                    <div className="grid grid-cols-3 gap-4" data-name="theme-options">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => handleThemeChange(theme.id)}
                                className={`p-4 rounded-lg transition-all ${
                                    currentTheme === theme.id
                                        ? 'ring-2 ring-offset-2 ring-purple-500 bg-purple-50'
                                        : 'hover:bg-gray-50'
                                }`}
                                data-name={`theme-${theme.id}`}
                            >
                                <div className={`w-12 h-12 mx-auto rounded-full ${theme.color} flex items-center justify-center mb-2`}>
                                    <i className={`fas ${theme.icon} text-white text-xl`}></i>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {theme.name}
                                </p>
                                {currentTheme === theme.id && (
                                    <span className="block text-xs text-purple-600 mt-1">
                                        Active
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ThemeSelector component error:', error);
        reportError(error);
        return null;
    }
}
