# Comprehensive Drum Programming Guide for Strudel

A complete reference for programming drum patterns using classic drum machine samples in Strudel.

---

## Banks Available

| Bank | Character | Best For |
|------|-----------|----------|
| RolandTR808 | Classic, warm, boomy | Trap, hip-hop, reggaeton, dembow |
| RolandTR909 | Punchy, snappy | House, techno, trance |
| RolandTR707 | Digital, thin | Electro, synthpop, new wave |
| RolandCompurhythm1000 | Lo-fi, dusty | Lo-fi beats, experimental |
| AkaiLinn | Tight, punchy | 80s pop, funk |
| BossDR110 | Gritty, raw | Minimal, industrial |
| KorgKR55 | Vintage, organic | Disco, classic rock |
| KorgM1 | Digital, polished | 90s pop, R&B |
| RolandTR606 | Punchy, acidic | Acid house, electro |
| RolandTR626 | Clean, digital | Pop, dance |

---

## Drum Sounds Reference

| Abbreviation | Sound | Notes |
|--------------|-------|-------|
| bd | Bass drum/Kick | Foundation of the beat |
| sd | Snare | Backbeat, accent |
| hh | Closed hi-hat | Time-keeping, texture |
| oh | Open hi-hat | Accent, groove variation |
| cp | Clap | Layered with snare or standalone |
| cr | Crash | Transitions, accents |
| rim | Rimshot | Subtle accents |
| cb | Cowbell | Groove, texture |
| lt | Low tom | Fills, melodic |
| mt | Mid tom | Fills, melodic |
| ht | High tom | Fills, melodic |
| cy | Cymbal | Accents, rides |
| rs | Rimshot (alt) | Percussion accent |

---

## Essential Patterns by Genre

### Trap (140 BPM, half-time feel)

Classic trap pattern with 808 kick, snare on 3, and rapid hi-hats:

```javascript
// Basic trap beat
stack(
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandTR808"),
  s("~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR808"),
  s("hh*16").bank("RolandTR808").gain("[0.4@3 1]*4")
)
```

```javascript
// Trap with rolling hi-hats and 808 slides
stack(
  s("bd ~ ~ bd ~ ~ [bd bd] ~").bank("RolandTR808"),
  s("~ ~ ~ ~ sd ~ ~ [~ sd:1]").bank("RolandTR808"),
  s("hh*16").bank("RolandTR808").gain(sine.range(0.3, 1).fast(4)),
  s("~ ~ oh ~ ~ ~ oh ~").bank("RolandTR808").gain(0.5)
)
```

### Dembow / Reggaeton (95 BPM)

The signature Caribbean bounce pattern:

```javascript
// Classic dembow
s("bd ~ bd ~, ~ sd ~ sd, [~ hh]*4").bank("RolandTR808")
```

```javascript
// Dembow with variations
stack(
  s("bd ~ bd ~").bank("RolandTR808"),
  s("~ sd ~ sd").bank("RolandTR808").gain(0.9),
  s("[~ hh]*4").bank("RolandTR808").gain(0.6),
  s("~ ~ ~ oh").bank("RolandTR808").gain(0.4)
)
```

### House (125 BPM)

Four-on-the-floor with offbeat hi-hats:

```javascript
// Classic house beat
s("bd*4, ~ cp, [~ hh]*4, ~ ~ ~ oh").bank("RolandTR909")
```

```javascript
// Deep house with shuffle
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ ~ cp ~").bank("RolandTR909"),
  s("[~ hh]*4").bank("RolandTR909").gain(0.7),
  s("~ ~ ~ oh").bank("RolandTR909").gain(0.5)
).swing(0.1)
```

```javascript
// Chicago house with rimshot
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").bank("RolandTR909").gain(0.8),
  s("hh*8").bank("RolandTR909").gain("[0.5 0.8]*4"),
  s("rim(3,8)").bank("RolandTR909").gain(0.4)
)
```

### UK Drill (142 BPM)

Syncopated kick pattern with sliding hi-hats:

```javascript
// Basic UK drill
stack(
  s("bd ~ ~ [~ bd] ~ bd ~ ~").bank("RolandTR808"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR808"),
  s("hh(5,8)").bank("RolandTR808")
)
```

```javascript
// UK drill with hi-hat rolls
stack(
  s("bd ~ ~ [~ bd] ~ bd [~ bd] ~").bank("RolandTR808"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR808"),
  s("hh(5,8), [~ hh*3]*2").bank("RolandTR808").gain(0.7)
)
```

### Techno (130 BPM)

Driving, hypnotic patterns:

```javascript
// Industrial techno
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ sd:1 ~ sd:1").bank("RolandTR909").gain(0.6),
  s("hh*8").bank("RolandTR909").gain(sine.range(0.4, 0.8).fast(2)),
  s("oh(3,8)").bank("RolandTR909").gain(0.3)
)
```

```javascript
// Minimal techno with rimshot
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ ~").bank("RolandTR909").gain(0.7),
  s("[~ hh]*8").bank("RolandTR909").gain(0.5),
  s("rim(5,16)").bank("RolandTR909").gain(0.4)
)
```

### Boom Bap (90 BPM)

Classic hip-hop swing:

```javascript
// 90s boom bap
stack(
  s("bd ~ ~ ~ bd ~ ~ bd").bank("RolandTR808"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR808"),
  s("hh*8").bank("RolandTR808").gain("[0.6 0.4]*4")
).swing(0.2)
```

### Breakbeat (130 BPM)

Syncopated, energetic patterns:

```javascript
// Breakbeat foundation
stack(
  s("bd ~ bd ~ ~ bd ~ bd").bank("RolandTR909"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR909"),
  s("hh*8").bank("RolandTR909").gain(0.6),
  s("~ ~ ~ ~ oh ~ ~ ~").bank("RolandTR909").gain(0.4)
)
```

---

## Hi-Hat Patterns

### Basic Patterns

```javascript
// Eighth notes
s("hh*8").bank("RolandTR808")

// Sixteenth notes
s("hh*16").bank("RolandTR808")

// Offbeat hi-hats
s("[~ hh]*8").bank("RolandTR808")
```

### Hi-Hat Rolls

```javascript
// Trap-style rolls with velocity variation
s("hh*16").bank("RolandTR808").gain("[0.4 0.5 0.6 1]*4")

// Accelerating roll
s("hh hh hh*2 hh*4").bank("RolandTR808")

// 32nd note rolls
s("hh*32").bank("RolandTR808").gain(sine.range(0.3, 1).fast(8))
```

### Triplet Hi-Hats

```javascript
// Triplet feel
s("hh(3,8)").bank("RolandTR808")

// Triplet rolls
s("hh*12").bank("RolandTR808")

// Mixed triplets and straight
s("hh*4 hh*6 hh*4 hh*6").bank("RolandTR808")
```

### Swing and Shuffle

```javascript
// Light swing
s("hh*8").bank("RolandTR808").swing(0.1)

// Heavy shuffle
s("hh*8").bank("RolandTR808").swing(0.3)

// Humanized timing
s("hh*8").bank("RolandTR808").late(perlin.range(0, 0.02))
```

### Open/Closed Hi-Hat Interplay

```javascript
// Classic open hat accent
s("[hh hh hh oh]*2").bank("RolandTR909")

// Alternating pattern
s("hh hh oh hh").bank("RolandTR909").cut(1)

// Open hat choke
s("hh*8").bank("RolandTR808").cut(1)
s("~ ~ ~ oh ~ ~ ~ oh").bank("RolandTR808").cut(1)
```

---

## Layering Techniques

### Kick Layering

```javascript
// Layered kick for punch and weight
stack(
  s("bd*4").bank("RolandTR909").gain(0.8),  // Punch
  s("bd*4").bank("RolandTR808").gain(0.6).lpf(100)  // Sub weight
)
```

### Snare Layering

```javascript
// Snare with clap layer
stack(
  s("~ ~ sd ~").bank("RolandTR909"),
  s("~ ~ cp ~").bank("RolandTR909").gain(0.6).late(0.01)
)
```

### Full Kit Layering

```javascript
// Hybrid 808/909 kit
stack(
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandTR808"),  // 808 kick for weight
  s("~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR909"),    // 909 snare for snap
  s("hh*16").bank("RolandTR909").gain(0.5),     // 909 hats for clarity
  s("~ ~ ~ oh ~ ~ ~ oh").bank("RolandTR808").gain(0.4)  // 808 open hat
)
```

---

## Sample Manipulation

### Speed / Pitch Control

```javascript
// Pitched down kick (lower, longer)
s("bd*4").bank("RolandTR808").speed(0.8)

// Pitched up snare (higher, tighter)
s("~ ~ sd ~").bank("RolandTR808").speed(1.2)

// Extreme pitch for effects
s("bd").bank("RolandTR808").speed(0.5)  // Sub bass hit
s("hh*8").bank("RolandTR808").speed(2)   // Bright, short hats
```

### Sample Cutting

```javascript
// Cut sample short
s("bd*4").bank("RolandTR808").cut(1)

// Choked hi-hats (each cuts the previous)
s("hh oh hh hh oh hh hh oh").bank("RolandTR808").cut(1)

// Gated snare
s("~ ~ sd ~").bank("RolandTR909").end(0.1)
```

### Reverse

```javascript
// Reverse cymbal build
s("~ ~ ~ cr").bank("RolandTR909").reverse()

// Reverse snare accent
s("~ ~ [sd:1 sd] ~").bank("RolandTR808").reverse()

// Reverse kick for texture
s("bd ~ ~ ~").bank("RolandTR808").reverse().gain(0.5)
```

### Sample Start Point

```javascript
// Start from middle of sample
s("bd*4").bank("RolandTR808").begin(0.2)

// Varied start points
s("bd*4").bank("RolandTR808").begin(rand.range(0, 0.3))
```

### Filtering

```javascript
// Low-pass filtered hats
s("hh*16").bank("RolandTR808").lpf(2000)

// High-pass kick for texture
s("bd*4").bank("RolandTR808").hpf(200).gain(0.3)

// Evolving filter
s("hh*16").bank("RolandTR808").lpf(sine.range(500, 8000).fast(4))
```

---

## Advanced Techniques

### Euclidean Rhythms

```javascript
// Euclidean kick pattern
s("bd(3,8)").bank("RolandTR808")

// Complex polyrhythm
stack(
  s("bd(3,8)").bank("RolandTR808"),
  s("sd(2,8)").bank("RolandTR808"),
  s("hh(5,8)").bank("RolandTR808")
)

// Euclidean with rotation
s("bd(3,8,1)").bank("RolandTR808")  // Rotated by 1 step
```

### Probability and Randomness

```javascript
// Random ghost notes
s("hh*16").bank("RolandTR808").gain("[0.3 0.6]?")

// Probability-based hits
s("bd*4").bank("RolandTR808").sometimes(x => x.speed(0.9))

// Random sample selection
s("bd*4").bank("RolandTR808").n(irand(3))
```

### Panning and Space

```javascript
// Panned hi-hats
s("hh*8").bank("RolandTR808").pan(sine.range(-0.5, 0.5).fast(2))

// Wide stereo kit
stack(
  s("bd*4").bank("RolandTR909").pan(0),
  s("~ ~ sd ~").bank("RolandTR909").pan(0.1),
  s("hh*8").bank("RolandTR909").pan(sine.range(-0.3, 0.3).fast(4))
)
```

### Room and Reverb

```javascript
// Dry kick, wet snare
stack(
  s("bd*4").bank("RolandTR808").room(0),
  s("~ ~ sd ~").bank("RolandTR808").room(0.3).size(0.5)
)

// Cavernous clap
s("~ ~ cp ~").bank("RolandTR909").room(0.8).size(0.9)
```

---

## Complete Pattern Examples

### Modern Trap Banger

```javascript
stack(
  s("bd ~ ~ bd ~ ~ [bd bd] ~").bank("RolandTR808").speed(0.9),
  s("~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR808"),
  s("hh*16").bank("RolandTR808").gain(sine.range(0.3, 0.9).fast(4)),
  s("~ ~ ~ oh ~ ~ oh ~").bank("RolandTR808").cut(1).gain(0.5),
  s("~ ~ ~ ~ ~ ~ ~ cb").bank("RolandTR808").gain(0.3)
).cpm(70)
```

### Deep House Groove

```javascript
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ ~ cp ~").bank("RolandTR909").room(0.2),
  s("[~ hh]*8").bank("RolandTR909").gain(0.6),
  s("~ ~ ~ oh").bank("RolandTR909").cut(1).gain(0.4),
  s("rim(3,8)").bank("RolandTR909").gain(0.3).pan(-0.3)
).cpm(125).swing(0.05)
```

### Reggaeton Club Mix

```javascript
stack(
  s("bd ~ bd ~").bank("RolandTR808").speed(0.85),
  s("~ sd ~ sd").bank("RolandTR808").gain(0.9),
  s("[~ hh]*4").bank("RolandTR808").gain(0.5),
  s("~ ~ ~ oh").bank("RolandTR808").gain(0.3),
  s("cb(2,8)").bank("RolandTR808").gain(0.2)
).cpm(95)
```

### UK Drill Instrumental

```javascript
stack(
  s("bd ~ ~ [~ bd] ~ bd [~ bd] ~").bank("RolandTR808").speed(0.8),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR808"),
  s("hh(5,8)").bank("RolandTR808").gain(0.7),
  s("[~ hh*3]*2").bank("RolandTR808").gain(0.5),
  s("~ ~ ~ ~ oh ~ ~ ~").bank("RolandTR808").cut(1).gain(0.4)
).cpm(142)
```

---

## Tips and Best Practices

1. **Start with the kick and snare** - Build your foundation first
2. **Layer carefully** - Too many layers can muddy the mix
3. **Use velocity variation** - Real drummers don't hit every note the same
4. **Leave space** - Not every beat needs every element
5. **Match the bank to the genre** - 808s for trap, 909s for house/techno
6. **Use cut groups** - Especially for hi-hats (open cuts closed)
7. **Experiment with speed** - Subtle pitch changes add character
8. **Add swing judiciously** - A little goes a long way
9. **Process your samples** - Filtering and effects bring life to patterns
10. **Study reference tracks** - Listen to how producers layer and space drums
