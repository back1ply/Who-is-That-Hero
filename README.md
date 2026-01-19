# Who is That Hero?

A Dota 2 hero identification quiz game with an esports-inspired UI. Test your knowledge by identifying heroes from their silhouettes across multiple difficulty levels.

## Live Demo

Play the game at: `https://YOUR-USERNAME.github.io/Who-is-That-Hero/`

(Replace `YOUR-USERNAME` with your GitHub username)

## Features

- **Esports UI Design**: Cyberpunk-inspired dark theme with neon accents and HUD elements
- **4 Difficulty Levels**: Easy, Medium, Medium-Hard (multiple choice), and Hard (text input)
- **Silhouette Challenge**: Heroes appear as dark silhouettes until answered or revealed
- **Hint System**: Get attribute, role, and ability hints for each hero
- **Persistent Stats**: High score and accuracy tracking saved to localStorage
- **No Repeats**: All 123 heroes cycle through before any repeat
- **Keyboard Shortcuts**: Quick play with keyboard controls
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Setup

### Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to repo **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose `main` branch and `/ (root)` folder
5. Click **Save**
6. Game goes live at: `https://YOUR-USERNAME.github.io/Who-is-That-Hero/`

## How to Play

1. A hero silhouette appears on screen
2. Select the correct hero from 4 choices (Easy/Medium/Med-Hard) or type the name (Hard)
3. Use hints if you're stuck
4. Build your streak for bragging rights
5. Try to beat your high score!

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` `2` `3` `4` | Select choice 1-4 |
| `R` | Reveal answer |
| `N` or `Space` | Next hero |
| `H` | Show hint |

### Difficulty Levels

| Level | Image | Input Method |
|-------|-------|--------------|
| Easy | Hidden (dark) | Multiple choice |
| Medium | Silhouette | Multiple choice |
| Med-Hard | Silhouette | Multiple choice |
| Hard | Silhouette | Type hero name |

## Project Structure

```
Who-is-That-Hero/
├── index.html              # Main HTML structure
├── README.md
├── css/
│   ├── variables.css       # Design tokens (colors, fonts, spacing)
│   ├── base.css            # Reset, typography, accessibility
│   ├── components.css      # Buttons, cards, inputs, hero frame
│   ├── layout.css          # Grid layout, header, footer, responsive
│   └── effects.css         # Animations, glow, scanlines
├── js/
│   ├── config.js           # Game constants and configuration
│   ├── data.js             # Hero database (123 heroes)
│   ├── storage.js          # localStorage operations
│   ├── state.js            # Game state management
│   ├── game.js             # Core game logic
│   ├── ui.js               # DOM manipulation and rendering
│   └── app.js              # Entry point and event listeners
└── Game Assets/            # Hero PNG images (123 playable)
```

### Architecture

The codebase follows a modular architecture separating concerns:

- **Config** (`config.js`): All constants in one place
- **Data** (`data.js`): Hero information (attributes, roles, hints)
- **Storage** (`storage.js`): Persistent data layer (high scores, stats)
- **State** (`state.js`): Centralized game state management
- **Game** (`game.js`): Pure game logic, no DOM dependencies
- **UI** (`ui.js`): All DOM manipulation and rendering
- **App** (`app.js`): Initialization and event binding

## Customization Guide

### Adjust Points Per Correct Answer

Edit `js/config.js`:
```javascript
const CONFIG = {
    POINTS_PER_CORRECT: 10,  // Change to your preferred value
    // ...
};
```

### Change Number of Choices

Edit `js/config.js`:
```javascript
const CONFIG = {
    MAX_CHOICES: 4,  // Change to 3, 5, or 6
    // ...
};
```

### Modify Silhouette Appearance

Edit `css/components.css`:
```css
.hero-frame__image--hidden {
    filter: brightness(0) contrast(1.5);  /* Easy mode */
}

.hero-frame__image--silhouette {
    filter: brightness(0) saturate(0) contrast(100);  /* Hard mode */
}
```

### Customize Colors

Edit `css/variables.css`:
```css
:root {
    --color-primary: #7C3AED;      /* Main purple */
    --color-neon-cyan: #00FFFF;    /* Accent cyan */
    --color-accent: #F43F5E;       /* Pink/red accent */
    --color-bg-primary: #0F0F23;   /* Dark background */
    /* ... */
}
```

### Add/Remove Heroes

Edit `js/data.js`:
```javascript
const heroData = {
    'hero_id': {
        attribute: 'Strength/Agility/Intelligence',
        role: ['Carry', 'Support'],
        hint: 'Your hint text'
    },
    // ...
};
```

## Game Mechanics

### Scoring
- **Correct answer**: +10 points, streak increases
- **Wrong answer**: Streak resets to 0
- **Reveal**: Streak resets to 0

### Stats Tracked
- **Score**: Points earned in current session
- **Streak**: Consecutive correct answers
- **Round**: Current round number (1-123)
- **High Score**: Best score ever (persisted)
- **Accuracy**: Percentage of correct answers (session)

### Hero Pool
- **123 playable heroes** from the Dota 2 roster
- **Excluded**: Persona variants, non-hero units (couriers, creeps, Roshan)

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

### No External Dependencies
- Pure HTML/CSS/JavaScript
- Google Fonts (Russo One, Chakra Petch)
- No build process required

### Image Loading
Images are loaded from GitHub raw content:
```
https://raw.githubusercontent.com/YOUR-USERNAME/Who-is-That-Hero/main/Game%20Assets/[hero].png
```

## Known Issues

### Image Loading Failures
If images fail to load, verify:
1. Repository is **public**
2. Images exist in `main` branch under `Game Assets/` folder
3. File names match hero IDs exactly (case-sensitive, use underscores)

### Case Sensitivity
Hero IDs in code must match image filenames:
- `nature's_prophet.png` → `"nature's_prophet"`
- File names are case-sensitive

## License & Attribution

This is an unofficial fan project. All Dota 2 assets and character names are © Valve Corporation.

The game code is provided as-is for educational and entertainment purposes.

## Contributing

For issues or suggestions, please open an issue on the GitHub repository.
