/**
 * Application Entry Point
 * Initializes the game and sets up event listeners
 */

const App = {
    /**
     * Initialize the application
     */
    init() {
        // Initialize UI module
        UI.init();

        // Set up event listeners
        this.setupEventListeners();

        // Initialize first round
        const roundData = Game.initRound();
        UI.renderRound(roundData);

        // Load persistent stats
        UI.updatePersistentStats();

        console.log('Who is That Hero? initialized');
    },

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Reveal button
        UI.elements.revealBtn.addEventListener('click', () => {
            UI.handleReveal();
        });

        // Next button
        UI.elements.nextBtn.addEventListener('click', () => {
            UI.handleNextRound();
        });

        // Hint button
        UI.elements.hintBtn.addEventListener('click', () => {
            UI.handleHint();
        });

        // Text input submit button
        UI.elements.submitBtn.addEventListener('click', () => {
            UI.handleTextSubmit();
        });

        // Text input enter key
        UI.elements.heroInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                UI.handleTextSubmit();
            }
        });

        // Settings button (toggle dropdown)
        UI.elements.settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            UI.toggleSettingsDropdown();
        });

        // Settings dropdown options
        UI.elements.settingsOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                UI.handleDifficultyChange(btn.dataset.difficulty);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.settings-menu')) {
                UI.closeSettingsDropdown();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcut(e);
        });
    },

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboardShortcut(e) {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT') return;

        const state = GameState.get();

        switch (e.key) {
            case 'r':
            case 'R':
                // Reveal answer
                if (!state.answered) {
                    UI.handleReveal();
                }
                break;

            case 'n':
            case 'N':
            case ' ':
                // Next hero (space or N)
                if (state.answered) {
                    e.preventDefault();
                    UI.handleNextRound();
                }
                break;

            case 'h':
            case 'H':
                // Show hint
                if (!state.answered) {
                    UI.handleHint();
                }
                break;

            case '1':
            case '2':
            case '3':
            case '4':
                // Quick select choice (1-4)
                if (!state.answered && state.currentDifficulty !== 'hard') {
                    const choiceBtns = document.querySelectorAll('.choice-btn');
                    const index = parseInt(e.key) - 1;
                    if (choiceBtns[index]) {
                        choiceBtns[index].click();
                    }
                }
                break;
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
