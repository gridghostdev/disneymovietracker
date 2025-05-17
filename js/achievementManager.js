class AchievementManager {
    constructor() {
        this.earnedAchievements = storageManager.getEarnedAchievements();
        this.achievementData = storageManager.getAchievementData();
    }
    
    hasAchievement(id) {
        return storageManager.hasAchievement(id);
    }
    
    awardAchievement(id) {
        if (!this.hasAchievement(id)) {
            this.earnedAchievements.push(id);
            storageManager.saveEarnedAchievements(this.earnedAchievements);
            return true;
        }
        return false;
    }
    
    setAchievementData(key, value) {
        this.achievementData[key] = value;
        storageManager.saveAchievementData(this.achievementData);
    }
    
    getAchievementData(key) {
        return this.achievementData[key];
    }
    
    // Check for new achievements based on the current watched movies
    checkForNewAchievements(watchedMovies) {
        const allAchievements = getAllAchievements();
        const newlyEarned = [];
        
        // Convert watched IDs to actual movie objects for achievements that need film details
        const watchedMovieObjects = ALL_FILMS.filter(film => watchedMovies.includes(film.id));
        
        allAchievements.forEach(achievement => {
            if (!this.hasAchievement(achievement.id)) {
                let earned = false;
                
                // Check if achievement uses the 'requirement' function or 'condition' function
                if (typeof achievement.requirement === 'function') {
                    earned = achievement.requirement(watchedMovies, this.achievementData);
                } else if (typeof achievement.condition === 'function') {
                    earned = achievement.condition(watchedMovieObjects, ALL_FILMS);
                }
                
                if (earned) {
                    this.awardAchievement(achievement.id);
                    newlyEarned.push(achievement);
                }
            }
        });
        
        return newlyEarned;
    }
    
    // Handle adding a movie to the watched list
    registerMovieWatched(movieId, watchedMovies) {
        const timestamp = Date.now();
        const recentWatches = this.getAchievementData('recentWatches') || [];
        
        // Add this watch to recent watches
        recentWatches.push({
            movieId,
            timestamp
        });
        
        // Keep only the last 5 watches for memory efficiency
        while (recentWatches.length > 5) {
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
        
        // Check for marathon (3+ movies in a single day)
        const last24Hours = recentWatches.filter(watch => {
            return (timestamp - watch.timestamp) <= (24 * 60 * 60 * 1000);
        });
        
        if (last24Hours.length >= 3) {
            this.setAchievementData('marathonCompleted', true);
        }
        
        // Check for night owl (watching between 12AM and 5AM)
        const watchDate = new Date(timestamp);
        const watchHour = watchDate.getHours();
        if (watchHour >= 0 && watchHour < 5) {
            this.setAchievementData('nightOwlCompleted', true);
        }
        
        // Check for weekend warrior (5+ films on Sat/Sun)
        const isWeekend = [0, 6].includes(watchDate.getDay()); // 0 = Sunday, 6 = Saturday
        if (isWeekend) {
            // Count weekend movies in achievement data
            const weekendMovies = this.getAchievementData('weekendMovies') || [];
            const thisWeekend = weekendMovies.filter(watch => {
                const watchTime = new Date(watch.timestamp);
                const nowTime = new Date(timestamp);
                // Same weekend if same week number and year
                return watchTime.getWeek() === nowTime.getWeek() && 
                       watchTime.getFullYear() === nowTime.getFullYear();
            });
            
            weekendMovies.push({
                movieId,
                timestamp
            });
            
            this.setAchievementData('weekendMovies', weekendMovies);
            
            if (thisWeekend.length >= 4) { // This will be the 5th movie
                this.setAchievementData('weekendWarriorCompleted', true);
            }
        }
        
        // Check for all achievements
        return this.checkForNewAchievements(watchedMovies);
    }
    
    // Handle removing a movie from the watched list
    registerMovieUnwatched(movieId, watchedMovies) {
        // Remove the movie from recent watches if it exists
        const recentWatches = this.getAchievementData('recentWatches') || [];
        const updatedWatches = recentWatches.filter(watch => watch.movieId !== movieId);
        this.setAchievementData('recentWatches', updatedWatches);
        
        // Also remove from weekend movies
        const weekendMovies = this.getAchievementData('weekendMovies') || [];
        const updatedWeekendMovies = weekendMovies.filter(watch => watch.movieId !== movieId);
        this.setAchievementData('weekendMovies', updatedWeekendMovies);
        
        // Re-check achievements that might need to be revoked
        return this.checkForNewAchievements(watchedMovies);
    }
    
    // Get all earned achievements
    getAllEarnedAchievements() {
        const allAchievements = getAllAchievements();
        return allAchievements.filter(achievement => 
            this.earnedAchievements.includes(achievement.id)
        );
    }
    
    // Calculate achievement stats
    getAchievementStats() {
        const earnedCount = this.earnedAchievements.length;
        const totalCount = getAllAchievements().length;
        const percentage = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;
        
        return {
            earned: earnedCount,
            total: totalCount,
            percentage: percentage
        };
    }
}

// Helper function to get week number for a date (for weekend warrior achievement)
Date.prototype.getWeek = function() {
    const date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

// Initialize the achievement manager globally
const achievementManager = new AchievementManager();
