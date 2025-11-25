// ===================================
// Game Constants
// ===================================

const POINTS_PER_CORRECT_ANSWER = 10;
const MAX_CHOICES = 4;
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/back1ply/Who-is-That-Hero/main/Game%20Assets/';
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23333" width="400" height="400"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3EImage not found%3C/text%3E%3C/svg%3E';

// ===================================
// Game State
// ===================================

const gameState = {
    currentHero: '',
    score: 0,
    round: 1,
    streak: 0,
    answered: false,
    usedHeroes: [],
    currentDifficulty: 'easy'
};

// ===================================
// Utility Functions
// ===================================

/**
 * Fisher-Yates shuffle algorithm for unbiased array shuffling
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Validate that a hero exists in the data
 * @param {string} heroId - Hero identifier to validate
 * @returns {boolean} True if hero exists
 */
function isValidHero(heroId) {
    return heroes.includes(heroId);
}

/**
 * Get hint for a hero with fallback
 * @param {string} heroId - Hero identifier
 * @returns {string} Hint text
 */
function getHeroHint(heroId) {
    return heroHints[heroId] || 'No hint available';
}

// ===================================
// Core Game Functions
// ===================================

/**
 * Initialize or reset the game for a new round
 * @param {boolean} keepCurrentHero - If true, keeps the current hero (used when changing difficulty)
 */
function initGame(keepCurrentHero = false) {
    // Only pick a new hero if not keeping the current one
    if (!keepCurrentHero) {
        // Reset if all heroes used
        if (gameState.usedHeroes.length >= heroes.length) {
            gameState.usedHeroes = [];
        }

        // Pick random unused hero
        const availableHeroes = heroes.filter(h => !gameState.usedHeroes.includes(h));

        // Validate we have heroes available
        if (availableHeroes.length === 0) {
            console.error('No heroes available');
            return;
        }

        gameState.currentHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
        gameState.usedHeroes.push(gameState.currentHero);

        // Load image from GitHub repo only when picking a new hero
        loadHeroImage(gameState.currentHero);
    }

    // Apply correct silhouette based on difficulty
    updateImageDisplay();

    // Show appropriate input method based on difficulty
    updateInputMethod();

    // Reset UI
    resetUI();
}

/**
 * Load hero image with error handling
 * @param {string} heroId - Hero identifier
 */
function loadHeroImage(heroId) {
    const imageUrl = `${IMAGE_BASE_URL}${heroId}.png`;

    heroImage.src = imageUrl;

    // Add error handler for image loading failures
    heroImage.onerror = () => {
        console.error(`Failed to load image for ${heroId}`);
        heroImage.src = FALLBACK_IMAGE;
        showImageError(heroId);
    };

    // Clear error handler on successful load
    heroImage.onload = () => {
        clearImageError();
    };
}

/**
 * Update image display based on difficulty
 */
function updateImageDisplay() {
    if (gameState.currentDifficulty === 'medium' || gameState.currentDifficulty === 'medium-hard' || gameState.currentDifficulty === 'hard') {
        heroImage.className = 'hero-image black-silhouette';
    } else {
        heroImage.className = 'hero-image hidden';
    }
}

/**
 * Update input method based on difficulty
 */
function updateInputMethod() {
    if (gameState.currentDifficulty === 'easy' || gameState.currentDifficulty === 'medium' || gameState.currentDifficulty === 'medium-hard') {
        choicesContainer.style.display = 'grid';
        textInputContainer.style.display = 'none';
        generateChoices();
    } else {
        choicesContainer.style.display = 'none';
        textInputContainer.style.display = 'flex';
        heroInput.value = '';
        heroInput.disabled = false;
        submitBtn.disabled = false;
    }
}

/**
 * Reset UI elements for new round
 */
function resetUI() {
    gameState.answered = false;
    feedback.textContent = '';
    feedback.className = 'feedback';
    revealBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    hintBtn.style.display = 'inline-block';
    hintBtn.disabled = false;
    hintText.style.display = 'none';
    hintText.className = '';
}

/**
 * Generate 4 multiple choice options
 */
function generateChoices() {
    const choices = [gameState.currentHero];

    // Add 3 random wrong answers
    while (choices.length < MAX_CHOICES) {
        const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        if (!choices.includes(randomHero)) {
            choices.push(randomHero);
        }
    }

    // Shuffle choices using Fisher-Yates algorithm
    const shuffledChoices = shuffleArray(choices);

    // Create buttons
    choicesContainer.innerHTML = '';
    shuffledChoices.forEach(hero => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = formatHeroName(hero);
        btn.dataset.heroId = hero; // Store hero ID in data attribute
        btn.onclick = () => checkAnswer(hero, btn);
        choicesContainer.appendChild(btn);
    });
}

/**
 * Check answer for multiple choice mode
 */
function checkAnswer(selectedHero, btn) {
    if (gameState.answered) return;

    gameState.answered = true;
    const isCorrect = selectedHero === gameState.currentHero;

    // Disable all buttons
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

    // Update game state
    const result = processAnswer(isCorrect);

    // Update UI with result
    updateAnswerFeedback(result, btn);
    revealHeroImage();
    showNextButton();
}

/**
 * Process answer and update game state
 * @param {boolean} isCorrect - Whether the answer was correct
 * @returns {object} Result object with score and streak info
 */
function processAnswer(isCorrect) {
    if (isCorrect) {
        gameState.score += POINTS_PER_CORRECT_ANSWER;
        gameState.streak++;
        return {
            correct: true,
            score: gameState.score,
            streak: gameState.streak,
            message: '✓ Correct!'
        };
    } else {
        gameState.streak = 0;
        return {
            correct: false,
            score: gameState.score,
            streak: gameState.streak,
            message: `✗ Wrong! It was ${formatHeroName(gameState.currentHero)}`
        };
    }
}

/**
 * Update UI with answer feedback
 * @param {object} result - Result object from processAnswer
 * @param {HTMLElement} btn - Button element that was clicked
 */
function updateAnswerFeedback(result, btn) {
    if (result.correct) {
        btn.classList.add('correct');
        feedback.textContent = result.message;
        feedback.className = 'feedback correct';
    } else {
        btn.classList.add('incorrect');
        feedback.textContent = result.message;
        feedback.className = 'feedback incorrect';

        // Highlight correct answer using data attribute
        document.querySelectorAll('.choice-btn').forEach(b => {
            if (b.dataset.heroId === gameState.currentHero) {
                b.classList.add('correct');
            }
        });
    }

    // Update score display
    scoreEl.textContent = result.score;
    streakEl.textContent = result.streak;
}

/**
 * Reveal hero image
 */
function revealHeroImage() {
    heroImage.classList.remove('hidden', 'black-silhouette');
    heroImage.classList.add('revealed');
}

/**
 * Show next button and hide reveal button
 */
function showNextButton() {
    revealBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

/**
 * Check answer for text input mode
 */
function checkTextAnswer() {
    if (gameState.answered) return;

    const userInput = heroInput.value.trim().toLowerCase();
    if (!userInput) return;

    gameState.answered = true;
    heroInput.disabled = true;
    submitBtn.disabled = true;

    // Normalize hero name for comparison
    const normalizedInput = userInput.replace(/[\s-]/g, '_');
    const normalizedHero = gameState.currentHero.replace(/[\s-]/g, '_');

    // Check for exact match or if input is contained in hero name
    const isCorrect = normalizedInput === normalizedHero ||
        normalizedHero.includes(normalizedInput) ||
        formatHeroName(gameState.currentHero).toLowerCase().includes(userInput);

    // Process answer and update UI
    const result = processAnswer(isCorrect);

    feedback.textContent = result.message;
    feedback.className = result.correct ? 'feedback correct' : 'feedback incorrect';
    scoreEl.textContent = result.score;
    streakEl.textContent = result.streak;

    revealHeroImage();
    showNextButton();
}

/**
 * Reveal the answer without guessing
 */
function revealAnswer() {
    if (gameState.answered) return;

    gameState.answered = true;
    revealHeroImage();

    feedback.textContent = `It was ${formatHeroName(gameState.currentHero)}`;
    feedback.className = 'feedback';

    gameState.streak = 0;
    streakEl.textContent = gameState.streak;

    // Highlight correct answer using data attribute
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.heroId === gameState.currentHero) {
            btn.classList.add('correct');
        }
    });

    showNextButton();
}

/**
 * Progress to the next round
 */
function nextRound() {
    gameState.round++;
    roundEl.textContent = gameState.round;
    initGame();
}

/**
 * Show hint for the current hero
 */
function showHint() {
    const hint = getHeroHint(gameState.currentHero);
    hintText.textContent = hint;
    hintText.className = 'hint-text';
    hintText.style.display = 'inline-block';
    hintBtn.style.display = 'none';
}

/**
 * Set the game difficulty level
 */
function setDifficulty(difficulty) {
    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'medium-hard', 'hard'];
    if (!validDifficulties.includes(difficulty)) {
        console.error(`Invalid difficulty: ${difficulty}`);
        return;
    }

    gameState.currentDifficulty = difficulty;

    // Update button states
    difficultyBtns.forEach(btn => {
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Restart current round with new difficulty, keeping the same hero
    initGame(true);
}

// ===================================
// Error Handling UI
// ===================================

/**
 * Show image loading error message
 * @param {string} heroId - Hero identifier that failed to load
 */
function showImageError(heroId) {
    const errorContainer = document.getElementById('imageError');
    if (errorContainer) {
        errorContainer.textContent = `Failed to load image for ${formatHeroName(heroId)}`;
        errorContainer.style.display = 'block';
    }
}

/**
 * Clear image loading error message
 */
function clearImageError() {
    const errorContainer = document.getElementById('imageError');
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
}
