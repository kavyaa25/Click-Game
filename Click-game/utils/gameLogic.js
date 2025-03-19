function calculateClickValue(baseValue, multiplier) {
    return 2 * baseValue * multiplier; // Base click now worth 2 points
}

function checkAchievements(score, clicks, achievements) {
    const unlockedAchievements = [];
    
    achievements.forEach(achievement => {
        if (!achievement.unlocked) {
            if (
                (achievement.type === 'score' && score >= achievement.requirement) ||
                (achievement.type === 'clicks' && clicks >= achievement.requirement)
            ) {
                achievement.unlocked = true;
                unlockedAchievements.push(achievement);
            }
        }
    });
    
    return unlockedAchievements;
}

function calculateAutoClickerValue(autoClickers, baseValue, multiplier) {
    return autoClickers * (2 * baseValue) * multiplier; // Auto-clickers also give 2 points
}

function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}

function calculateLevel(score) {
    return Math.floor(Math.log10(score + 1)) + 1;
}

function calculateProgress(score) {
    const level = calculateLevel(score);
    const currentLevelMin = Math.pow(10, level - 1);
    const nextLevelMin = Math.pow(10, level);
    return ((score - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
}
