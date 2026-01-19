/**
 * Game State Module
 * Centralized state management for the game
 */

const GameState = {
    // Current game state
    _state: {
        currentHero: '',
        score: 0,
        round: 1,
        streak: 0,
        answered: false,
        usedHeroes: [],
        currentDifficulty: 'easy',
        totalCorrect: 0,
        totalAttempts: 0
    },

    /**
     * Get the current state (read-only copy)
     * @returns {Object}
     */
    get() {
        return { ...this._state };
    },

    /**
     * Get a specific state property
     * @param {string} key - Property key
     * @returns {*}
     */
    getProperty(key) {
        return this._state[key];
    },

    /**
     * Update state with new values
     * @param {Object} updates - Object with key-value pairs to update
     */
    update(updates) {
        Object.assign(this._state, updates);
    },

    /**
     * Set the current hero
     * @param {string} heroId - Hero identifier
     */
    setCurrentHero(heroId) {
        this._state.currentHero = heroId;
        if (!this._state.usedHeroes.includes(heroId)) {
            this._state.usedHeroes.push(heroId);
        }
    },

    /**
     * Mark current round as answered
     */
    markAnswered() {
        this._state.answered = true;
    },

    /**
     * Process a correct answer
     * @returns {Object} Updated score info
     */
    processCorrectAnswer() {
        this._state.score += CONFIG.POINTS_PER_CORRECT;
        this._state.streak++;
        this._state.totalCorrect++;
        this._state.totalAttempts++;
        this._state.answered = true;

        // Update persistent storage
        Storage.updateStats({
            correctDelta: 1,
            roundDelta: 1,
            streak: this._state.streak
        });
        Storage.setHighScore(this._state.score);

        return {
            score: this._state.score,
            streak: this._state.streak,
            isNewHighScore: Storage.getHighScore() === this._state.score
        };
    },

    /**
     * Process an incorrect answer
     * @returns {Object} Updated score info
     */
    processIncorrectAnswer() {
        this._state.streak = 0;
        this._state.totalAttempts++;
        this._state.answered = true;

        // Update persistent storage
        Storage.updateStats({
            correctDelta: 0,
            roundDelta: 1
        });

        return {
            score: this._state.score,
            streak: 0
        };
    },

    /**
     * Process reveal (no guess)
     * @returns {Object} Updated score info
     */
    processReveal() {
        this._state.streak = 0;
        this._state.answered = true;

        return {
            score: this._state.score,
            streak: 0
        };
    },

    /**
     * Advance to next round
     */
    nextRound() {
        this._state.round++;
        this._state.answered = false;
    },

    /**
     * Set difficulty level
     * @param {string} difficulty - Difficulty level
     */
    setDifficulty(difficulty) {
        if (CONFIG.DIFFICULTIES.includes(difficulty)) {
            this._state.currentDifficulty = difficulty;
        }
    },

    /**
     * Check if all heroes have been used
     * @returns {boolean}
     */
    allHeroesUsed() {
        return this._state.usedHeroes.length >= heroes.length;
    },

    /**
     * Reset used heroes list
     */
    resetUsedHeroes() {
        this._state.usedHeroes = [];
    },

    /**
     * Get available (unused) heroes
     * @returns {string[]}
     */
    getAvailableHeroes() {
        return heroes.filter(h => !this._state.usedHeroes.includes(h));
    },

    /**
     * Calculate current accuracy
     * @returns {number} Percentage (0-100)
     */
    getAccuracy() {
        if (this._state.totalAttempts === 0) return 0;
        return Math.round((this._state.totalCorrect / this._state.totalAttempts) * 100);
    },

    /**
     * Reset game state for a new game
     */
    reset() {
        this._state = {
            currentHero: '',
            score: 0,
            round: 1,
            streak: 0,
            answered: false,
            usedHeroes: [],
            currentDifficulty: this._state.currentDifficulty, // Keep difficulty
            totalCorrect: 0,
            totalAttempts: 0
        };
    }
};
