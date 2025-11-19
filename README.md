# Who is That Dota 2 Hero?

A browser-based guessing game where players identify Dota 2 heroes from their silhouettes. Features multiple-choice questions, hint system, and score tracking.

## Live Demo

Play the game at: `https://YOUR-USERNAME.github.io/Who-is-That-Hero/`

(Replace `YOUR-USERNAME` with your GitHub username)

## Features

- **Silhouette Challenge**: Heroes appear as dark silhouettes until answered or revealed
- **Multiple Choice**: 4 randomized options per round (1 correct + 3 decoys)
- **Hint System**: Get attribute, role, and ability hints for each hero
- **Score Tracking**: Points, rounds completed, and answer streak counter
- **No Repeats**: All 123 heroes cycle through before any repeat
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Setup

### Deploy to GitHub Pages

1. **If you already have the repo:**
   - Ensure `index.html` is in the root directory
   - Go to repo **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose `main` branch and `/ (root)` folder
   - Click **Save**
   - Game goes live at: `https://YOUR-USERNAME.github.io/Who-is-That-Hero/`

2. **For a new deployment:**
   - Fork or clone this repository
   - Follow steps above
   - Images load automatically from the Game Assets folder

## How It Works

The game fetches hero images directly from your GitHub repository using raw URLs:
```
https://raw.githubusercontent.com/YOUR-USERNAME/Who-is-That-Hero/main/Game%20Assets/[hero].png
```

Everything runs client-side in the browser - no server or external hosting required.

## Game Mechanics

### Scoring
- **Correct answer**: +10 points, streak increases
- **Wrong answer or reveal**: Streak resets to 0
- Current implementation: No penalties, no time limits

### Hero Pool
The game uses **123 base heroes** from the complete Dota 2 roster. Excluded assets:
- **Persona variants** (13): anti-mage_persona, crystal_maiden_persona, invoker_persona, phantom_assassin_persona, pudge_persona
- **Non-heroes** (5): animal_courier, dire_creep, radiant_creep, roshan, tormentor

Total assets in repo: 136  
Playable heroes: 123

### Answer Selection
- Choices are randomized each round
- Wrong answers are randomly selected from the full hero pool
- No duplicate options within a single round

## Customization Guide

### Adjust Number of Choices
Edit line 252 in `index.html`:
```javascript
while (choices.length < 4) {  // Change to 3, 5, or 6
```

### Modify Points Per Correct Answer
Edit line 306:
```javascript
score += 10;  // Change to your preferred value
```

### Change Silhouette Difficulty
Edit line 65 in the CSS:
```css
filter: brightness(0) contrast(2);
```
- `brightness(0)` = complete silhouette (current)
- `brightness(0.1)` = very dark with slight detail
- `brightness(0.3)` = easier mode with visible features

### Add/Remove Heroes
Edit the `heroes` array starting at line 232:
```javascript
const heroes = [
    'abaddon', 'alchemist', // ... add or remove here
];
```

### Customize Hints
Edit the `heroHints` object starting at line 241:
```javascript
const heroHints = {
    'hero_name': 'Your custom hint text',
};
```

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

### Image Requirements
- Format: PNG with transparent backgrounds work best
- Location: `/Game Assets/` folder in the repository
- Naming: Must match hero names in the code (case-sensitive, underscores not hyphens)

### No External Dependencies
- Pure HTML/CSS/JavaScript
- No frameworks or libraries required
- No build process needed

## Potential Improvements

### Current Limitations
1. **Binary reveal**: Image goes from hidden to fully visible instantly
2. **No difficulty scaling**: All heroes treated equally
3. **Static hints**: Hints don't adapt to player skill level
4. **No leaderboard**: Scores reset on page refresh

### Ideas for Enhancement
- **Progressive reveal**: Image becomes clearer with each wrong guess
- **Difficulty tiers**: Easy (common heroes) → Medium → Hard (rarely picked)
- **Timer mode**: Bonus points for faster answers
- **Local storage**: Save high scores and statistics
- **Include personas**: Add toggle to play with alternate skins
- **Sound effects**: Audio feedback for correct/wrong answers
- **Achievement system**: Unlock badges for streaks, perfect games, etc.

## Known Issues

### Image Loading
If images fail to load, verify:
1. Repository is **public**
2. Images exist in `main` branch under `Game Assets/` folder
3. File names match exactly (including underscores vs hyphens)
4. No CORS restrictions (GitHub raw content should work by default)

### Case Sensitivity
Hero names in code must match image filenames exactly:
- ✅ `nature's_prophet.png` → `"nature's_prophet"`
- ❌ `Nature's_Prophet.png` → `"nature's_prophet"` (will fail)

## License & Attribution

This is an unofficial fan project. All Dota 2 assets and character names are © Valve Corporation.

The game code itself is provided as-is for educational and entertainment purposes.

## Questions or Contributions

For issues or suggestions, please open an issue on the GitHub repository.
