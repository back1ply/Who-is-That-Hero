# Who is That Dota 2 Hero? - Deployment Guide

## Quick Setup for GitHub Pages

### Option 1: Add to Existing Repo
1. Copy `index.html` to the root of your `Who-is-That-Hero` repository
2. Go to your repo Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Click Save
6. Your game will be live at: `https://back1ply.github.io/Who-is-That-Hero/`

### Option 2: Create New Repo
1. Create a new repository named `dota2-hero-game`
2. Upload `index.html` to the root
3. Follow steps 2-5 above
4. Game will be at: `https://back1ply.github.io/dota2-hero-game/`

## How It Works

The game loads images directly from your existing GitHub repo using raw URLs:
```
https://raw.githubusercontent.com/back1ply/Who-is-That-Hero/main/Game%20Assets/[hero].png
```

**No external hosting needed** - everything runs client-side!

## Game Features

- **Multiple Choice**: 4 options per round (1 correct + 3 random)
- **Score Tracking**: Points, rounds, and streak counter
- **Silhouette Mode**: Images start completely black
- **Reveal Option**: Can give up and see the answer
- **No Repeats**: Heroes won't repeat until all have been shown
- **Responsive**: Works on mobile and desktop

## Customization Options

### Change Number of Choices
Edit line 252 in `index.html`:
```javascript
while (choices.length < 4) {  // Change 4 to your desired number
```

### Adjust Points
Edit line 306:
```javascript
score += 10;  // Change points awarded
```

### Modify Difficulty
Currently uses pure silhouette (brightness 0). To make easier, change line 65:
```css
filter: brightness(0) contrast(2);  /* Change brightness(0) to brightness(0.2) for slight hint */
```

## Known Limitations

1. **Persona variants excluded**: The game uses base heroes only (anti-mage, not anti-mage_persona)
2. **Non-heroes excluded**: Filtered out: animal_courier, dire_creep, radiant_creep, roshan, tormentor
3. **Image dependency**: Requires your Game Assets folder to remain public
4. **No progressive reveal**: Currently binary (hidden/revealed) - could add gradual brightness increase

## Potential Issues

⚠️ **CORS / Image Loading**: If images don't load, verify:
- Repo is public
- File names match exactly (case-sensitive)
- Images are in `main` branch under `Game Assets/` folder

⚠️ **Persona Heroes**: Currently treats personas as separate from base heroes. If you want them included as alternate skins, the code needs modification.

## Questions to Clarify

1. **Should persona variants be playable?** (currently excluded)
2. **Do you want progressive reveal?** (image gets brighter with each wrong guess)
3. **Any specific scoring system?** (timer-based? difficulty tiers?)
4. **Should non-hero assets be included?** (Roshan, creeps, couriers?)

## License

This is a fan project using Dota 2 assets. Dota 2 is © Valve Corporation.
