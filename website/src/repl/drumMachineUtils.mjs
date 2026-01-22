// Drum Machine Utils - Pattern utilities for Strudel Integration
// Audio playback is handled by Strudel's superdough
// FULL GREEDY MODE - ALL THE DRUMS!

// Extended instrument mapping: 16 instruments for maximum versatility
export const instruments = [
  // === FUNDAMENTALS ===
  { id: 'kick', name: 'KICK', icon: '🥁', strudelId: 'bd', category: 'fundamental' },
  { id: 'snare', name: 'SNARE', icon: '🎯', strudelId: 'sd', category: 'fundamental' },
  { id: 'clap', name: 'CLAP', icon: '👏', strudelId: 'cp', category: 'fundamental' },

  // === HI-HATS ===
  { id: 'hihat', name: 'HH', icon: '🎩', strudelId: 'hh', category: 'hihat' },
  { id: 'openhat', name: 'OH', icon: '🔓', strudelId: 'oh', category: 'hihat' },

  // === TOMS ===
  { id: 'hitom', name: 'HI-TOM', icon: '🔴', strudelId: 'ht', category: 'tom' },
  { id: 'midtom', name: 'MID-TOM', icon: '🟠', strudelId: 'mt', category: 'tom' },
  { id: 'lotom', name: 'LO-TOM', icon: '🟤', strudelId: 'lt', category: 'tom' },

  // === CYMBALS ===
  { id: 'crash', name: 'CRASH', icon: '💥', strudelId: 'cr', category: 'cymbal' },
  { id: 'ride', name: 'RIDE', icon: '🔔', strudelId: 'rd', category: 'cymbal' },

  // === PERCUSSION ===
  { id: 'rim', name: 'RIM', icon: '🥢', strudelId: 'rim', category: 'perc' },
  { id: 'cowbell', name: 'COWBELL', icon: '🐄', strudelId: 'cb', category: 'perc' },
  { id: 'perc', name: 'PERC', icon: '🪘', strudelId: 'perc', category: 'perc' },
  { id: 'shaker', name: 'SHAKE', icon: '🎵', strudelId: 'sh', category: 'perc' },

  // === EXTRAS ===
  { id: 'tom', name: 'TOM', icon: '🎪', strudelId: 'tom', category: 'tom' },
  { id: 'misc', name: 'MISC', icon: '✨', strudelId: 'misc', category: 'extra' },
];

/**
 * VERIFIED drum machine kits - only kits that have all basic sounds
 * These kits are known to have: bd, sd, hh, oh, cp (at minimum)
 *
 * NOTE: We only include kits that work reliably with the drum machine
 */
export function getAvailableKits() {
  // Kits verified to have complete drum sounds
  return [
    // ========== ROLAND CLASSICS (VERIFIED) ==========
    { id: 'RolandTR808', name: 'TR-808', brand: 'Roland', year: 1980, style: 'Hip-hop, Trap, Reggaeton' },
    { id: 'RolandTR909', name: 'TR-909', brand: 'Roland', year: 1983, style: 'House, Techno, Trance' },
    { id: 'RolandTR707', name: 'TR-707', brand: 'Roland', year: 1984, style: 'Electro, Synthpop' },
    { id: 'RolandTR606', name: 'TR-606', brand: 'Roland', year: 1981, style: 'Acid, Electro' },

    // ========== LINN (VERIFIED) ==========
    { id: 'LinnDrum', name: 'LinnDrum', brand: 'Linn', year: 1982, style: 'Prince, 80s Pop' },

    // ========== OBERHEIM (VERIFIED) ==========
    { id: 'OberheimDMX', name: 'DMX', brand: 'Oberheim', year: 1981, style: 'Electro, Hip-hop' },

    // ========== E-MU (VERIFIED) ==========
    { id: 'EmuDrumulator', name: 'Drumulator', brand: 'E-mu', year: 1983, style: 'Electro, Industrial' },

    // ========== BOSS (VERIFIED) ==========
    { id: 'BossDR110', name: 'DR-110', brand: 'Boss', year: 1983, style: 'Minimal, Industrial' },

    // ========== KORG (VERIFIED) ==========
    { id: 'KorgKR55', name: 'KR-55', brand: 'Korg', year: 1979, style: 'Disco, Classic' },
    { id: 'KorgDDM110', name: 'DDM-110', brand: 'Korg', year: 1984, style: 'Lo-fi' },

    // ========== ALESIS (VERIFIED) ==========
    { id: 'AlesisHR16', name: 'HR-16', brand: 'Alesis', year: 1987, style: 'Digital, Clean' },

    // ========== CASIO (VERIFIED) ==========
    { id: 'CasioRZ1', name: 'RZ-1', brand: 'Casio', year: 1986, style: 'Lo-fi, Hip-hop' },
  ];
}

// Required sounds that a kit must have to be valid
export const requiredSounds = ['bd', 'sd', 'hh', 'cp'];

// Check if a kit has all required sounds (for dynamic validation)
export function isKitValid(sounds, kitId) {
  if (!sounds) return false;

  const kitLower = kitId.toLowerCase();
  return requiredSounds.every(sound => {
    const key = `${kitLower}_${sound}`;
    return sounds[key] !== undefined;
  });
}

/**
 * Sound types available in Strudel - organized by drum part
 */
export const soundTypes = {
  // Bass drums
  bass: ['bd', 'bd:1', 'bd:2', 'bd:3', 'bd:4'],

  // Snares
  snare: ['sd', 'sd:1', 'sd:2', 'sd:3', 'sd:4'],

  // Claps
  clap: ['cp', 'cp:1', 'cp:2'],

  // Hi-hats
  hihat: ['hh', 'hh:1', 'hh:2', 'hh:3', 'hh:4'],
  openHat: ['oh', 'oh:1', 'oh:2'],

  // Toms
  hiTom: ['ht', 'ht:1', 'ht:2'],
  midTom: ['mt', 'mt:1', 'mt:2'],
  loTom: ['lt', 'lt:1', 'lt:2'],
  tom: ['tom', 'tom:1', 'tom:2', 'tom:3'],

  // Cymbals
  crash: ['cr', 'cr:1', 'cr:2'],
  ride: ['rd', 'rd:1', 'rd:2'],

  // Percussion
  rim: ['rim', 'rim:1', 'rim:2'],
  cowbell: ['cb', 'cb:1', 'cb:2'],
  clave: ['cl', 'cl:1'],
  shaker: ['sh', 'sh:1', 'sh:2'],
  tambourine: ['tb', 'tb:1'],
  conga: ['conga', 'conga:1', 'conga:2'],
  bongo: ['bongo', 'bongo:1'],
  perc: ['perc', 'perc:1', 'perc:2', 'perc:3'],

  // FX
  fx: ['fx', 'fx:1', 'fx:2', 'fx:3'],
  noise: ['noise', 'noise:1'],
  misc: ['misc', 'misc:1', 'misc:2'],
};

/**
 * Convert a pattern array to mini-notation string
 */
export function stepsToMiniNotation(steps, instrument) {
  const notation = steps.map(s => s ? instrument : '~').join(' ');
  const parts = notation.split(' ');
  const allSame = parts.every(p => p === parts[0]);

  if (allSame && parts[0] !== '~') {
    return `${parts[0]}*${parts.length}`;
  }

  return notation;
}

/**
 * Convert full pattern state to Strudel code
 */
export function patternToStrudel(pattern, kitName, bpm) {
  const lines = [];
  lines.push(`// Generated by Casa 24 Drum Machine - FULL GREEDY MODE`);
  lines.push(`setcps(${bpm}/60/4)  // ${bpm} BPM`);
  lines.push('');
  lines.push('stack(');

  const activePatterns = [];

  for (const inst of instruments) {
    const steps = pattern[inst.id];
    if (!steps || steps.every(s => !s)) continue;

    const notation = stepsToMiniNotation(steps, inst.strudelId);
    activePatterns.push(`  s("${notation}").bank("${kitName}")`);
  }

  if (activePatterns.length === 0) {
    lines.push('  // No patterns yet - click some steps!');
    lines.push('  s("bd sd").bank("RolandTR808")');
  } else {
    lines.push(activePatterns.join(',\n'));
  }

  lines.push(')');

  return lines.join('\n');
}

/**
 * Create initial empty pattern state for all 16 instruments
 */
export function createEmptyPattern(steps = 16) {
  const pattern = {};
  for (const inst of instruments) {
    pattern[inst.id] = new Array(steps).fill(false);
  }
  return pattern;
}

/**
 * Preset patterns - now with 16 instruments support
 */
export const presetPatterns = {
  trap: {
    kick: [true,false,false,false,false,false,true,false,false,false,true,false,false,false,false,false],
    snare: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    clap: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    hihat: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    openhat: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  house: {
    kick: [true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
    snare: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    clap: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    hihat: [false,false,true,false,false,false,true,false,false,false,true,false,false,false,true,false],
    openhat: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  dembow: {
    kick: [true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
    snare: [false,false,false,true,false,false,true,false,false,false,false,true,false,false,true,false],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true],
    openhat: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,true,false,false,false,false,false,false,false,true,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  drill: {
    kick: [true,false,false,false,false,false,true,false,false,true,false,false,false,false,false,false],
    snare: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [true,false,true,true,false,true,true,false,true,true,false,true,true,false,true,false],
    openhat: [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,true],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  breakbeat: {
    kick: [true,false,false,false,false,false,false,false,true,false,true,false,false,false,false,false],
    snare: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,true],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    openhat: [false,false,false,false,false,false,true,false,false,false,false,false,false,false,true,false],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],
    crash: [true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  techno: {
    kick: [true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
    snare: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    clap: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    hihat: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    openhat: [false,false,true,false,false,false,true,false,false,false,true,false,false,false,true,false],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,true,false,false,false,true,false,false,false,true,false,false,false,true,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  reggaeton: {
    kick: [true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
    snare: [false,false,false,true,false,false,true,false,false,false,false,true,false,false,true,false],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false],
    openhat: [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,true],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,true,false,false,false,false,false,false,false,true,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  hiphop: {
    kick: [true,false,false,false,false,false,false,false,true,false,false,false,false,false,true,false],
    snare: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false],
    openhat: [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  disco: {
    kick: [true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
    snare: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false],
    openhat: [false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  dnb: {
    kick: [true,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],
    snare: [false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false],
    clap: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    hihat: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    openhat: [false,false,false,false,false,false,true,false,false,false,false,false,false,false,true,false],
    hitom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    midtom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    lotom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    crash: [true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    ride: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    rim: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    cowbell: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    perc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    shaker: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    tom: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    misc: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
};
