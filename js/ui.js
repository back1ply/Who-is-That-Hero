/**
 * UI Module
 * Handles all DOM manipulation and rendering
 */

const UI = {
    // DOM Element cache
    elements: {},

    /**
     * Initialize DOM element references
     */
    init() {
        this.elements = {
            // Hero image
            heroImage: document.getElementById('heroImage'),
            imageError: document.getElementById('imageError'),

            // Stats
            scoreEl: document.getElementById('score'),
            streakEl: document.getElementById('streak'),
            roundEl: document.getElementById('round'),
            highScoreEl: document.getElementById('highScore'),
            accuracyEl: document.getElementById('accuracy'),

            // Inline Stats (Mobile)
            roundInlineEl: document.getElementById('roundInline'),
            accuracyInlineEl: document.getElementById('accuracyInline'),

            // Feedback
            feedback: document.getElementById('feedback'),

            // Hint
            hintBtn: document.getElementById('hintBtn'),
            hintContainer: document.getElementById('hintContainer'),
            hintText: document.getElementById('hintText'),

            // Choices
            choicesContainer: document.getElementById('choicesContainer'),

            // Text input
            textInputContainer: document.getElementById('textInputContainer'),
            heroInput: document.getElementById('heroInput'),
            submitBtn: document.getElementById('submitBtn'),

            // Controls
            revealBtn: document.getElementById('revealBtn'),
            nextBtn: document.getElementById('nextBtn'),

            // Settings menu
            settingsBtn: document.getElementById('settingsBtn'),
            settingsDropdown: document.getElementById('settingsDropdown'),
            settingsOptions: document.querySelectorAll('.settings-option')
        };
    },

    /**
     * Render a new round
     * @param {Object} roundData - Data from Game.initRound()
     */
    renderRound(roundData) {
        // Load hero image
        this.loadImage(roundData.imageUrl, roundData.imageClass);

        // Update stats display
        this.updateStats(roundData);

        // Show appropriate input method
        if (roundData.isTextInput) {
            this.showTextInput();
        } else {
            this.showChoices(roundData.choices);
        }

        // Reset UI state
        this.resetRoundUI();

        // Update persistent stats
        this.updatePersistentStats();
    },

    /**
     * Load hero image with error handling
     * @param {string} url - Image URL
     * @param {string} className - CSS class for image state
     */
    loadImage(url, className) {
        const img = this.elements.heroImage;

        img.onload = () => {
            this.hideError();
        };

        img.onerror = () => {
            img.src = CONFIG.FALLBACK_IMAGE;
            this.showError('Failed to load hero image');
        };

        img.src = url;
        img.className = `hero-frame__image ${className}`;
    },

    /**
     * Show multiple choice buttons
     * @param {string[]} choices - Array of hero IDs
     */
    showChoices(choices) {
        const container = this.elements.choicesContainer;
        container.innerHTML = '';
        container.classList.remove('hidden');
        this.elements.textInputContainer.classList.add('hidden');

        choices.forEach(heroId => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = Game.formatHeroName(heroId);
            btn.dataset.heroId = heroId;
            btn.addEventListener('click', () => this.handleChoiceClick(heroId, btn));
            container.appendChild(btn);
        });
    },

    /**
     * Show text input for hard mode
     */
    showTextInput() {
        this.elements.choicesContainer.classList.add('hidden');
        this.elements.textInputContainer.classList.remove('hidden');
        this.elements.heroInput.value = '';
        this.elements.heroInput.disabled = false;
        this.elements.submitBtn.disabled = false;
        this.elements.heroInput.focus();
    },

    /**
     * Handle choice button click
     * @param {string} heroId - Selected hero ID
     * @param {HTMLElement} btn - Clicked button element
     */
    handleChoiceClick(heroId, btn) {
        if (GameState.getProperty('answered')) return;

        const isCorrect = Game.checkAnswer(heroId);
        const result = Game.processAnswer(isCorrect);

        // Update button states
        this.disableChoices();
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Highlight correct answer if wrong
        if (!isCorrect) {
            this.highlightCorrectAnswer();
        }

        // Show feedback
        this.showFeedback(result);

        // Reveal image
        this.revealImage();

        // Show next button
        this.showNextButton();
    },

    /**
     * Handle text input submission
     */
    handleTextSubmit() {
        if (GameState.getProperty('answered')) return;

        const input = this.elements.heroInput.value.trim();
        if (!input) return;

        const isCorrect = Game.checkTextAnswer(input);
        const result = Game.processAnswer(isCorrect);

        // Disable input
        this.elements.heroInput.disabled = true;
        this.elements.submitBtn.disabled = true;

        // Show feedback
        this.showFeedback(result);

        // Reveal image
        this.revealImage();

        // Show next button
        this.showNextButton();
    },

    /**
     * Handle reveal button click
     */
    handleReveal() {
        if (GameState.getProperty('answered')) return;

        const result = Game.revealAnswer();

        // Disable all inputs
        this.disableChoices();
        this.elements.heroInput.disabled = true;
        this.elements.submitBtn.disabled = true;

        // Highlight correct answer
        this.highlightCorrectAnswer();

        // Show feedback
        this.showFeedback({
            correct: null,
            message: `It was ${result.heroName}`,
            streak: result.streak
        });

        // Reveal image
        this.revealImage();

        // Show next button
        this.showNextButton();
    },

    /**
     * Handle hint button click
     */
    handleHint() {
        const hint = Game.getHint();
        this.elements.hintText.textContent = hint;
        this.elements.hintContainer.classList.remove('hidden');
        this.elements.hintBtn.classList.add('hidden');
    },

    /**
     * Handle difficulty change
     * @param {string} difficulty - New difficulty level
     */
    handleDifficultyChange(difficulty) {
        // Update settings dropdown options
        this.elements.settingsOptions.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
        });

        // Close dropdown
        this.closeSettingsDropdown();

        // Get updated round data
        const roundData = Game.setDifficulty(difficulty);

        // Re-render round with new difficulty
        this.renderRound(roundData);
    },

    /**
     * Toggle settings dropdown
     */
    toggleSettingsDropdown() {
        this.elements.settingsDropdown.classList.toggle('hidden');
    },

    /**
     * Close settings dropdown
     */
    closeSettingsDropdown() {
        this.elements.settingsDropdown.classList.add('hidden');
    },

    /**
     * Handle next round
     */
    handleNextRound() {
        const roundData = Game.nextRound();
        this.renderRound(roundData);
    },

    /**
     * Show feedback message
     * @param {Object} result - Result from Game.processAnswer()
     */
    showFeedback(result) {
        const feedback = this.elements.feedback;
        feedback.textContent = result.message;

        feedback.classList.remove('feedback--correct', 'feedback--incorrect', 'feedback--neutral');

        if (result.correct === true) {
            feedback.classList.add('feedback--correct');
        } else if (result.correct === false) {
            feedback.classList.add('feedback--incorrect');
        } else {
            feedback.classList.add('feedback--neutral');
        }

        // Update stats
        this.updateStats({
            score: result.score,
            streak: result.streak
        });

        // Update persistent stats
        this.updatePersistentStats();
    },

    /**
     * Update stats display
     * @param {Object} stats - Score, streak, round
     */
    updateStats(stats) {
        if (stats.score !== undefined) {
            this.elements.scoreEl.textContent = stats.score;
        }
        if (stats.streak !== undefined) {
            this.elements.streakEl.textContent = stats.streak;
        }
        if (stats.round !== undefined) {
            this.elements.roundEl.textContent = stats.round;
            // Also update inline stats (mobile)
            if (this.elements.roundInlineEl) {
                this.elements.roundInlineEl.textContent = stats.round;
            }
        }
    },

    /**
     * Update persistent stats (high score, accuracy)
     */
    updatePersistentStats() {
        this.elements.highScoreEl.textContent = Storage.getHighScore();
        const accuracy = `${GameState.getAccuracy()}%`;
        this.elements.accuracyEl.textContent = accuracy;
        // Also update inline stats (mobile)
        if (this.elements.accuracyInlineEl) {
            this.elements.accuracyInlineEl.textContent = accuracy;
        }
    },

    /**
     * Disable all choice buttons
     */
    disableChoices() {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = true;
        });
    },

    /**
     * Highlight the correct answer
     */
    highlightCorrectAnswer() {
        const currentHero = GameState.getProperty('currentHero');
        document.querySelectorAll('.choice-btn').forEach(btn => {
            if (btn.dataset.heroId === currentHero) {
                btn.classList.add('correct');
            }
        });
    },

    /**
     * Reveal the hero image
     */
    revealImage() {
        const img = this.elements.heroImage;
        img.classList.remove('hero-frame__image--hidden', 'hero-frame__image--silhouette');
        img.classList.add('hero-frame__image--revealed');
    },

    /**
     * Show next button, hide reveal button
     */
    showNextButton() {
        this.elements.revealBtn.classList.add('hidden');
        this.elements.nextBtn.classList.remove('hidden');
    },

    /**
     * Reset UI for new round
     */
    resetRoundUI() {
        // Clear feedback
        this.elements.feedback.textContent = '';
        this.elements.feedback.classList.remove('feedback--correct', 'feedback--incorrect', 'feedback--neutral');

        // Reset buttons
        this.elements.revealBtn.classList.remove('hidden');
        this.elements.nextBtn.classList.add('hidden');
        this.elements.hintBtn.classList.remove('hidden');

        // Reset hint
        this.elements.hintContainer.classList.add('hidden');
        this.elements.hintText.textContent = '';
    },

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.elements.imageError.textContent = message;
        this.elements.imageError.classList.remove('hidden');
    },

    /**
     * Hide error message
     */
    hideError() {
        this.elements.imageError.classList.add('hidden');
    }
};
