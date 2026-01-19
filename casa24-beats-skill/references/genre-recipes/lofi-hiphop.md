# Lo-Fi Hip-Hop Production Guide 🌙

A comprehensive guide to creating authentic lo-fi hip-hop beats in Strudel.cc

---

## Characteristics

| Element | Value |
|---------|-------|
| **BPM** | 70-90 (typically 80-85) |
| **Feel** | Relaxed, chill vibe |
| **Texture** | Dusty, vinyl warmth |
| **Harmony** | Jazz-influenced chords |
| **Groove** | Swing/shuffle feel |

---

## Core Pattern

The foundation of any lo-fi beat - dusty drums with bit-crushed texture:

```javascript
setcps(80/60/4)

stack(
  // Kick pattern - laid back, not too busy
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandCompurhythm1000"),

  // Snare on 2 and 4 (offset for that lazy feel)
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandCompurhythm1000"),

  // Hi-hats - steady but soft
  s("hh*8").bank("RolandCompurhythm1000").gain(0.5)
)
.crush(8)   // Bit crushing for that lo-fi texture
.coarse(2)  // Sample rate reduction
```

---

## Lo-Fi Texture Techniques

### Bit Crushing
Reduces bit depth for that gritty, degraded sound:
```javascript
// Lower values = more crushed/lo-fi
.crush(16)  // Subtle
.crush(8)   // Classic lo-fi
.crush(4)   // Heavy degradation
```

### Sample Rate Reduction
Creates aliasing and digital artifacts:
```javascript
// Higher values = more reduction
.coarse(2)  // Subtle warmth
.coarse(4)  // Noticeable degradation
.coarse(8)  // Extreme lo-fi
```

### Vinyl Crackle Layer
Add texture with noise samples:
```javascript
s("~ noise:3 ~ noise:5").gain(0.1).lpf(3000)
```

### Low-Pass Filter Warmth
Essential for that muffled, cozy sound:
```javascript
.lpf(4000)  // Warm but present
.lpf(2500)  // Muffled, distant
.lpf(6000)  // Bright but still warm
```

---

## Drum Characteristics

### Soft, Muted Kicks
```javascript
s("bd ~ ~ bd ~ ~ bd ~")
  .bank("RolandCompurhythm1000")
  .lpf(800)
  .gain(0.8)
```

### Snappy Snares
```javascript
s("~ ~ sd ~ ~ ~ sd ~")
  .bank("RolandCompurhythm1000")
  .hpf(200)
  .lpf(8000)
  .gain(0.7)
```

### Shuffled Hi-Hats
Add swing for that human, lazy feel:
```javascript
s("hh*8")
  .bank("RolandCompurhythm1000")
  .gain(0.5)
  .swing(0.2)  // Subtle shuffle
```

### Adding Swing/Groove
```javascript
// Global swing for the whole pattern
stack(
  s("bd ~ ~ bd ~ ~ bd ~"),
  s("~ ~ sd ~ ~ ~ sd ~"),
  s("hh*8").gain(0.5)
).bank("RolandCompurhythm1000").swing(0.15)
```

---

## Melodic Elements

### Jazz Piano Chords (7ths and 9ths)
```javascript
note("<Dm7 G7 Cmaj7 Am7>")
  .s("piano")
  .lpf(3000)
  .room(0.3)
  .gain(0.6)
```

### Rhodes/Electric Piano
```javascript
note("<Fm9 Bbmaj7 Ebmaj7 Abmaj7>")
  .s("epiano")
  .lpf(4000)
  .room(0.4)
  .crush(12)
  .gain(0.5)
```

### Mellow Guitar Samples
```javascript
s("guitar:2 ~ guitar:5 ~")
  .lpf(3500)
  .room(0.3)
  .gain(0.4)
```

### Soft Pads
```javascript
note("<Cmaj7 Am7 Fmaj7 G7>")
  .s("pad")
  .attack(0.5)
  .release(2)
  .lpf(2000)
  .room(0.5)
  .gain(0.3)
```

---

## Bass Lines

### Warm, Round Bass
```javascript
note("<c2 ~ ~ c2 ~ a1 ~ g1>")
  .s("bass")
  .lpf(600)
  .gain(0.7)
```

### Simple Root-Following Pattern
```javascript
note("<d2 ~ d2 ~ g2 ~ g2 ~ c2 ~ c2 ~ a1 ~ a1 ~>")
  .s("bass")
  .lpf(800)
  .decay(0.2)
  .sustain(0.5)
  .gain(0.6)
```

### Sub Bass Layer
```javascript
note("<d1 ~ ~ ~ g1 ~ ~ ~ c1 ~ ~ ~ a0 ~ ~ ~>")
  .s("sine")
  .lpf(200)
  .gain(0.5)
```

---

## Effects Chain

### Heavy Filtering
```javascript
// Warm, muffled lo-fi tone
.lpf(4000).lpq(0.5)

// Extra warmth with resonance
.lpf(3000).lpq(2)
```

### Subtle Reverb
```javascript
// Room reverb for space
.room(0.3).size(0.5)

// Longer, dreamy reverb
.room(0.5).size(0.8)
```

### Tape Saturation Feel
```javascript
// Combine crush and slight distortion
.crush(10).shape(0.2)
```

### Detuning for "Worn" Sound
```javascript
// Subtle pitch wobble
.detune(rand.range(-5, 5))

// Or use vibrato
.vib(0.5).vibmod(0.02)
```

---

## Complete Template

Full chill lo-fi hip-hop beat with all elements:

```javascript
// Lo-Fi Hip-Hop Template for Strudel.cc
// BPM: 82 (classic lo-fi tempo)

setcps(82/60/4)

stack(
  // === DRUMS ===
  // Kick - soft and muted
  s("bd ~ ~ bd ~ ~ bd ~")
    .bank("RolandCompurhythm1000")
    .lpf(800)
    .gain(0.8),

  // Snare - snappy but not harsh
  s("~ ~ sd ~ ~ ~ sd ~")
    .bank("RolandCompurhythm1000")
    .lpf(6000)
    .gain(0.7),

  // Hi-hats - shuffled and soft
  s("hh*8")
    .bank("RolandCompurhythm1000")
    .lpf(8000)
    .gain(0.4),

  // === MELODICS ===
  // Jazz chords - Rhodes/EP feel
  note("<Dm9 G7 Cmaj7 Am7>")
    .s("piano")
    .lpf(3000)
    .room(0.3)
    .gain(0.5),

  // Soft pad layer
  note("<Dm7 G7 Cmaj7 Am7>")
    .s("pad")
    .attack(0.3)
    .release(1.5)
    .lpf(2000)
    .room(0.4)
    .gain(0.25),

  // === BASS ===
  // Warm round bass following roots
  note("<d2 ~ d2 ~ g2 ~ g2 ~ c2 ~ c2 ~ a1 ~ a1 ~>")
    .s("bass")
    .lpf(700)
    .gain(0.6)
)
// Global lo-fi processing
.crush(10)
.coarse(2)
.lpf(6000)
.swing(0.12)
```

---

## Variations

### Rainy Day Lo-Fi
```javascript
setcps(78/60/4)

stack(
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandCompurhythm1000"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandCompurhythm1000"),
  s("[hh hh] [hh hh] [hh hh] [hh hh]").bank("RolandCompurhythm1000").gain(0.3),
  note("<Am7 Dm7 Gmaj7 Cmaj7>").s("piano").lpf(2500).room(0.5).gain(0.4),
  note("<a1 ~ ~ ~ d2 ~ ~ ~ g1 ~ ~ ~ c2 ~ ~ ~>").s("bass").lpf(500).gain(0.5)
)
.crush(8)
.coarse(3)
.lpf(4000)
```

### Late Night Study
```javascript
setcps(85/60/4)

stack(
  s("bd ~ bd ~ bd ~ bd ~").bank("RolandCompurhythm1000").gain(0.7),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandCompurhythm1000").gain(0.6),
  s("hh*16").bank("RolandCompurhythm1000").gain(0.25),
  note("<Fmaj7 Em7 Dm7 Cmaj7>").s("epiano").lpf(3500).room(0.4).gain(0.45),
  note("<f2 ~ ~ e2 ~ ~ d2 ~ ~ c2 ~ ~ ~ ~ ~ ~>").s("bass").lpf(600).gain(0.55)
)
.crush(12)
.lpf(5000)
.swing(0.1)
```

---

## Tips for Authentic Lo-Fi Sound

1. **Less is more** - Don't overcrowd the mix
2. **Embrace imperfection** - Slight timing variations add character
3. **Layer textures** - Combine multiple lo-fi effects subtly
4. **Keep it mellow** - Avoid harsh high frequencies
5. **Swing it** - Even subtle swing makes a huge difference
6. **Filter everything** - Low-pass filters are your best friend
7. **Space matters** - Use reverb to create depth

---

## Recommended Sample Banks

- `RolandCompurhythm1000` - Classic drum machine sounds
- `piano` - Jazz piano samples
- `epiano` - Rhodes/electric piano
- `bass` - Various bass sounds
- `pad` - Ambient pad sounds

---

*Happy lo-fi producing! 🎧*
