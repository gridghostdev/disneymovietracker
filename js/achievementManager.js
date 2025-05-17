class AchievementManager {
    constructor() {
        this.earnedAchievements = [];
        this.achievementData = {};
        this.loadFromStorage();
    }
    
    loadFromStorage() {
        this.earnedAchievements = StorageManager.getAchievements();
        this.achievementData = StorageManager.getAchievementData();
    }
    
    hasAchievement(id) {
        return this.earnedAchievements.includes(id);
    }
    
    awardAchievement(id) {
        if (!this.hasAchievement(id)) {
            this.earnedAchievements.push(id);
            StorageManager.saveAchievements(this.earnedAchievements);
            return true;
        }
        return false;
    }
    
    setAchievementData(key, value) {
        this.achievementData[key] = value;
        StorageManager.saveAchievementData(this.achievementData);
    }
    
    getAchievementData(key) {
        return this.achievementData[key];
    }
    
    checkForNewAchievements(watchedMovies) {
        const allAchievements = getAllAchievements();
        const newlyEarned = [];
        
        allAchievements.forEach(achievement => {
            if (!this.hasAchievement(achievement.id) && 
                achievement.requirement(watchedMovies, this.achievementData)) {
                this.awardAchievement(achievement.id);
                newlyEarned.push(achievement);
            }
        });
        
        return newlyEarned;
    }
    
    // Special achievement tracking functions
    registerMovieWatched(movieId, watchedMovies) {
        const timestamp = Date.now();
        const recentWatches = this.getAchievementData('recentWatches') || [];
        
        // Add this watch to recent watches
        recentWatches.push({
            movieId,
            timestamp
        });
        
        // Keep only the last 5 watches for memory efficiency
        if (recentWatches.length > 5) {
            recentWatches.shift();
        }
        
        this.setAchievementData('recentWatches', recentWatches);
        
        // Check for double feature (two movies within 4 hours)
        if (recentWatches.length >= 2) {
            const lastTwo = recentWatches.slice(-2);
            const timeDiff = Math.abs(lastTwo[1].timestamp - lastTwo[0].timestamp);
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            
            if (hoursDiff <= 4) {
                this.setAchievementData('doubleFeatureCompleted', true);
            }
        }
        
        // Check for all achievements
        return this.checkForNewAchievements(watchedMovies);
    }
    
    getAllEarnedAchievements() {
        const allAchievements = getAllAchievements();
        return allAchievements.filter(achievement => 
            this.earnedAchievements.includes(achievement.id)
        );
    }
}

// Initialize the achievement manager globally
const achievementManager = new AchievementManager();
