# Reggaeton Production Guide 🌴

## Characteristics
- **BPM:** 90-100 (typically 95)
- **Signature:** Dembow rhythm (kick-snare pattern)
- **Feel:** Syncopated, danceable groove
- **Bass:** Heavy sub bass and 808s
- **Percussion:** Latin percussion elements (congas, bongos, shakers)

---

## The Dembow Pattern

The classic reggaeton rhythm is built on the "dembow" pattern, derived from Jamaican dancehall. This syncopated kick-snare relationship is the foundation of the genre.

```
Beat: 1 . . . 2 . . . 3 . . . 4 . . .
Kick: X . . . . . X . X . . . . . X .
Snr:  . . . X . . . X . . . X . . . X
```

The kick hits on beat 1, the "and" of 2, beat 3, and the "and" of 4. The snare hits consistently on the offbeats (the "and" of each beat).

---

## Core Code

### Basic Dembow Beat
```javascript
setcps(95/60/4)

stack(
  // Dembow kick pattern
  s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~").bank("RolandTR808"),
  // Offbeat snare
  s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd").bank("RolandTR808"),
  // Hi-hats
  s("hh*8").bank("RolandTR808").gain(0.6)
)
```

### Alternative Dembow Notation
```javascript
setcps(95/60/4)

stack(
  s("bd:3").struct("x ~ ~ ~ ~ ~ x ~ x ~ ~ ~ ~ ~ x ~").bank("RolandTR808"),
  s("sd:1").struct("~ ~ ~ x ~ ~ ~ x ~ ~ ~ x ~ ~ ~ x").bank("RolandTR808"),
  s("hh:2*8").bank("RolandTR808").gain(0.6)
)
```

---

## Bass Lines

### Sub Bass Following Kick
```javascript
setcps(95/60/4)

stack(
  s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~").bank("RolandTR808"),
  s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd").bank("RolandTR808"),
  // Sub bass
  note("g1 ~ ~ ~ ~ ~ g1 ~ a1 ~ ~ ~ ~ ~ g1 ~")
    .sound("sawtooth")
    .lpf(80)
    .gain(0.8)
)
```

### Bouncy 808 Bass
```javascript
setcps(95/60/4)

note("g1 ~ ~ ~ ~ ~ g1 ~ a1 ~ ~ ~ ~ ~ [g1 g1] ~")
  .s("808")
  .decay(0.3)
  .sustain(0)
  .gain(0.9)
```

### 808 Slides
```javascript
setcps(95/60/4)

note("g1 ~ ~ ~ ~ ~ <g1 a1> ~ [g1 a1] ~ ~ ~ ~ ~ g1 ~")
  .s("808")
  .decay(0.4)
  .sustain(0)
  .glide(0.1)
  .gain(0.85)
```

---

## Percussion

### Congas
```javascript
s("~ conga:1 ~ conga:0 ~ conga:2 ~ conga:0")
  .gain(0.5)
```

### Bongos
```javascript
s("bongo:0 ~ bongo:1 ~ bongo:0 bongo:1 ~ bongo:0")
  .gain(0.45)
```

### Shakers
```javascript
s("shaker*8")
  .gain(0.3)
```

### Rim Shots
```javascript
s("~ ~ rim ~ ~ ~ rim ~")
  .bank("RolandTR808")
  .gain(0.55)
```

### Full Percussion Stack
```javascript
setcps(95/60/4)

stack(
  s("~ conga:1 ~ conga:0 ~ conga:2 ~ conga:0").gain(0.5),
  s("shaker*8").gain(0.3),
  s("~ ~ rim ~ ~ ~ rim ~").bank("RolandTR808").gain(0.5)
)
```

---

## Melodic Elements

### Simple Synth Stabs
```javascript
setcps(95/60/4)

note("~ [g4,bb4,d5] ~ ~ ~ [f4,a4,c5] ~ ~")
  .sound("sawtooth")
  .lpf(2000)
  .attack(0.01)
  .decay(0.1)
  .sustain(0.3)
  .release(0.2)
  .gain(0.5)
```

### Piano Chords
```javascript
setcps(95/60/4)

note("~ [g3,bb3,d4] ~ [g3,bb3,d4] ~ [f3,a3,c4] ~ ~")
  .sound("piano")
  .gain(0.55)
  .room(0.3)
```

### Vocal Chops Style
```javascript
setcps(95/60/4)

s("~ vocal:2 ~ ~ vocal:1 ~ vocal:3 ~")
  .begin(0.1)
  .end(0.3)
  .gain(0.6)
  .room(0.4)
```

### Brass Stabs
```javascript
setcps(95/60/4)

note("~ ~ [g4,bb4,d5] ~ ~ ~ ~ [f4,a4,c5]")
  .sound("sawtooth")
  .lpf(1500)
  .attack(0.02)
  .decay(0.15)
  .sustain(0.2)
  .release(0.1)
  .gain(0.45)
```

---

## Effects

### Reverb on Snare
```javascript
s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd")
  .bank("RolandTR808")
  .room(0.4)
  .size(0.6)
```

### Subtle Delay
```javascript
s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd")
  .bank("RolandTR808")
  .delay(0.3)
  .delaytime(0.125)
  .delayfeedback(0.2)
```

### Filter Sweeps
```javascript
setcps(95/60/4)

note("g1 ~ ~ ~ ~ ~ g1 ~ a1 ~ ~ ~ ~ ~ g1 ~")
  .sound("sawtooth")
  .lpf(sine.range(200, 2000).slow(8))
  .gain(0.7)
```

### Combined Effects
```javascript
setcps(95/60/4)

s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd")
  .bank("RolandTR808")
  .room(0.35)
  .size(0.5)
  .delay(0.25)
  .delaytime(0.125)
  .delayfeedback(0.15)
```

---

## Complete Template

### Full Reggaeton Beat
```javascript
setcps(95/60/4)

stack(
  // Dembow kick
  s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~")
    .bank("RolandTR808")
    .gain(0.9),

  // Snare with reverb
  s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd")
    .bank("RolandTR808")
    .room(0.35)
    .size(0.5)
    .gain(0.85),

  // Hi-hats
  s("hh*8")
    .bank("RolandTR808")
    .gain(0.55),

  // 808 bass
  note("g1 ~ ~ ~ ~ ~ g1 ~ a1 ~ ~ ~ ~ ~ g1 ~")
    .s("sawtooth")
    .lpf(80)
    .gain(0.8),

  // Percussion - congas
  s("~ conga:1 ~ conga:0 ~ conga:2 ~ conga:0")
    .gain(0.4),

  // Shaker
  s("shaker*8")
    .gain(0.25),

  // Synth stabs
  note("~ [g4,bb4,d5] ~ ~ ~ [f4,a4,c5] ~ ~")
    .sound("sawtooth")
    .lpf(2000)
    .attack(0.01)
    .decay(0.1)
    .sustain(0.3)
    .release(0.2)
    .gain(0.4)
)
```

### Extended Version with Variation
```javascript
setcps(95/60/4)

stack(
  // Dembow kick with variation
  s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~")
    .bank("RolandTR808")
    .gain(0.9)
    .sometimes(x => x.speed(1.1)),

  // Snare with delay and reverb
  s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd")
    .bank("RolandTR808")
    .room(0.4)
    .delay(0.2)
    .delaytime(0.125)
    .delayfeedback(0.15)
    .gain(0.85),

  // Hi-hats with velocity variation
  s("hh*8")
    .bank("RolandTR808")
    .gain("0.5 0.4 0.6 0.4 0.5 0.4 0.6 0.4"),

  // Open hi-hat accent
  s("~ ~ ~ ~ oh ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.4),

  // 808 bass with filter movement
  note("g1 ~ ~ ~ ~ ~ g1 ~ a1 ~ ~ ~ ~ ~ g1 ~")
    .s("sawtooth")
    .lpf(sine.range(60, 120).slow(4))
    .gain(0.8),

  // Congas
  s("~ conga:1 ~ conga:0 ~ conga:2 ~ conga:0")
    .gain(0.4),

  // Rim shots
  s("~ ~ rim ~ ~ ~ rim ~")
    .bank("RolandTR808")
    .gain(0.45),

  // Shaker
  s("shaker*8")
    .gain(0.25),

  // Synth stabs with filter
  note("~ [g4,bb4,d5] ~ ~ ~ [f4,a4,c5] ~ ~")
    .sound("sawtooth")
    .lpf(sine.range(1500, 3000).slow(8))
    .attack(0.01)
    .decay(0.1)
    .sustain(0.3)
    .release(0.2)
    .room(0.2)
    .gain(0.4),

  // Piano chords (every 2 bars)
  note("~ [g3,bb3,d4] ~ ~ ~ ~ ~ ~")
    .sound("piano")
    .gain(0.35)
    .room(0.3)
    .slow(2)
)
```

---

## Tips & Variations

### Tempo Variations
- **Slow reggaeton:** 85-90 BPM
- **Standard:** 90-95 BPM
- **Fast/perreo:** 95-100 BPM

### Key Signatures
Common keys for reggaeton:
- G minor (most common)
- A minor
- E minor
- D minor

### Dembow Variations
```javascript
// Traditional dembow
s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~")

// Simplified dembow
s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ ~ ~")

// Double-time feel
s("bd ~ bd ~ ~ ~ bd ~ bd ~ bd ~ ~ ~ bd ~")
```

### Adding Energy
```javascript
// Add crash on downbeat
s("crash ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
  .bank("RolandTR808")
  .gain(0.5)
  .slow(4)

// Fill every 4 bars
s("~ ~ ~ ~ ~ ~ ~ [sd sd sd sd]")
  .bank("RolandTR808")
  .gain(0.7)
  .slow(4)
```

---

## Reference Tracks
- "Gasolina" - Daddy Yankee (classic dembow)
- "Dura" - Daddy Yankee (modern production)
- "Despacito" - Luis Fonsi ft. Daddy Yankee (pop crossover)
- "Con Calma" - Daddy Yankee (contemporary)
- "Tusa" - Karol G & Nicki Minaj (modern female perspective)

---

## Quick Start

Copy this minimal working beat to get started:

```javascript
setcps(95/60/4)

stack(
  s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~").bank("RolandTR808"),
  s("~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd ~ ~ ~ sd").bank("RolandTR808").room(0.3),
  s("hh*8").bank("RolandTR808").gain(0.5),
  note("g1 ~ ~ ~ ~ ~ g1 ~ a1 ~ ~ ~ ~ ~ g1 ~").s("sawtooth").lpf(80).gain(0.8)
)
```

Paste this into [Strudel.cc](https://strudel.cc) and press play!
