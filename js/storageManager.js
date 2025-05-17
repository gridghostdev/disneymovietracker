/**
 * Storage Manager for Disney Animation Tracker
 * Centralizes all localStorage operations for consistent data management
 */
const StorageManager = {
    // Storage keys
    KEYS: {
        WATCHED_MOVIES: 'disney_tracker_watched_movies',
        ACHIEVEMENTS: 'disney_tracker_achievements',
        ACHIEVEMENT_DATA: 'disney_tracker_achievements_data',
        WATCH_HISTORY: 'disney_tracker_watch_history',
        USER_SETTINGS: 'disney_tracker_settings'
    },
    
    /**
     * Initialize storage and check if localStorage is available
     */
    init: function() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            
            // Migrate data from old keys if needed
            this.migrateFromLegacyStorage();
            
            console.log('StorageManager initialized successfully');
            return true;
        } catch (e) {
            console.error('LocalStorage is not available:', e);
            return false;
        }
    },
    
    /**
     * Migrate data from legacy storage keys
     */
    migrateFromLegacyStorage: function() {
        // Check for legacy watched movies data
        const legacyWatchedData = localStorage.getItem(CONFIG.localStorageKey);
        if (legacyWatchedData && !localStorage.getItem(this.KEYS.WATCHED_MOVIES)) {
            console.log('Migrating legacy watched data');
            localStorage.setItem(this.KEYS.WATCHED_MOVIES, legacyWatchedData);
        }
        
        // Check for legacy achievements data
        const legacyAchievements = localStorage.getItem('disneyTrackerAchievements');
        const legacyAchievementData = localStorage.getItem('disneyTrackerAchievements_data');
        
        if (legacyAchievements && !localStorage.getItem(this.KEYS.ACHIEVEMENTS)) {
            console.log('Migrating legacy achievements');
            localStorage.setItem(this.KEYS.ACHIEVEMENTS, legacyAchievements);
        }
        
        if (legacyAchievementData && !localStorage.getItem(this.KEYS.ACHIEVEMENT_DATA)) {
            console.log('Migrating legacy achievement data');
            localStorage.setItem(this.KEYS.ACHIEVEMENT_DATA, legacyAchievementData);
        }
    },
    
    /**
     * Save watched movies
     * @param {Array} watchedMovies - Array of watched movie IDs
     * @returns {Boolean} - Success status
     */
    saveWatchedMovies: function(watchedMovies) {
        try {
            localStorage.setItem(this.KEYS.WATCHED_MOVIES, JSON.stringify(watchedMovies));
            return true;
        } catch (e) {
            console.error('Error saving watched movies:', e);
            return false;
        }
    },
    
    /**
     * Get watched movies
     * @returns {Array} - Array of watched movie IDs
     */
    getWatchedMovies: function() {
        try {
            const data = localStorage.getItem(this.KEYS.WATCHED_MOVIES);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error retrieving watched movies:', e);
            return [];
        }
    },
    
    /**
     * Mark movie as watched or unwatched
     * @param {Number|String} movieId - ID of the movie
     * @returns {Boolean} - New watched status (true = watched)
     */
    toggleMovieWatched: function(movieId) {
        const watchedMovies = this.getWatchedMovies();
        const index = watchedMovies.indexOf(movieId);
        const now = Date.now();
        
        if (index === -1) {
            // Add to watched
            watchedMovies.push(movieId);
            this.addWatchHistoryEntry(movieId, now, 'watched');
            this.saveWatchedMovies(watchedMovies);
            return true;
        } else {
            // Remove from watched
            watchedMovies.splice(index, 1);
            this.addWatchHistoryEntry(movieId, now, 'unwatched');
            this.saveWatchedMovies(watchedMovies);
            return false;
        }
    },
    
    /**
     * Check if movie is watched
     * @param {Number|String} movieId - ID of the movie
     * @returns {Boolean} - Whether the movie is watched
     */
    isMovieWatched: function(movieId) {
        const watchedMovies = this.getWatchedMovies();
        return watchedMovies.includes(movieId);
    },
    
    /**
     * Save achievements
     * @param {Array} achievements - List of earned achievement IDs
     * @returns {Boolean} - Success status
     */
    saveAchievements: function(achievements) {
        try {
            localStorage.setItem(this.KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
            return true;
        } catch (e) {
            console.error('Error saving achievements:', e);
            return false;
        }
    },
    
    /**
     * Get earned achievements
     * @returns {Array} - List of earned achievement IDs
     */
    getAchievements: function() {
        try {
            const data = localStorage.getItem(this.KEYS.ACHIEVEMENTS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error retrieving achievements:', e);
            return [];
        }
    },
    
    /**
     * Save achievement data (for time-based achievements)
     * @param {Object} data - Achievement tracking data
     * @returns {Boolean} - Success status
     */
    saveAchievementData: function(data) {
        try {
            localStorage.setItem(this.KEYS.ACHIEVEMENT_DATA, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving achievement data:', e);
            return false;
        }
    },
    
    /**
     * Get achievement data
     * @returns {Object} - Achievement tracking data
     */
    getAchievementData: function() {
        try {
            const data = localStorage.getItem(this.KEYS.ACHIEVEMENT_DATA);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Error retrieving achievement data:', e);
            return {};
        }
    },
    
    /**
     * Add entry to watch history
     * @param {Number|String} movieId - ID of the movie
     * @param {Number} timestamp - Time of the watch event
     * @param {String} action - Action taken (watched/unwatched)
     */
    addWatchHistoryEntry: function(movieId, timestamp, action) {
        try {
            const history = this.getWatchHistory();
            history.push({ movieId, timestamp, action });
            
            // Limit history size to prevent excessive storage
            if (history.length > 100) {
                history.shift(); // Remove oldest entry
            }
            
            localStorage.setItem(this.KEYS.WATCH_HISTORY, JSON.stringify(history));
            return true;
        } catch (e) {
            console.error('Error updating watch history:', e);
            return false;
        }
    },
    
    /**
     * Get watch history
     * @returns {Array} - List of watch history entries
     */
    getWatchHistory: function() {
        try {
            const data = localStorage.getItem(this.KEYS.WATCH_HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error retrieving watch history:', e);
            return [];
        }
    },
    
    /**
     * Clear all stored data
     * @returns {Boolean} - Success status
     */
    clearAllData: function() {
        try {
            for (const key of Object.values(this.KEYS)) {
                localStorage.removeItem(key);
            }
            return true;
        } catch (e) {
            console.error('Error clearing data:', e);
            return false;
        }
    },
    
    /**
     * Export all data as JSON string
     * @returns {String} - JSON string with all data
     */
    exportData: function() {
        const data = {
            watchedMovies: this.getWatchedMovies(),
            achievements: this.getAchievements(),
            achievementData: this.getAchievementData(),
            watchHistory: this.getWatchHistory()
        };
        
        return JSON.stringify(data);
    },
    
    /**
     * Import data from JSON string
     * @param {String} jsonString - JSON string with data to import
     * @returns {Boolean} - Success status
     */
    importData: function(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.watchedMovies) {
                this.saveWatchedMovies(data.watchedMovies);
            }
            
            if (data.achievements) {
                this.saveAchievements(data.achievements);
            }
            
            if (data.achievementData) {
                this.saveAchievementData(data.achievementData);
            }
            
            if (data.watchHistory) {
                localStorage.setItem(this.KEYS.WATCH_HISTORY, JSON.stringify(data.watchHistory));
            }
            
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    }
};
