/**
 * StorageManager - Centralized storage management for Disney Animation Tracker
 * Handles saving and loading watch history, achievements, and other data
 */
class StorageManager {
    constructor() {
        // Storage keys
        this.keys = {
            watchedMovies: 'disneyTracker_watchedMovies',
            achievements: 'disneyTracker_achievements',
            achievementData: 'disneyTracker_achievementData',
            preferences: 'disneyTracker_preferences'
        };
    }

    // Watched Movies Storage
    getWatchedMovies() {
        return JSON.parse(localStorage.getItem(this.keys.watchedMovies)) || [];
    }

    saveWatchedMovies(watchedMovies) {
        localStorage.setItem(this.keys.watchedMovies, JSON.stringify(watchedMovies));
    }

    addWatchedMovie(movieId) {
        const watchedMovies = this.getWatchedMovies();
        if (!watchedMovies.includes(movieId)) {
            watchedMovies.push(movieId);
            this.saveWatchedMovies(watchedMovies);
            return true; // Movie was newly added
        }
        return false; // Movie was already in watched list
    }

    removeWatchedMovie(movieId) {
        const watchedMovies = this.getWatchedMovies();
        const index = watchedMovies.indexOf(movieId);
        if (index !== -1) {
            watchedMovies.splice(index, 1);
            this.saveWatchedMovies(watchedMovies);
            return true; // Movie was removed
        }
        return false; // Movie wasn't in the list
    }

    isMovieWatched(movieId) {
        return this.getWatchedMovies().includes(movieId);
    }

    // Achievement Storage
    getEarnedAchievements() {
        return JSON.parse(localStorage.getItem(this.keys.achievements)) || [];
    }

    saveEarnedAchievements(achievements) {
        localStorage.setItem(this.keys.achievements, JSON.stringify(achievements));
    }

    addAchievement(achievementId) {
        const achievements = this.getEarnedAchievements();
        if (!achievements.includes(achievementId)) {
            achievements.push(achievementId);
            this.saveEarnedAchievements(achievements);
            return true; // Achievement was newly added
        }
        return false; // Achievement was already earned
    }

    hasAchievement(achievementId) {
        return this.getEarnedAchievements().includes(achievementId);
    }

    // Achievement Data Storage (for special achievements that need additional tracking)
    getAchievementData() {
        return JSON.parse(localStorage.getItem(this.keys.achievementData)) || {};
    }

    saveAchievementData(data) {
        localStorage.setItem(this.keys.achievementData, JSON.stringify(data));
    }

    updateAchievementData(key, value) {
        const data = this.getAchievementData();
        data[key] = value;
        this.saveAchievementData(data);
    }

    // User Preferences
    getPreferences() {
        return JSON.parse(localStorage.getItem(this.keys.preferences)) || {
            viewMode: 'grid',
            filters: {
                studios: ['disney', 'pixar'],
                eras: ['golden', 'wartime', 'silver', 'bronze', 'renaissance', 'postRenaissance', 'revival'],
                status: ['watched', 'unwatched']
            }
        };
    }

    savePreferences(preferences) {
        localStorage.setItem(this.keys.preferences, JSON.stringify(preferences));
    }

    // Clear all storage (reset functionality)
    clearAllData() {
        localStorage.removeItem(this.keys.watchedMovies);
        localStorage.removeItem(this.keys.achievements);
        localStorage.removeItem(this.keys.achievementData);
        localStorage.removeItem(this.keys.preferences);
    }
}

// Create a global instance for use throughout the app
const storageManager = new StorageManager();
