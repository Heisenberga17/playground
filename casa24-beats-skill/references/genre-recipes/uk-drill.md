# UK Drill Production Guide 🇬🇧

## Characteristics
- **BPM**: 140-145 (typically 142)
- **Sound**: Dark, aggressive, menacing
- **Signature**: Sliding 808s with pitch bends
- **Hi-hats**: Syncopated, triplet-heavy patterns
- **Keys**: Minor keys, dark melodies
- **Influence**: UK Grime + Chicago Drill + UK Garage

---

## Core Pattern

Basic UK Drill foundation with the characteristic drum pattern:

```javascript
// UK Drill - Core Pattern
setcps(142/60/4)

stack(
  // Kick - sparse, punchy placement
  s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ bd ~ ~ ~ ~")
    .bank("RolandTR808")
    .gain(1.2),

  // Snare - on beats 5 and 13 (offbeat feel)
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.9),

  // Hi-hats - basic eighth note pattern
  s("[hh hh hh hh]*4")
    .bank("RolandTR808")
    .gain(0.6)
)
```

---

## 808 Slides

The sliding 808 bass is the signature sound of UK Drill:

```javascript
// UK Drill - Sliding 808s
setcps(142/60/4)

stack(
  // 808 with pitch slides
  note("c1 ~ ~ ~ [c1 ~] ~ ~ ~ c1 ~ ~ [c1 eb1] ~ ~ ~ ~")
    .s("sawtooth")
    .lpf(120)
    .lpq(5)
    .decay(0.8)
    .sustain(0.6)
    .gain(1.3)
    .glide(0.15),  // Creates the slide effect

  // Alternative with actual 808 samples
  s("808:0 ~ ~ ~ 808:0 ~ ~ ~ 808:0 ~ ~ 808:0 ~ ~ ~ ~")
    .note("c1 ~ ~ ~ c1 ~ ~ ~ c1 ~ ~ [c1 eb1] ~ ~ ~ ~")
    .gain(1.2)
    .decay(1.5)
)
```

### 808 Characteristics
- **Pitch bends/glides**: Use `.glide()` for smooth transitions
- **Long sustain**: `.decay(1.5)` or higher
- **Dark distortion**: `.distort(0.3)` or `.crush(8)`
- **Sub-heavy**: Keep fundamental around C1-E1

---

## Hi-Hat Patterns

UK Drill hi-hats are complex with triplets and rolls:

```javascript
// UK Drill - Hi-Hat Variations
setcps(142/60/4)

stack(
  // Pattern 1: Basic triplet feel
  s("[hh hh hh]*4 [hh hh hh]*4 [hh*3 hh hh hh]*2 [hh hh hh hh*3]*2")
    .bank("RolandTR808")
    .gain("[0.6 0.4 0.5]*16"),

  // Pattern 2: Complex rolls with ghost notes
  s("hh*2 [hh hh hh] hh*2 [hh hh hh] hh [hh*6] hh [hh hh*3 hh]")
    .bank("RolandTR808")
    .gain("[0.7 0.3 0.4 0.7 0.3 0.4 0.7 0.5]*2"),

  // Pattern 3: Signature UK Drill triplet pattern
  s("[hh hh hh hh hh hh]*2 [hh*3 ~ hh*3 ~]*2")
    .bank("RolandTR808")
    .gain(sine.range(0.3, 0.7).fast(8))
)
```

### Hi-Hat Characteristics
- **Triplet patterns**: Use `hh*3` for triplet rolls
- **Complex rolls**: Vary density throughout the bar
- **Velocity automation**: Use `.gain()` with patterns
- **Ghost notes**: Lower velocity hits (0.3-0.4)
- **Open hi-hats**: Occasional `oh` for emphasis

```javascript
// Hi-hat with open hat accents
s("[hh hh hh]*2 [hh oh ~ hh] [hh hh hh]*2 [hh hh oh ~]")
  .bank("RolandTR808")
  .gain("[0.5 0.4 0.5]*4 [0.5 0.7 ~ 0.4]*2 [0.5 0.4 0.5]*4 [0.5 0.4 0.8 ~]")
```

---

## Melodic Elements

Dark, atmospheric melodies define the UK Drill sound:

```javascript
// UK Drill - Dark Piano
setcps(142/60/4)

note("c4 ~ eb4 ~ g4 ~ ~ ~ ab4 ~ g4 ~ ~ ~ ~ ~")
  .s("piano")
  .gain(0.5)
  .room(0.6)
  .size(0.8)
  .lpf(2000)
```

```javascript
// UK Drill - String Stabs
setcps(142/60/4)

note("[c4,eb4,g4] ~ ~ ~ ~ ~ ~ ~ [ab3,c4,eb4] ~ ~ ~ ~ ~ ~ ~")
  .s("sawtooth")
  .attack(0.01)
  .decay(0.3)
  .sustain(0.1)
  .release(0.5)
  .lpf(1500)
  .room(0.7)
  .gain(0.4)
```

```javascript
// UK Drill - Eerie Pad
setcps(142/60/4)

note("[c3,g3,eb4] ~ ~ ~ ~ ~ ~ ~ [ab2,eb3,c4] ~ ~ ~ ~ ~ ~ ~")
  .s("sawtooth")
  .attack(0.5)
  .decay(0.5)
  .sustain(0.8)
  .release(1)
  .lpf(800)
  .room(0.9)
  .size(0.9)
  .gain(0.25)
```

### Melodic Characteristics
- **Dark piano**: Sparse, haunting notes in minor keys
- **String stabs**: Short, stabby chord hits
- **Minor scales**: C minor, G minor, D minor are common
- **Eerie pads**: Long, atmospheric background textures
- **Bell sounds**: Occasional dark bell melodies

---

## Differences from US Drill

| Aspect | UK Drill | US Drill |
|--------|----------|----------|
| **BPM** | 140-145 | 140-150 |
| **808s** | Heavy sliding/gliding | More static, hard-hitting |
| **Hi-hats** | Complex triplet rolls | Simpler patterns |
| **Melodies** | Darker, more atmospheric | Harder, more aggressive |
| **Influence** | UK Garage, Grime | Trap, Chief Keef era |
| **Snare** | Often on offbeats | More traditional placement |

---

## Effects

### Reverb on Melodics
```javascript
note("c4 ~ eb4 ~ g4 ~ ~ ~")
  .s("piano")
  .room(0.7)      // Reverb amount
  .size(0.85)     // Room size
  .gain(0.5)
```

### Distortion on 808
```javascript
note("c1 ~ ~ ~ c1 ~ ~ ~")
  .s("sawtooth")
  .lpf(100)
  .distort(0.4)   // Adds grit
  .gain(1.2)
```

### Delay Throws
```javascript
note("c4 ~ ~ ~ ~ ~ ~ ~")
  .s("piano")
  .delay(0.5)     // Delay amount
  .delaytime(0.375) // Synced delay
  .delayfeedback(0.4)
  .gain(0.5)
```

---

## Complete Template

Full UK Drill beat ready for Strudel.cc:

```javascript
// UK DRILL - COMPLETE TEMPLATE
// BPM: 142
setcps(142/60/4)

stack(
  // === DRUMS ===

  // Kick - sparse UK Drill pattern
  s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ bd ~ ~ ~ ~")
    .bank("RolandTR808")
    .gain(1.2),

  // Snare - characteristic offbeat placement
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.9)
    .room(0.2),

  // Hi-hats - triplet rolls with velocity variation
  s("[hh hh hh]*2 [hh*3 hh hh hh] [hh hh hh]*2 [hh hh*3 hh hh]")
    .bank("RolandTR808")
    .gain("[0.6 0.4 0.5]*6 [0.6 0.5 0.4 0.6]"),

  // Open hi-hat accents
  s("~ ~ ~ ~ ~ ~ oh ~ ~ ~ ~ ~ ~ ~ ~ oh")
    .bank("RolandTR808")
    .gain(0.5),

  // === 808 BASS ===

  // Sliding 808 - the UK Drill signature
  note("c1 ~ ~ ~ [c1 ~] ~ ~ ~ c1 ~ ~ [c1 eb1] ~ ~ ~ ~")
    .s("sawtooth")
    .lpf(100)
    .lpq(3)
    .decay(1.2)
    .sustain(0.8)
    .distort(0.3)
    .gain(1.1)
    .glide(0.12),

  // === MELODICS ===

  // Dark piano - sparse and haunting
  note("c4 ~ ~ ~ eb4 ~ ~ ~ g4 ~ ab4 ~ g4 ~ ~ ~")
    .s("piano")
    .gain(0.45)
    .lpf(2500)
    .room(0.6)
    .size(0.7),

  // String stabs - minor chord hits
  note("[c4,eb4,g4] ~ ~ ~ ~ ~ ~ ~ [ab3,c4,eb4] ~ ~ ~ ~ ~ ~ ~")
    .s("sawtooth")
    .attack(0.01)
    .decay(0.25)
    .sustain(0.1)
    .release(0.4)
    .lpf(1800)
    .room(0.5)
    .gain(0.35),

  // Atmospheric pad - dark background texture
  note("[c2,g2,eb3]")
    .s("sawtooth")
    .attack(1)
    .decay(0.5)
    .sustain(0.9)
    .release(2)
    .lpf(600)
    .room(0.9)
    .size(0.95)
    .gain(0.15)
)
```

---

## Variations

### Darker Variant
```javascript
// Even darker atmosphere
setcps(140/60/4)

stack(
  s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ [bd ~] ~ ~ ~ ~")
    .bank("RolandTR808").gain(1.1),
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .bank("RolandTR808").gain(0.85).room(0.3),
  s("[hh*3]*4 [hh*6 hh hh]*2")
    .bank("RolandTR808").gain("[0.5 0.3 0.4]*8"),
  note("c1 ~ ~ ~ c1 ~ ~ ~ [c1 ~] ~ ~ [bb0 c1] ~ ~ ~ ~")
    .s("sawtooth").lpf(80).decay(1.5).distort(0.5).gain(1.2),
  note("[c3,eb3,g3,bb3]")
    .s("sawtooth").attack(0.8).sustain(0.9).lpf(500).room(0.95).gain(0.1)
)
```

### Aggressive Variant
```javascript
// More aggressive, harder hitting
setcps(144/60/4)

stack(
  s("bd ~ bd ~ bd ~ ~ ~ bd ~ ~ bd bd ~ ~ ~")
    .bank("RolandTR808").gain(1.3),
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ sd")
    .bank("RolandTR808").gain(1).distort(0.1),
  s("[hh hh hh hh]*2 [hh*6 hh hh] [hh hh hh hh] [hh*3 hh*3 hh hh]")
    .bank("RolandTR808").gain("[0.7 0.5 0.6 0.7]*4"),
  note("c1 ~ c1 ~ c1 ~ ~ ~ c1 ~ ~ [c1 d1 eb1] ~ ~ ~ ~")
    .s("sawtooth").lpf(120).decay(1).distort(0.6).gain(1.3).glide(0.1)
)
```

---

## Tips for Authentic UK Drill

1. **Keep it dark**: Use minor keys exclusively (Cm, Gm, Dm)
2. **Sparse kicks**: Less is more, let the 808 breathe
3. **Slide the bass**: The gliding 808 is essential
4. **Layer hi-hats**: Combine different patterns for complexity
5. **Leave space**: UK Drill has more breathing room than US Drill
6. **Use reverb**: Atmospheric reverb on melodics
7. **Distort the 808**: Just enough grit, not too clean
8. **Offbeat snares**: Place snares on unexpected beats

---

## Key Scales for UK Drill

- **C Minor**: C, D, Eb, F, G, Ab, Bb
- **G Minor**: G, A, Bb, C, D, Eb, F
- **D Minor**: D, E, F, G, A, Bb, C
- **A Minor**: A, B, C, D, E, F, G

---

## Sample Code for Strudel.cc

Copy and paste this into [Strudel.cc](https://strudel.cc) to get started:

```javascript
// UK DRILL STARTER
setcps(142/60/4)
stack(
  s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ bd ~ ~ ~ ~").bank("RolandTR808").gain(1.2),
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR808").gain(0.9),
  s("[hh hh hh]*2 [hh*3 hh hh hh] [hh hh hh]*2 [hh hh*3 hh hh]").bank("RolandTR808").gain(0.5),
  note("c1 ~ ~ ~ c1 ~ ~ ~ c1 ~ ~ [c1 eb1] ~ ~ ~ ~").s("sawtooth").lpf(100).decay(1.2).distort(0.3).gain(1.1).glide(0.12),
  note("c4 ~ eb4 ~ g4 ~ ~ ~ ab4 ~ g4 ~ ~ ~ ~ ~").s("piano").gain(0.4).room(0.6)
)
```
