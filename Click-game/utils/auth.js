async function loginUser(credentials) {
    try {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (credentials.username && credentials.password) {
                    resolve({
                        success: true,
                        user: {
                            id: '123',
                            username: credentials.username,
                            isGuest: false
                        }
                    });
                } else {
                    throw new Error('Invalid credentials');
                }
            }, 1000);
        });
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

function generateGuestUser() {
    const guestId = Math.random().toString(36).substr(2, 9);
    return {
        id: guestId,
        username: `Guest_${guestId}`,
        isGuest: true
    };
}

function saveGameProgress(userId, gameData) {
    try {
        localStorage.setItem(`gameProgress_${userId}`, JSON.stringify(gameData));
    } catch (error) {
        console.error('Error saving game progress:', error);
        throw error;
    }
}

function loadGameProgress(userId) {
    try {
        const savedProgress = localStorage.getItem(`gameProgress_${userId}`);
        return savedProgress ? JSON.parse(savedProgress) : null;
    } catch (error) {
        console.error('Error loading game progress:', error);
        throw error;
    }
}
