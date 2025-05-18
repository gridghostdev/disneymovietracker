/**
 * StorageManager - Centralized storage management for Disney Animation Tracker
 * Handles saving and loading watch history, achievements, and other data
 */
class StorageManager {
    constructor() {
        // Storage keys
        this.keys = {
            watchedMovies: 'disneyTracker_watchedMovies',
            watchHistory: 'disneyTracker_watchHistory',
            achievements: 'disneyTracker_achievements',
            achievementData: 'disneyTracker_achievementData',
            preferences: 'disneyTracker_preferences',
            ratings: 'disneyTracker_ratings'
        };
        
        // Initialize with default values if storage is empty
        this.initialize();
    }
    
    // Initialize storage with default values if needed
    initialize() {
        if (!localStorage.getItem(this.keys.watchedMovies)) {
            this.saveWatchedMovies([]);
        }
        
        if (!localStorage.getItem(this.keys.watchHistory)) {
            this.saveWatchHistory([]);
        }
        
        if (!localStorage.getItem(this.keys.achievements)) {
            this.saveEarnedAchievements([]);
        }
        
        if (!localStorage.getItem(this.keys.achievementData)) {
            this.saveAchievementData({});
        }
        
        if (!localStorage.getItem(this.keys.preferences)) {
            this.savePreferences({
                viewMode: 'grid',
                filters: {
                    studios: ['disney', 'pixar'],
                    eras: ['golden', 'wartime', 'silver', 'bronze', 'renaissance', 'postRenaissance', 'revival'],
                    status: ['watched', 'unwatched']
                }
            });
        }

        if (!localStorage.getItem(this.keys.ratings)) {
            this.saveRatings({});
        }
    }

    // Watched Movies Storage
    getWatchedMovies() {
        return JSON.parse(localStorage.getItem(this.keys.watchedMovies)) || [];
    }

    saveWatchedMovies(watchedMovies) {
        localStorage.setItem(this.keys.watchedMovies, JSON.stringify(watchedMovies));
    }

    // Watch History with timestamps
    getWatchHistory() {
        return JSON.parse(localStorage.getItem(this.keys.watchHistory)) || [];
    }
    
    saveWatchHistory(history) {
        localStorage.setItem(this.keys.watchHistory, JSON.stringify(history));
    }
    
    addWatchedMovie(movieId) {
        // Add to watched movie IDs list
        const watchedMovies = this.getWatchedMovies();
        if (!watchedMovies.includes(movieId)) {
            watchedMovies.push(movieId);
            this.saveWatchedMovies(watchedMovies);
            
            // Add to watch history with timestamp
            const history = this.getWatchHistory();
            history.push({
                movieId,
                timestamp: Date.now(),
                action: 'added'
            });
            this.saveWatchHistory(history);
            
            return true; // Movie was newly added
        }
        return false; // Movie was already in watched list
    }

    removeWatchedMovie(movieId) {
        const watchedMovies = this.getWatchedMovies();
        const index = watchedMovies.indexOf(movieId);
        if (index !== -1) {
            // Remove from watched movies list
            watchedMovies.splice(index, 1);
            this.saveWatchedMovies(watchedMovies);
            
            // Add removal entry to history
            const history = this.getWatchHistory();
            history.push({
                movieId,
                timestamp: Date.now(),
                action: 'removed'
            });
            this.saveWatchHistory(history);
            
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

    // Rating Storage
    getRatings() {
        return JSON.parse(localStorage.getItem(this.keys.ratings)) || {};
    }

    saveRatings(ratings) {
        localStorage.setItem(this.keys.ratings, JSON.stringify(ratings));
    }

    setMovieRating(movieId, rating) {
        const ratings = this.getRatings();
        ratings[movieId] = {
            rating: rating,
            timestamp: Date.now()
        };
        this.saveRatings(ratings);
        
        // Emit rating change event
        const event = new CustomEvent('ratingChanged', {
            detail: { movieId, rating }
        });
        document.dispatchEvent(event);
    }

    getMovieRating(movieId) {
        const ratings = this.getRatings();
        return ratings[movieId]?.rating || null;
    }

    removeMovieRating(movieId) {
        const ratings = this.getRatings();
        delete ratings[movieId];
        this.saveRatings(ratings);
        
        // Emit rating removed event
        const event = new CustomEvent('ratingChanged', {
            detail: { movieId, rating: null }
        });
        document.dispatchEvent(event);
    }

    // Get progress stats
    getProgressStats() {
        const watchedMovies = this.getWatchedMovies();
        
        // Filter Disney watched movies
        const watchedDisney = DISNEY_FILMS.filter(film => 
            watchedMovies.includes(film.id)
        ).length;
        
        // Filter Pixar watched movies
        const watchedPixar = PIXAR_FILMS.filter(film => 
            watchedMovies.includes(film.id)
        ).length;
        
        // Calculate percentages
        const disneyPercentage = DISNEY_FILMS.length ? Math.round((watchedDisney / DISNEY_FILMS.length) * 100) : 0;
        const pixarPercentage = PIXAR_FILMS.length ? Math.round((watchedPixar / PIXAR_FILMS.length) * 100) : 0;
        const overallPercentage = ALL_FILMS.length ? Math.round((watchedMovies.length / ALL_FILMS.length) * 100) : 0;
        
        return {
            watched: {
                total: watchedMovies.length,
                disney: watchedDisney,
                pixar: watchedPixar
            },
            totals: {
                all: ALL_FILMS.length,
                disney: DISNEY_FILMS.length,
                pixar: PIXAR_FILMS.length
            },
            percentages: {
                overall: overallPercentage,
                disney: disneyPercentage,
                pixar: pixarPercentage
            }
        };
    }

    // Clear all storage (reset functionality)
    clearAllData() {
        localStorage.removeItem(this.keys.watchedMovies);
        localStorage.removeItem(this.keys.watchHistory);
        localStorage.removeItem(this.keys.achievements);
        localStorage.removeItem(this.keys.achievementData);
        localStorage.removeItem(this.keys.preferences);
        localStorage.removeItem(this.keys.ratings);
        this.initialize();
    }
}

// Create a global instance for use throughout the app
const storageManager = new StorageManager();
