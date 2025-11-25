// ===================================
// Structured Hero Data (Single Source of Truth)
// ===================================

const heroData = {
    'abaddon': { attribute: 'Strength', role: ['Support', 'Carry'], hint: 'Mist coil and shield' },
    'alchemist': { attribute: 'Strength', role: ['Carry'], hint: 'Greedy farmer' },
    'ancient_apparition': { attribute: 'Intelligence', role: ['Support'], hint: 'Ice magic' },
    'anti-mage': { attribute: 'Agility', role: ['Carry'], hint: 'Magic hater' },
    'arc_warden': { attribute: 'Agility', role: ['Carry'], hint: 'Creates a copy' },
    'axe': { attribute: 'Strength', role: ['Initiator'], hint: 'Spins to win' },
    'bane': { attribute: 'Intelligence', role: ['Support'], hint: 'Nightmare' },
    'batrider': { attribute: 'Intelligence', role: ['Initiator'], hint: 'Rides a bat' },
    'beastmaster': { attribute: 'Strength', role: ['Initiator'], hint: 'Controls animals' },
    'bloodseeker': { attribute: 'Agility', role: ['Carry'], hint: 'Smells blood' },
    'bounty_hunter': { attribute: 'Agility', role: ['Support'], hint: 'Tracks enemies' },
    'brewmaster': { attribute: 'Strength', role: ['Initiator'], hint: 'Drunk fighter' },
    'bristleback': { attribute: 'Strength', role: ['Carry'], hint: 'Turn your back' },
    'broodmother': { attribute: 'Agility', role: ['Carry'], hint: 'Spider queen' },
    'centaur_warrunner': { attribute: 'Strength', role: ['Initiator'], hint: 'Half horse' },
    'chaos_knight': { attribute: 'Strength', role: ['Carry'], hint: 'Reality rift' },
    'chen': { attribute: 'Intelligence', role: ['Support'], hint: 'Holy persuasion' },
    'clinkz': { attribute: 'Agility', role: ['Carry'], hint: 'Burning archer' },
    'clockwerk': { attribute: 'Strength', role: ['Initiator'], hint: 'Mechanical hero' },
    'crystal_maiden': { attribute: 'Intelligence', role: ['Support'], hint: 'Freezing field' },
    'dark_seer': { attribute: 'Intelligence', role: ['Initiator'], hint: 'Vacuum ability' },
    'dark_willow': { attribute: 'Intelligence', role: ['Support'], hint: 'Fairy magic' },
    'dawnbreaker': { attribute: 'Strength', role: ['Support'], hint: 'Solar guardian' },
    'dazzle': { attribute: 'Intelligence', role: ['Support'], hint: 'Shallow grave' },
    'death_prophet': { attribute: 'Intelligence', role: ['Carry'], hint: 'Ghost swarm' },
    'disruptor': { attribute: 'Intelligence', role: ['Support'], hint: 'Storm rider' },
    'doom': { attribute: 'Strength', role: ['Carry'], hint: 'Silences with ult' },
    'dragon_knight': { attribute: 'Strength', role: ['Carry'], hint: 'Transforms into dragon' },
    'drow_ranger': { attribute: 'Agility', role: ['Carry'], hint: 'Frost arrows' },
    'earthshaker': { attribute: 'Strength', role: ['Initiator'], hint: 'Echo slam' },
    'earth_spirit': { attribute: 'Strength', role: ['Initiator'], hint: 'Rolling boulder' },
    'elder_titan': { attribute: 'Strength', role: ['Initiator'], hint: 'Astral spirit' },
    'ember_spirit': { attribute: 'Agility', role: ['Carry'], hint: 'Fire remnants' },
    'enchantress': { attribute: 'Intelligence', role: ['Support'], hint: 'Befriends creeps' },
    'enigma': { attribute: 'Intelligence', role: ['Initiator'], hint: 'Black hole' },
    'faceless_void': { attribute: 'Agility', role: ['Carry'], hint: 'Time walker' },
    'grimstroke': { attribute: 'Intelligence', role: ['Support'], hint: 'Ink magic' },
    'gyrocopter': { attribute: 'Agility', role: ['Carry'], hint: 'Flying machine' },
    'hoodwink': { attribute: 'Agility', role: ['Support'], hint: 'Squirrel archer' },
    'huskar': { attribute: 'Strength', role: ['Carry'], hint: 'Burning spears' },
    'invoker': { attribute: 'Intelligence', role: ['Carry'], hint: '10 spells' },
    'io': { attribute: 'Strength', role: ['Support'], hint: 'Wisp' },
    'jakiro': { attribute: 'Intelligence', role: ['Support'], hint: 'Two-headed dragon' },
    'juggernaut': { attribute: 'Agility', role: ['Carry'], hint: 'Blade fury' },
    'keeper_of_the_light': { attribute: 'Intelligence', role: ['Support'], hint: 'Light bringer' },
    'kez': { attribute: 'Agility', role: ['Carry'], hint: 'Dual weapon master' },
    'kunkka': { attribute: 'Strength', role: ['Carry'], hint: 'Admiral' },
    'legion_commander': { attribute: 'Strength', role: ['Carry'], hint: 'Duel master' },
    'leshrac': { attribute: 'Intelligence', role: ['Carry'], hint: 'Lightning storm' },
    'lich': { attribute: 'Intelligence', role: ['Support'], hint: 'Chain frost' },
    'lifestealer': { attribute: 'Strength', role: ['Carry'], hint: 'Infests units' },
    'lina': { attribute: 'Intelligence', role: ['Carry'], hint: 'Fire queen' },
    'lion': { attribute: 'Intelligence', role: ['Support'], hint: 'Finger of death' },
    'lone_druid': { attribute: 'Agility', role: ['Carry'], hint: 'Has a bear' },
    'luna': { attribute: 'Agility', role: ['Carry'], hint: 'Moon rider' },
    'lycan': { attribute: 'Strength', role: ['Carry'], hint: 'Werewolf' },
    'magnus': { attribute: 'Strength', role: ['Initiator'], hint: 'Rhino warrior' },
    'marci': { attribute: 'Strength', role: ['Carry'], hint: 'Silent fighter' },
    'mars': { attribute: 'Strength', role: ['Initiator'], hint: 'God of war' },
    'medusa': { attribute: 'Agility', role: ['Carry'], hint: 'Stone gaze' },
    'meepo': { attribute: 'Agility', role: ['Carry'], hint: 'Multiple clones' },
    'mirana': { attribute: 'Agility', role: ['Carry'], hint: 'Rides a tiger' },
    'monkey_king': { attribute: 'Agility', role: ['Carry'], hint: 'Staff wielder' },
    'morphling': { attribute: 'Agility', role: ['Carry'], hint: 'Water elemental' },
    'muerta': { attribute: 'Agility', role: ['Carry'], hint: 'Gunslinger' },
    'naga_siren': { attribute: 'Agility', role: ['Carry'], hint: 'Song puts to sleep' },
    "nature's_prophet": { attribute: 'Intelligence', role: ['Carry'], hint: 'Teleports anywhere' },
    'necrophos': { attribute: 'Intelligence', role: ['Carry'], hint: 'Death pulse' },
    'night_stalker': { attribute: 'Strength', role: ['Initiator'], hint: 'Stronger at night' },
    'nyx_assassin': { attribute: 'Agility', role: ['Initiator'], hint: 'Spiked carapace' },
    'ogre_magi': { attribute: 'Intelligence', role: ['Support'], hint: 'Two-headed caster' },
    'omniknight': { attribute: 'Strength', role: ['Support'], hint: 'Holy protector' },
    'oracle': { attribute: 'Intelligence', role: ['Support'], hint: 'False promise' },
    'outworld_destroyer': { attribute: 'Intelligence', role: ['Carry'], hint: 'Astral imprisonment' },
    'pangolier': { attribute: 'Agility', role: ['Initiator'], hint: 'Rolls into ball' },
    'phantom_assassin': { attribute: 'Agility', role: ['Carry'], hint: 'Critical strikes' },
    'phantom_lancer': { attribute: 'Agility', role: ['Carry'], hint: 'Many illusions' },
    'phoenix': { attribute: 'Strength', role: ['Initiator'], hint: 'Sun ray' },
    'primal_beast': { attribute: 'Strength', role: ['Initiator'], hint: 'Charges enemies' },
    'puck': { attribute: 'Intelligence', role: ['Initiator'], hint: 'Phase shift' },
    'pudge': { attribute: 'Strength', role: ['Initiator'], hint: 'Meat hook' },
    'pugna': { attribute: 'Intelligence', role: ['Carry'], hint: 'Life drain' },
    'queen_of_pain': { attribute: 'Intelligence', role: ['Carry'], hint: 'Sonic scream' },
    'razor': { attribute: 'Agility', role: ['Carry'], hint: 'Static link' },
    'riki': { attribute: 'Agility', role: ['Carry'], hint: 'Permanent invisibility' },
    'ringmaster': { attribute: 'Intelligence', role: ['Support'], hint: 'Circus performer' },
    'rubick': { attribute: 'Intelligence', role: ['Support'], hint: 'Spell steal' },
    'sand_king': { attribute: 'Strength', role: ['Initiator'], hint: 'Epicenter' },
    'shadow_demon': { attribute: 'Intelligence', role: ['Support'], hint: 'Creates illusions' },
    'shadow_fiend': { attribute: 'Agility', role: ['Carry'], hint: 'Soul collector' },
    'shadow_shaman': { attribute: 'Intelligence', role: ['Support'], hint: 'Hex and shackles' },
    'silencer': { attribute: 'Intelligence', role: ['Carry'], hint: 'Global silence' },
    'skywrath_mage': { attribute: 'Intelligence', role: ['Support'], hint: 'Mystic flare' },
    'slardar': { attribute: 'Strength', role: ['Initiator'], hint: 'Amplify damage' },
    'slark': { attribute: 'Agility', role: ['Carry'], hint: 'Shadow dance' },
    'snapfire': { attribute: 'Strength', role: ['Support'], hint: 'Rides a lizard' },
    'sniper': { attribute: 'Agility', role: ['Carry'], hint: 'Long range' },
    'spectre': { attribute: 'Agility', role: ['Carry'], hint: 'Haunts all enemies' },
    'spirit_breaker': { attribute: 'Strength', role: ['Initiator'], hint: 'Charge of darkness' },
    'storm_spirit': { attribute: 'Intelligence', role: ['Carry'], hint: 'Ball lightning' },
    'sven': { attribute: 'Strength', role: ['Carry'], hint: 'God strength' },
    'techies': { attribute: 'Intelligence', role: ['Support'], hint: 'Mines' },
    'templar_assassin': { attribute: 'Agility', role: ['Carry'], hint: 'Refraction' },
    'terrorblade': { attribute: 'Agility', role: ['Carry'], hint: 'Demon marauder' },
    'tidehunter': { attribute: 'Strength', role: ['Initiator'], hint: 'Ravage' },
    'timbersaw': { attribute: 'Strength', role: ['Carry'], hint: 'Timber chain' },
    'tinker': { attribute: 'Intelligence', role: ['Carry'], hint: 'Rearms items' },
    'tiny': { attribute: 'Strength', role: ['Carry'], hint: 'Grows bigger' },
    'treant_protector': { attribute: 'Strength', role: ['Support'], hint: 'Tree guardian' },
    'troll_warlord': { attribute: 'Agility', role: ['Carry'], hint: 'Switches axes/melee' },
    'tusk': { attribute: 'Strength', role: ['Initiator'], hint: 'Ice shards' },
    'underlord': { attribute: 'Strength', role: ['Support'], hint: 'Dark rift' },
    'undying': { attribute: 'Strength', role: ['Support'], hint: 'Tombstone' },
    'ursa': { attribute: 'Agility', role: ['Carry'], hint: 'Bear warrior' },
    'vengeful_spirit': { attribute: 'Agility', role: ['Support'], hint: 'Swaps positions' },
    'venomancer': { attribute: 'Agility', role: ['Support'], hint: 'Poison wards' },
    'viper': { attribute: 'Agility', role: ['Carry'], hint: 'Poison attack' },
    'visage': { attribute: 'Intelligence', role: ['Support'], hint: 'Stone familiars' },
    'void_spirit': { attribute: 'Intelligence', role: ['Carry'], hint: 'Void walker' },
    'warlock': { attribute: 'Intelligence', role: ['Support'], hint: 'Summons golem' },
    'weaver': { attribute: 'Agility', role: ['Carry'], hint: 'Time lapse' },
    'windranger': { attribute: 'Intelligence', role: ['Carry'], hint: 'Shackleshot' },
    'winter_wyvern': { attribute: 'Intelligence', role: ['Support'], hint: 'Ice dragon' },
    'witch_doctor': { attribute: 'Intelligence', role: ['Support'], hint: 'Death ward' },
    'wraith_king': { attribute: 'Strength', role: ['Carry'], hint: 'Reincarnation' },
    'zeus': { attribute: 'Intelligence', role: ['Carry'], hint: 'Thunder god' }
};

// ===================================
// Derived Hero List (from heroData keys)
// ===================================

/**
 * Array of all hero IDs - derived from heroData to maintain DRY principle
 * @type {string[]}
 */
const heroes = Object.keys(heroData);

// ===================================
// Generate Hero Hints from Structured Data
// ===================================

const heroHints = Object.fromEntries(
    Object.entries(heroData).map(([hero, data]) => [
        hero,
        `Attribute: ${data.attribute} | Role: ${data.role.join('/')} | Hint: ${data.hint}`
    ])
);

// ===================================
// Utility Functions
// ===================================

/**
 * Get hero data by hero ID
 * @param {string} heroId - The hero identifier
 * @returns {object|null} Hero data object or null if not found
 */
function getHeroData(heroId) {
    return heroData[heroId] || null;
}

/**
 * Get heroes by attribute
 * @param {string} attribute - Strength, Agility, or Intelligence
 * @returns {string[]} Array of hero IDs
 */
function getHeroesByAttribute(attribute) {
    return Object.entries(heroData)
        .filter(([_, data]) => data.attribute === attribute)
        .map(([hero, _]) => hero);
}

/**
 * Get heroes by role
 * @param {string} role - Carry, Support, or Initiator
 * @returns {string[]} Array of hero IDs
 */
function getHeroesByRole(role) {
    return Object.entries(heroData)
        .filter(([_, data]) => data.role.includes(role))
        .map(([hero, _]) => hero);
}
