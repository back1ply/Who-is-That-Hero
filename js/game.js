// ===================================
// Game State Variables
// ===================================

let currentHero = '';
let score = 0;
let round = 1;
let streak = 0;
let answered = false;
let usedHeroes = [];
let currentDifficulty = 'easy';

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
        if (usedHeroes.length === heroes.length) {
            usedHeroes = [];
        }

        // Pick random unused hero
        let availableHeroes = heroes.filter(h => !usedHeroes.includes(h));
        currentHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
        usedHeroes.push(currentHero);

        // Load image from GitHub repo only when picking a new hero
        const imageUrl = `https://raw.githubusercontent.com/back1ply/Who-is-That-Hero/main/Game%20Assets/${currentHero}.png`;
        heroImage.src = imageUrl;
    }

    // Apply correct silhouette based on difficulty
    if (currentDifficulty === 'medium' || currentDifficulty === 'hard') {
        heroImage.className = 'hero-image black-silhouette';
    } else {
        heroImage.className = 'hero-image hidden';
    }

    // Show appropriate input method based on difficulty
    if (currentDifficulty === 'easy' || currentDifficulty === 'medium') {
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

    // Reset UI
    answered = false;
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
    const choices = [currentHero];

    // Add 3 random wrong answers
    while (choices.length < 4) {
        const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        if (!choices.includes(randomHero)) {
            choices.push(randomHero);
        }
    }

    // Shuffle choices
    choices.sort(() => Math.random() - 0.5);

    // Create buttons
    choicesContainer.innerHTML = '';
    choices.forEach(hero => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = formatHeroName(hero);
        btn.onclick = () => checkAnswer(hero, btn);
        choicesContainer.appendChild(btn);
    });
}

/**
 * Check answer for multiple choice mode
 */
function checkAnswer(selectedHero, btn) {
    if (answered) return;

    answered = true;
    const isCorrect = selectedHero === currentHero;

    // Disable all buttons
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        feedback.textContent = '✓ Correct!';
        feedback.className = 'feedback correct';
        score += 10;
        streak++;
        scoreEl.textContent = score;
        streakEl.textContent = streak;
    } else {
        btn.classList.add('incorrect');
        feedback.textContent = `✗ Wrong! It was ${formatHeroName(currentHero)}`;
        feedback.className = 'feedback incorrect';
        streak = 0;
        streakEl.textContent = streak;

        // Highlight correct answer
        document.querySelectorAll('.choice-btn').forEach(b => {
            if (b.textContent.toLowerCase().replace(/ /g, '_') === currentHero) {
                b.classList.add('correct');
            }
        });
    }

    // Reveal image
    heroImage.classList.remove('hidden', 'black-silhouette');
    heroImage.classList.add('revealed');

    // Show next button
    revealBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

/**
 * Check answer for text input mode
 */
function checkTextAnswer() {
    if (answered) return;

    const userInput = heroInput.value.trim().toLowerCase();
    if (!userInput) return;

    answered = true;
    heroInput.disabled = true;
    submitBtn.disabled = true;

    // Normalize hero name for comparison
    const normalizedInput = userInput.replace(/[\s-]/g, '_');
    const normalizedHero = currentHero.replace(/[\s-]/g, '_');

    // Check for exact match or if input is contained in hero name
    const isCorrect = normalizedInput === normalizedHero ||
        normalizedHero.includes(normalizedInput) ||
        formatHeroName(currentHero).toLowerCase().includes(userInput);

    if (isCorrect) {
        feedback.textContent = '✓ Correct!';
        feedback.className = 'feedback correct';
        score += 10;
        streak++;
        scoreEl.textContent = score;
        streakEl.textContent = streak;
    } else {
        feedback.textContent = `✗ Wrong! It was ${formatHeroName(currentHero)}`;
        feedback.className = 'feedback incorrect';
        streak = 0;
        streakEl.textContent = streak;
    }

    // Reveal image
    heroImage.classList.remove('hidden', 'black-silhouette');
    heroImage.classList.add('revealed');

    // Show next button
    revealBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

/**
 * Reveal the answer without guessing
 */
function revealAnswer() {
    if (answered) return;

    answered = true;
    heroImage.classList.remove('hidden', 'black-silhouette');
    heroImage.classList.add('revealed');

    feedback.textContent = `It was ${formatHeroName(currentHero)}`;
    feedback.className = 'feedback';

    streak = 0;
    streakEl.textContent = streak;

    // Highlight correct answer
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.toLowerCase().replace(/ /g, '_') === currentHero) {
            btn.classList.add('correct');
        }
    });

    revealBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

/**
 * Progress to the next round
 */
function nextRound() {
    round++;
    roundEl.textContent = round;
    initGame();
}

/**
 * Show hint for the current hero
 */
function showHint() {
    const hint = heroHints[currentHero] || 'No hint available';
    hintText.textContent = hint;
    hintText.className = 'hint-text';
    hintText.style.display = 'inline-block';
    hintBtn.style.display = 'none';
}

/**
 * Set the game difficulty level
 */
function setDifficulty(difficulty) {
    currentDifficulty = difficulty;

    // Update button states
    difficultyBtns.forEach(btn => {
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Restart current round with new difficulty, keeping the same hero (backdoor cheat!)
    initGame(true);
}
