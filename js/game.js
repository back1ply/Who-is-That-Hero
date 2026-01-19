/**
 * Game Logic Module
 * Core game functionality separated from UI
 */

const Game = {
    /**
     * Fisher-Yates shuffle algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * Pick a random hero that hasn't been used
     * @returns {string|null} Hero ID or null if none available
     */
    pickRandomHero() {
        // Reset if all heroes used
        if (GameState.allHeroesUsed()) {
            GameState.resetUsedHeroes();
        }

        const available = GameState.getAvailableHeroes();
        if (available.length === 0) return null;

        const hero = available[Math.floor(Math.random() * available.length)];
        GameState.setCurrentHero(hero);
        return hero;
    },

    /**
     * Generate multiple choice options
     * @returns {string[]} Array of hero IDs (shuffled)
     */
    generateChoices() {
        const currentHero = GameState.getProperty('currentHero');
        const choices = [currentHero];

        // Add random wrong answers
        while (choices.length < CONFIG.MAX_CHOICES) {
            const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
            if (!choices.includes(randomHero)) {
                choices.push(randomHero);
            }
        }

        return this.shuffleArray(choices);
    },

    /**
     * Check if an answer is correct
     * @param {string} answer - The answer to check
     * @returns {boolean}
     */
    checkAnswer(answer) {
        const currentHero = GameState.getProperty('currentHero');
        return answer === currentHero;
    },

    /**
     * Check text input answer (for hard mode)
     * @param {string} userInput - User's text input
     * @returns {boolean}
     */
    checkTextAnswer(userInput) {
        const currentHero = GameState.getProperty('currentHero');
        const normalizedInput = userInput.trim().toLowerCase().replace(/[\s-]/g, '_');
        const normalizedHero = currentHero.replace(/[\s-]/g, '_');

        // Check for exact match or partial match
        return (
            normalizedInput === normalizedHero ||
            normalizedHero.includes(normalizedInput) ||
            this.formatHeroName(currentHero).toLowerCase().includes(userInput.trim().toLowerCase())
        );
    },

    /**
     * Process an answer submission
     * @param {boolean} isCorrect - Whether the answer was correct
     * @returns {Object} Result with message and updated stats
     */
    processAnswer(isCorrect) {
        if (isCorrect) {
            const result = GameState.processCorrectAnswer();
            return {
                correct: true,
                message: 'Correct!',
                ...result
            };
        } else {
            const result = GameState.processIncorrectAnswer();
            return {
                correct: false,
                message: `Wrong! It was ${this.formatHeroName(GameState.getProperty('currentHero'))}`,
                ...result
            };
        }
    },

    /**
     * Reveal the answer without guessing
     * @returns {Object} Result with hero name
     */
    revealAnswer() {
        const result = GameState.processReveal();
        return {
            heroName: this.formatHeroName(GameState.getProperty('currentHero')),
            ...result
        };
    },

    /**
     * Get hint for current hero
     * @returns {string}
     */
    getHint() {
        const currentHero = GameState.getProperty('currentHero');
        return heroHints[currentHero] || 'No hint available';
    },

    /**
     * Get image URL for a hero
     * @param {string} heroId - Hero identifier
     * @returns {string}
     */
    getImageUrl(heroId) {
        return `${CONFIG.IMAGE_BASE_URL}${heroId}.png`;
    },

    /**
     * Format hero name for display
     * @param {string} heroId - Hero identifier
     * @returns {string}
     */
    formatHeroName(heroId) {
        return heroId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },

    /**
     * Get image class based on difficulty
     * @param {string} difficulty - Current difficulty
     * @returns {string}
     */
    getImageClass(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 'hero-frame__image--hidden';
            case 'medium':
            case 'medium-hard':
            case 'hard':
                return 'hero-frame__image--silhouette';
            default:
                return 'hero-frame__image--hidden';
        }
    },

    /**
     * Check if difficulty uses text input
     * @param {string} difficulty - Current difficulty
     * @returns {boolean}
     */
    isTextInputMode(difficulty) {
        return difficulty === 'hard';
    },

    /**
     * Initialize a new round
     * @param {boolean} keepCurrentHero - If true, keep the current hero (for difficulty change)
     * @returns {Object} Round data for UI
     */
    initRound(keepCurrentHero = false) {
        if (!keepCurrentHero) {
            this.pickRandomHero();
        }

        const state = GameState.get();
        const difficulty = state.currentDifficulty;

        return {
            heroId: state.currentHero,
            imageUrl: this.getImageUrl(state.currentHero),
            imageClass: this.getImageClass(difficulty),
            isTextInput: this.isTextInputMode(difficulty),
            choices: this.isTextInputMode(difficulty) ? [] : this.generateChoices(),
            round: state.round,
            score: state.score,
            streak: state.streak
        };
    },

    /**
     * Advance to next round
     * @returns {Object} New round data
     */
    nextRound() {
        GameState.nextRound();
        return this.initRound();
    },

    /**
     * Change difficulty
     * @param {string} difficulty - New difficulty level
     * @returns {Object} Updated round data
     */
    setDifficulty(difficulty) {
        GameState.setDifficulty(difficulty);
        return this.initRound(true); // Keep current hero
    }
};
