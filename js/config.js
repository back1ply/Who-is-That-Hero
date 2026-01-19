/**
 * Game Configuration
 * Contains all constants and configuration values
 */

const CONFIG = {
    // Scoring
    POINTS_PER_CORRECT: 10,
    MAX_CHOICES: 4,

    // Image loading
    IMAGE_BASE_URL: 'https://raw.githubusercontent.com/back1ply/Who-is-That-Hero/main/Game%20Assets/',
    FALLBACK_IMAGE: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231A1A2E" width="400" height="400"/%3E%3Ctext fill="%2394A3B8" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="16" font-family="sans-serif"%3EImage not found%3C/text%3E%3C/svg%3E',

    // Difficulty levels
    DIFFICULTIES: ['easy', 'medium', 'hard'],

    // Storage keys
    STORAGE_KEYS: {
        HIGH_SCORE: 'wth_highScore',
        TOTAL_CORRECT: 'wth_totalCorrect',
        TOTAL_ROUNDS: 'wth_totalRounds',
        STATS: 'wth_stats'
    },

    // Animation durations (ms)
    ANIMATION: {
        FEEDBACK: 300,
        TRANSITION: 250,
        REVEAL: 400
    },

    // Total heroes in the game
    TOTAL_HEROES: 123
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.STORAGE_KEYS);
Object.freeze(CONFIG.ANIMATION);
