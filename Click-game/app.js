function App() {
    try {
        const [user, setUser] = React.useState(null);
        const [theme, setTheme] = React.useState(() => {
            return localStorage.getItem('theme') || 'light';
        });
        const [score, setScore] = React.useState(0);
        const [clickValue, setClickValue] = React.useState(1);
        const [multiplier, setMultiplier] = React.useState(1);
        const [autoClickers, setAutoClickers] = React.useState(0);
        const [achievements, setAchievements] = React.useState([
            { id: 1, name: "Beginner Clicker", description: "Reach 100 points", icon: "fa-star", type: "score", requirement: 100, unlocked: false },
            { id: 2, name: "Dedicated Clicker", description: "Reach 1,000 points", icon: "fa-certificate", type: "score", requirement: 1000, unlocked: false },
            { id: 3, name: "Master Clicker", description: "Reach 10,000 points", icon: "fa-crown", type: "score", requirement: 10000, unlocked: false }
        ]);
        
        const [upgrades] = React.useState([
            { id: 1, name: "Auto Clicker", description: "Automatically clicks once per second", cost: 100, type: "autoClicker" },
            { id: 2, name: "Double Click", description: "Doubles your click value", cost: 500, type: "multiplier" },
            { id: 3, name: "Super Click", description: "5x click value", cost: 2000, type: "multiplier" }
        ]);

        const [leaders] = React.useState([
            { id: 1, username: "ClickMaster", score: 50000 },
            { id: 2, username: "PointKing", score: 30000 },
            { id: 3, username: "ClickerPro", score: 20000 },
            { id: 4, username: "GameMaster", score: 15000 },
            { id: 5, username: "ClickerHero", score: 10000 }
        ]);

        React.useEffect(() => {
            localStorage.setItem('theme', theme);
            document.body.className = `theme-${theme}`;
        }, [theme]);

        React.useEffect(() => {
            const autoClickInterval = setInterval(() => {
                if (autoClickers > 0) {
                    setScore(prev => prev + calculateAutoClickerValue(autoClickers, 1, multiplier));
                }
            }, 1000);

            return () => clearInterval(autoClickInterval);
        }, [autoClickers, multiplier]);

        React.useEffect(() => {
            if (user) {
                const savedProgress = loadGameProgress(user.id);
                if (savedProgress) {
                    setScore(savedProgress.score);
                    setClickValue(savedProgress.clickValue);
                    setMultiplier(savedProgress.multiplier);
                    setAutoClickers(savedProgress.autoClickers);
                    setAchievements(savedProgress.achievements);
                }
            }
        }, [user]);

        const handleLogin = async (credentials) => {
            try {
                const response = await loginUser(credentials);
                if (response.success) {
                    setUser(response.user);
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        const handleGuestLogin = () => {
            const guestUser = generateGuestUser();
            setUser(guestUser);
        };

        const handleLogout = () => {
            if (user) {
                saveGameProgress(user.id, {
                    score,
                    clickValue,
                    multiplier,
                    autoClickers,
                    achievements
                });
            }
            setUser(null);
        };

        const handleClick = () => {
            const newScore = score + calculateClickValue(clickValue, multiplier);
            setScore(newScore);
            
            const unlockedAchievements = checkAchievements(newScore, 0, achievements);
            if (unlockedAchievements.length > 0) {
                setAchievements([...achievements]);
                unlockedAchievements.forEach(achievement => {
                    console.log(`Achievement unlocked: ${achievement.name}`);
                });
            }
        };

        const handlePurchase = (upgradeId) => {
            const upgrade = upgrades.find(u => u.id === upgradeId);
            if (upgrade && score >= upgrade.cost) {
                setScore(score - upgrade.cost);
                
                if (upgrade.type === "autoClicker") {
                    setAutoClickers(prev => prev + 1);
                } else if (upgrade.type === "multiplier") {
                    if (upgrade.id === 2) setMultiplier(prev => prev * 2);
                    if (upgrade.id === 3) setMultiplier(prev => prev * 5);
                }
            }
        };

        const handleThemeChange = (newTheme) => {
            setTheme(newTheme);
        };

        if (!user) {
            return (
                <div className={`min-h-screen theme-${theme} flex items-center justify-center p-4`}>
                    <LoginForm onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
                </div>
            );
        }

        return (
            <div className={`game-container theme-${theme}`} data-name="game-container">
                <Navbar 
                    score={score} 
                    username={user.username} 
                    onLogout={handleLogout}
                />
                
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ScorePanel 
                                score={score}
                                clickValue={calculateClickValue(clickValue, multiplier)}
                                autoClickersCount={autoClickers}
                            />
                            
                            <div className="text-center space-y-4">
                                <GameButton onClick={handleClick} multiplier={multiplier} />
                                <ShareButton score={score} />
                            </div>
                            
                            <Shop 
                                score={score}
                                onPurchase={handlePurchase}
                                upgrades={upgrades}
                            />
                        </div>
                        
                        <div className="space-y-8">
                            <ThemeSelector 
                                currentTheme={theme}
                                onThemeChange={handleThemeChange}
                            />
                            <Leaderboard leaders={leaders} />
                            <Achievements achievements={achievements} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
