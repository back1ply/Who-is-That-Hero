// ===================================
// DOM Element References
// ===================================

const heroImage = document.getElementById('heroImage');
const choicesContainer = document.getElementById('choices');
const textInputContainer = document.getElementById('textInputContainer');
const heroInput = document.getElementById('heroInput');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const revealBtn = document.getElementById('revealBtn');
const nextBtn = document.getElementById('nextBtn');
const hintBtn = document.getElementById('hintBtn');
const hintText = document.getElementById('hintText');
const scoreEl = document.getElementById('score');
const roundEl = document.getElementById('round');
const streakEl = document.getElementById('streak');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

// ===================================
// Utility Functions
// ===================================

/**
 * Format hero name for display
 * Converts underscores to spaces and capitalizes each word
 */
function formatHeroName(hero) {
    return hero.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ===================================
// Event Listeners
// ===================================

// Game controls
revealBtn.addEventListener('click', revealAnswer);
nextBtn.addEventListener('click', nextRound);
hintBtn.addEventListener('click', showHint);

// Text input controls
submitBtn.addEventListener('click', checkTextAnswer);
heroInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkTextAnswer();
    }
});

// Difficulty selector
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setDifficulty(btn.dataset.difficulty);
    });
});

// ===================================
// Initialize Game on Page Load
// ===================================

initGame();
