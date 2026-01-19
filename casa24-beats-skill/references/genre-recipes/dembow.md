# Dembow Production Guide 🇩🇴

## Characteristics
- **BPM**: 110-120 (typically 115)
- **Origin**: Dominican Republic / Caribbean
- **Style**: Aggressive, energetic, urban
- **Signature**: Syncopated "dembow" rhythm pattern
- **Bass**: Heavy 808 drops with pitch bends

## The Dembow Riddim

The classic Dominican dembow pattern (distinct from reggaeton's more even flow):

```
Beat: 1 . . . 2 . . . 3 . . . 4 . . .
Kick: X . . X . . X . X . . X . . X .
Snr:  . . X . . X . . . . X . . X . .
HH:   x x x x x x x x x x x x x x x x
```

The kick pattern creates the distinctive "galloping" feel that defines dembow.

## Core Drum Pattern

```javascript
// Basic Dembow Beat - 115 BPM
setcps(115/60/4)

stack(
  // Kick - the signature dembow pattern
  s("bd ~ ~ bd ~ ~ bd ~ bd ~ ~ bd ~ ~ bd ~")
    .bank("RolandTR808"),

  // Snare - syncopated hits
  s("~ ~ sd ~ ~ sd ~ ~ ~ ~ sd ~ ~ sd ~ ~")
    .bank("RolandTR808"),

  // Hi-hats - driving 16ths
  s("hh*16")
    .bank("RolandTR808")
    .gain(0.7)
)
```

## Bass Techniques

### Heavy 808 Bass
```javascript
// Deep 808 bass with sustain
note("c1 ~ ~ c1 ~ ~ c1 ~ c1 ~ ~ c1 ~ ~ c1 ~")
  .s("808")
  .decay(0.3)
  .sustain(0.5)
  .gain(1.2)
```

### Pitch Bend Bass
```javascript
// 808 with pitch slides
note("c1 ~ ~ [c1,c2] ~ ~ c1 ~ c1 ~ ~ [c1,eb1] ~ ~ c1 ~")
  .s("808")
  .decay(0.4)
  .sustain(0.3)
  .slide(0.1)
```

### Aggressive Distorted Bass
```javascript
// Distorted 808 for energy
note("c1 ~ ~ c1 ~ ~ c1 ~ c1 ~ ~ c1 ~ ~ c1 ~")
  .s("808")
  .distort(0.4)
  .gain(1.3)
  .lpf(800)
```

## Percussion Elements

### Tambora Pattern
```javascript
// Dominican tambora - essential flavor
s("~ tambora ~ ~ tambora ~ ~ tambora")
  .gain(0.8)
  .room(0.2)
```

### Guira Pattern
```javascript
// Guira scraping rhythm
s("guira*8")
  .gain(0.5)
  .pan(sine.range(0.3, 0.7))
```

### Cowbell Accents
```javascript
// Cowbell for Caribbean flavor
s("~ ~ ~ cowbell ~ ~ ~ ~")
  .bank("RolandTR808")
  .gain(0.6)
```

### Clave Pattern
```javascript
// Son clave variation
s("cl ~ ~ cl ~ ~ ~ cl ~ ~ cl ~ ~ ~ ~ ~")
  .bank("RolandTR808")
  .gain(0.5)
```

### Full Percussion Stack
```javascript
stack(
  s("~ tambora ~ ~ tambora ~ ~ tambora").gain(0.7),
  s("guira*8").gain(0.4),
  s("~ ~ ~ cowbell ~ ~ ~ ~").bank("RolandTR808").gain(0.5),
  s("cl ~ ~ cl ~ ~ ~ cl ~ ~ cl ~ ~ ~ ~ ~").bank("RolandTR808").gain(0.4)
)
```

## Melodic Elements

### Simple Synth Hook
```javascript
// Catchy melodic hook
note("c4 ~ eb4 ~ f4 ~ eb4 c4")
  .s("sawtooth")
  .lpf(2000)
  .attack(0.01)
  .decay(0.1)
  .sustain(0.3)
  .gain(0.6)
```

### Brass Stabs
```javascript
// Horn stabs for energy
note("~ ~ [c4,eb4,g4] ~ ~ ~ [c4,eb4,g4] ~")
  .s("sawtooth")
  .lpf(3000)
  .attack(0.01)
  .decay(0.2)
  .sustain(0)
  .gain(0.7)
```

### Vocal Chop Style
```javascript
// Rhythmic vocal-like stabs
s("~ ~ ~ speech ~ speech ~ ~")
  .speed(1.5)
  .gain(0.6)
  .hpf(500)
```

## Energy Techniques

### Build-Up
```javascript
// Tension builder with snare roll
s("sd*2 sd*4 sd*8 sd*16")
  .bank("RolandTR808")
  .gain(saw.range(0.3, 1))
  .hpf(saw.range(100, 2000))
```

### Drop Impact
```javascript
// Heavy drop moment
stack(
  note("c1").s("808").decay(1).sustain(0.8).gain(1.5),
  s("bd").bank("RolandTR808").gain(1.2),
  s("crash").gain(0.8)
)
```

### Filter Sweep
```javascript
// Automated filter movement
note("c1 ~ ~ c1 ~ ~ c1 ~ c1 ~ ~ c1 ~ ~ c1 ~")
  .s("808")
  .lpf(sine.range(200, 2000).slow(4))
  .gain(1.2)
```

### Riser Effect
```javascript
// Noise riser for transitions
s("noise")
  .hpf(saw.range(100, 8000).fast(4))
  .gain(saw.range(0, 0.8).fast(4))
  .attack(4)
```

## Variations

### Minimal Dembow
```javascript
// Stripped down version
setcps(115/60/4)

stack(
  s("bd ~ ~ bd ~ ~ bd ~ bd ~ ~ bd ~ ~ bd ~").bank("RolandTR808"),
  s("~ ~ sd ~ ~ sd ~ ~ ~ ~ sd ~ ~ sd ~ ~").bank("RolandTR808").gain(0.9),
  note("c1 ~ ~ c1 ~ ~ c1 ~ c1 ~ ~ c1 ~ ~ c1 ~").s("808").decay(0.3).sustain(0.2)
)
```

### Aggressive Dembow
```javascript
// High energy version
setcps(118/60/4)

stack(
  s("bd ~ ~ bd ~ ~ bd ~ bd ~ ~ bd ~ ~ bd ~").bank("RolandTR808").distort(0.2),
  s("~ ~ sd ~ ~ sd ~ ~ ~ ~ sd ~ ~ sd ~ ~").bank("RolandTR808").gain(1.1),
  s("hh*16").bank("RolandTR808").gain(0.8),
  s("oh ~ ~ ~ oh ~ ~ ~").bank("RolandTR808").gain(0.5),
  note("c1 ~ ~ c1 ~ ~ c1 ~ c1 ~ ~ c1 ~ ~ c1 ~").s("808").distort(0.3).gain(1.3)
)
```

## Complete Template

```javascript
// Full Dembow Production Template
// BPM: 115 | Key: C minor
setcps(115/60/4)

let drums = stack(
  // Kick - signature dembow pattern
  s("bd ~ ~ bd ~ ~ bd ~ bd ~ ~ bd ~ ~ bd ~")
    .bank("RolandTR808")
    .gain(1),

  // Snare
  s("~ ~ sd ~ ~ sd ~ ~ ~ ~ sd ~ ~ sd ~ ~")
    .bank("RolandTR808")
    .gain(0.95),

  // Hi-hats
  s("hh*16")
    .bank("RolandTR808")
    .gain(0.7),

  // Open hat accents
  s("~ ~ ~ ~ oh ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.5)
)

let bass = note("c1 ~ ~ c1 ~ ~ c1 ~ c1 ~ ~ c1 ~ ~ c1 ~")
  .s("808")
  .decay(0.4)
  .sustain(0.4)
  .gain(1.2)
  .lpf(600)

let percussion = stack(
  s("~ tambora ~ ~ tambora ~ ~ tambora")
    .gain(0.6),
  s("~ ~ ~ cowbell ~ ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.4)
)

let melody = note("c4 ~ eb4 ~ f4 ~ eb4 c4 ~ g4 ~ f4 ~ eb4 ~ c4")
  .s("sawtooth")
  .lpf(2500)
  .attack(0.01)
  .decay(0.15)
  .sustain(0.2)
  .gain(0.5)
  .room(0.3)

let stabs = note("~ ~ [c4,eb4,g4] ~ ~ ~ ~ ~")
  .s("sawtooth")
  .lpf(3500)
  .attack(0.01)
  .decay(0.25)
  .sustain(0)
  .gain(0.55)

stack(
  drums,
  bass,
  percussion,
  melody.slow(2),
  stabs
)
```

## Tips for Authentic Sound

1. **The Kick Pattern is King**: The syncopated kick defines dembow - practice getting it tight
2. **808 Sustain**: Let the bass ring out but not overlap too much
3. **Keep it Aggressive**: Dembow is meant to be energetic and in-your-face
4. **Caribbean Percussion**: Tambora and guira add authentic Dominican flavor
5. **Simple Melodies**: Hooks should be catchy and repetitive
6. **Use Call and Response**: Between vocals/synths and the beat
7. **Don't Overcomplicate**: The rhythm pattern does the heavy lifting

## Quick Reference

| Element | Pattern | Notes |
|---------|---------|-------|
| BPM | 115 | Standard tempo |
| Kick | `bd ~ ~ bd ~ ~ bd ~ bd ~ ~ bd ~ ~ bd ~` | Signature pattern |
| Snare | `~ ~ sd ~ ~ sd ~ ~ ~ ~ sd ~ ~ sd ~ ~` | Syncopated |
| Hi-hat | `hh*16` | Driving 16ths |
| Bass Root | C1 | Common key |
| Bass | Follows kick | 808 preferred |
