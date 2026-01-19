/**
 * Storage Module
 * Handles localStorage operations for persisting game data
 */

const Storage = {
    /**
     * Check if localStorage is available
     * @returns {boolean}
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Get a value from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*}
     */
    get(key, defaultValue = null) {
        if (!this.isAvailable()) return defaultValue;

        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn(`Storage.get error for key "${key}":`, e);
            return defaultValue;
        }
    },

    /**
     * Set a value in localStorage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    set(key, value) {
        if (!this.isAvailable()) return false;

        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn(`Storage.set error for key "${key}":`, e);
            return false;
        }
    },

    /**
     * Remove a value from localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    remove(key) {
        if (!this.isAvailable()) return false;

        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn(`Storage.remove error for key "${key}":`, e);
            return false;
        }
    },

    /**
     * Get high score
     * @returns {number}
     */
    getHighScore() {
        return this.get(CONFIG.STORAGE_KEYS.HIGH_SCORE, 0);
    },

    /**
     * Set high score if it's higher than current
     * @param {number} score - New score to check
     * @returns {boolean} True if new high score was set
     */
    setHighScore(score) {
        const currentHigh = this.getHighScore();
        if (score > currentHigh) {
            this.set(CONFIG.STORAGE_KEYS.HIGH_SCORE, score);
            return true;
        }
        return false;
    },

    /**
     * Get game statistics
     * @returns {Object}
     */
    getStats() {
        return this.get(CONFIG.STORAGE_KEYS.STATS, {
            totalCorrect: 0,
            totalRounds: 0,
            gamesPlayed: 0,
            bestStreak: 0
        });
    },

    /**
     * Update game statistics
     * @param {Object} updates - Stats to update
     */
    updateStats(updates) {
        const currentStats = this.getStats();
        const newStats = {
            ...currentStats,
            ...updates,
            totalCorrect: (currentStats.totalCorrect || 0) + (updates.correctDelta || 0),
            totalRounds: (currentStats.totalRounds || 0) + (updates.roundDelta || 0)
        };

        // Update best streak if current is higher
        if (updates.streak && updates.streak > (currentStats.bestStreak || 0)) {
            newStats.bestStreak = updates.streak;
        }

        // Remove delta properties
        delete newStats.correctDelta;
        delete newStats.roundDelta;

        this.set(CONFIG.STORAGE_KEYS.STATS, newStats);
        return newStats;
    },

    /**
     * Get accuracy percentage
     * @returns {number} Accuracy as percentage (0-100)
     */
    getAccuracy() {
        const stats = this.getStats();
        if (stats.totalRounds === 0) return 0;
        return Math.round((stats.totalCorrect / stats.totalRounds) * 100);
    },

    /**
     * Clear all game data
     */
    clearAll() {
        Object.values(CONFIG.STORAGE_KEYS).forEach(key => this.remove(key));
    }
};
