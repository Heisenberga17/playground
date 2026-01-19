# Trap Production Guide 🔥

## Characteristics

- **BPM**: 140-150 (half-time feel at 70-75 cps)
- **Heavy 808 bass** with long decay and pitch slides
- **Snare on beat 3** (half-time feel)
- **Rapid hi-hat patterns** with rolls and triplets
- **Dark, aggressive sound** palette
- **Sparse arrangements** with impactful drops

---

## Core Drum Pattern

The foundation of trap is the half-time feel with 808 kick, snappy snare, and busy hi-hats.

```javascript
// Basic trap drum pattern - half-time feel
setcps(70/60)

stack(
  // Kick pattern - 808 style
  s("bd(3,8)").bank("RolandTR808"),

  // Snare on beat 3 (half-time)
  s("~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR808"),

  // 16th note hi-hats with accent pattern
  s("hh*16").bank("RolandTR808").gain("[0.4@3 1]*4")
)
```

### Variation with More Bounce

```javascript
setcps(72/60)

stack(
  // Syncopated kick
  s("[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ ~ bd ~]").bank("RolandTR808"),

  // Snare with ghost notes
  s("~ ~ ~ ~ sd ~ ~ [~ sd:1]").bank("RolandTR808").gain("1 1 1 1 1 1 1 0.3"),

  // Hi-hats
  s("hh*16").bank("RolandTR808").gain("[0.4 0.3 0.5 1]*4")
)
```

---

## 808 Bass Techniques

The 808 bass is the heart of trap music - deep, sustained, and often with pitch slides.

### Basic 808 Sub Bass

```javascript
setcps(70/60)

stack(
  // 808 kick for attack
  s("bd(3,8)").bank("RolandTR808"),

  // Sub bass following kick pattern
  note("[e1 ~@3] [~ e1 ~@1] [e1 ~@3] [~ ~ e1 ~]")
    .sound("sawtooth")
    .lpf(80)
    .lpq(5)
    .decay(0.8)
    .sustain(0.3)
    .gain(1.2)
)
```

### 808 with Pitch Slides (Glides)

```javascript
setcps(70/60)

// 808 bass with pitch bend effect
note("[e1 ~@3] [~ e1:2 ~@1] [e1 ~@3] [~ ~ g1 ~]")
  .sound("sawtooth")
  .lpf(100)
  .decay(1)
  .sustain(0.4)
  .glide(0.1)
  .gain(1.3)
```

### Distorted 808 for Grit

```javascript
setcps(70/60)

note("[e1 ~@3] [~ e1 ~@1] [e1 ~@3] [~ ~ e1 ~]")
  .sound("sawtooth")
  .lpf(120)
  .decay(0.9)
  .sustain(0.3)
  .distort(0.3)
  .gain(1.1)
```

---

## Hi-Hat Patterns

Hi-hats are where trap gets its signature energy. Master these patterns for authentic trap feel.

### Basic 16th Note Pattern

```javascript
setcps(70/60)

s("hh*16")
  .bank("RolandTR808")
  .gain("[0.4 0.3 0.5 1]*4")
```

### Triplet Rolls

```javascript
setcps(70/60)

// Hi-hat with triplet rolls at end of phrases
s("[hh*4] [hh*4] [hh*4] [hh*6]")
  .bank("RolandTR808")
  .gain(sine.range(0.3, 0.8).fast(4))
```

### Complex Roll Pattern

```javascript
setcps(70/60)

// Signature trap hi-hat with rolls
s("[hh*4] [hh*4] [hh*8] [hh*12]")
  .bank("RolandTR808")
  .gain("[0.5 0.4 0.6 0.8] [0.5 0.4 0.6 0.8] [0.3 0.4 0.5 0.6 0.7 0.8 0.9 1] [0.2@6 0.4 0.5 0.6 0.7 0.9 1]")
```

### Open Hi-Hat Accents

```javascript
setcps(70/60)

stack(
  // Closed hi-hats
  s("hh*16").bank("RolandTR808").gain("[0.4 0.3 0.5 0.7]*4"),

  // Open hi-hat accents
  s("~ ~ ~ ~ ~ ~ oh ~").bank("RolandTR808").gain(0.6)
)
```

### Ghost Notes and Velocity Humanization

```javascript
setcps(70/60)

s("hh*16")
  .bank("RolandTR808")
  .gain(perlin.range(0.25, 0.9).fast(8))
  .pan(perlin.range(0.4, 0.6).fast(16))
```

---

## Melody Elements

Trap melodies are typically dark, minor key, and often use bell or flute sounds.

### Dark Minor Melody

```javascript
setcps(70/60)

// Phrygian mode melody - dark and menacing
note("[e4 f4 g4 ~] [~ e4 d4 ~] [e4 ~ g4 a4] [~ ~ e4 ~]")
  .sound("sawtooth")
  .lpf(800)
  .lpq(3)
  .attack(0.01)
  .decay(0.2)
  .sustain(0.1)
  .release(0.3)
  .gain(0.4)
```

### Bell/Pluck Lead

```javascript
setcps(70/60)

// Trap bell melody
note("[e5 ~ g5 ~] [~ a5 ~ e5] [g5 ~ ~ d5] [~ e5 ~ ~]")
  .sound("triangle")
  .lpf(2000)
  .decay(0.3)
  .sustain(0)
  .release(0.5)
  .delay(0.3)
  .delaytime(0.375)
  .gain(0.35)
```

### Flute-Style Melody

```javascript
setcps(70/60)

// Airy flute lead
note("[~ e5 ~ g5] [a5 ~ e5 ~] [~ g5 ~ ~] [e5 ~ d5 ~]")
  .sound("triangle")
  .lpf(3000)
  .attack(0.05)
  .decay(0.4)
  .sustain(0.2)
  .release(0.6)
  .room(0.4)
  .size(0.6)
  .gain(0.3)
```

### Dark Pad Atmosphere

```javascript
setcps(70/60)

// Atmospheric pad
note("<e3 d3 c3 b2>")
  .sound("sawtooth")
  .lpf(400)
  .lpq(2)
  .attack(0.5)
  .decay(1)
  .sustain(0.6)
  .release(1)
  .room(0.5)
  .size(0.8)
  .gain(0.25)
```

---

## Effects Chain

### Sidechain Compression Effect

```javascript
setcps(70/60)

stack(
  // Kick
  s("bd(3,8)").bank("RolandTR808"),

  // Pad with sidechain-style pumping
  note("<e3 d3>")
    .sound("sawtooth")
    .lpf(500)
    .gain(sine.range(0.1, 0.4).fast(2))
)
```

### Reverb on Snare

```javascript
setcps(70/60)

s("~ ~ ~ ~ sd ~ ~ ~")
  .bank("RolandTR808")
  .room(0.5)
  .size(0.7)
  .gain(0.9)
```

### Delay on Hi-Hats

```javascript
setcps(70/60)

s("hh*16")
  .bank("RolandTR808")
  .gain("[0.4 0.3 0.5 0.8]*4")
  .delay(0.2)
  .delaytime(0.1875)
  .delayfeedback(0.3)
```

### Distortion for Aggression

```javascript
setcps(70/60)

stack(
  s("bd(3,8)").bank("RolandTR808").distort(0.1),
  note("[e1 ~@3] [~ e1 ~@1]").sound("sawtooth").lpf(100).distort(0.4).gain(1.2)
)
```

---

## Complete Trap Template

Full working trap beat - copy and paste directly into Strudel.cc:

```javascript
// 🔥 TRAP BEAT TEMPLATE 🔥
// BPM: 140 (70 cps half-time)
setcps(70/60)

stack(
  // === DRUMS ===

  // 808 Kick
  s("[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ ~ bd ~]")
    .bank("RolandTR808")
    .gain(1.1),

  // Snare - half-time on beat 3
  s("~ ~ ~ ~ sd ~ ~ [~ sd:1]")
    .bank("RolandTR808")
    .room(0.4)
    .size(0.5)
    .gain("1 1 1 1 1 1 1 0.4"),

  // Hi-hats with rolls
  s("[hh*4] [hh*4] [hh*6] [hh*8]")
    .bank("RolandTR808")
    .gain(perlin.range(0.3, 0.8).fast(8))
    .pan(perlin.range(0.35, 0.65).fast(16))
    .delay(0.15)
    .delaytime(0.09375)
    .delayfeedback(0.2),

  // Open hi-hat accent
  s("~ ~ ~ ~ ~ ~ oh ~")
    .bank("RolandTR808")
    .gain(0.5),

  // === 808 BASS ===

  note("[e1 ~@3] [~ e1 ~@1] [e1 ~@3] [~ ~ g1 ~]")
    .sound("sawtooth")
    .lpf(90)
    .lpq(4)
    .decay(0.9)
    .sustain(0.3)
    .distort(0.25)
    .gain(1.2),

  // === MELODY ===

  // Dark bell lead
  note("[e5 ~ g5 ~] [~ a5 ~ e5] [g5 ~ ~ d5] [~ e5 ~ ~]")
    .sound("triangle")
    .lpf(2500)
    .decay(0.35)
    .sustain(0)
    .release(0.5)
    .delay(0.25)
    .delaytime(0.375)
    .delayfeedback(0.35)
    .gain(0.3),

  // === ATMOSPHERE ===

  // Dark pad
  note("<e3 d3 c3 b2>")
    .sound("sawtooth")
    .lpf(350)
    .lpq(2)
    .attack(0.6)
    .decay(1.2)
    .sustain(0.5)
    .release(1)
    .room(0.5)
    .size(0.7)
    .gain(0.2)
)
```

---

## Minimal Trap Beat

A stripped-down version focusing on the essentials:

```javascript
// Minimal Trap
setcps(70/60)

stack(
  // Kick and snare
  s("[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ ~ bd ~]").bank("RolandTR808"),
  s("~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR808").room(0.3).size(0.4),

  // Hi-hats
  s("hh*16").bank("RolandTR808").gain("[0.4 0.3 0.5 0.9]*4"),

  // 808 bass
  note("[e1 ~@3] [~ e1 ~@1] [e1 ~@3] [~ ~ e1 ~]")
    .sound("sawtooth").lpf(80).decay(0.8).sustain(0.2).gain(1.2)
)
```

---

## Hard Trap Variation

More aggressive with heavier distortion:

```javascript
// Hard Trap
setcps(72/60)

stack(
  // Hard kick
  s("[bd ~ bd ~] [~ bd ~ bd] [bd ~ bd ~] [~ bd bd ~]")
    .bank("RolandTR808")
    .distort(0.15)
    .gain(1.2),

  // Layered snare
  s("~ ~ ~ ~ [sd cp] ~ ~ ~")
    .bank("RolandTR808")
    .room(0.5)
    .size(0.6)
    .distort(0.1),

  // Aggressive hi-hats
  s("[hh*4] [hh*8] [hh*4] [hh*12]")
    .bank("RolandTR808")
    .gain(sine.range(0.3, 1).fast(4))
    .distort(0.05),

  // Heavy 808
  note("[e1 e1 ~@2] [~ e1 ~ e1] [e1 ~@3] [~ ~ g1 e1]")
    .sound("sawtooth")
    .lpf(100)
    .decay(0.7)
    .sustain(0.4)
    .distort(0.4)
    .gain(1.3)
)
```

---

## Tips for Authentic Trap Sound

1. **Keep it sparse** - Let the 808 and drums breathe
2. **Half-time feel** - Snare always on beat 3 (or 5 in 8 beats)
3. **808 is king** - The sub bass carries the track
4. **Hi-hat rolls** - Build tension with accelerating rolls
5. **Dark melodies** - Use minor scales, especially Phrygian
6. **Space and reverb** - Give snares room to breathe
7. **Layer sounds** - Combine kick with 808 for punch + sustain
