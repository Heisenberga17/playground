# House Production Guide 🏠

## Characteristics

- **BPM**: 120-130 (typically 125)
- **Time Signature**: 4/4
- **Feel**: Four-on-the-floor kick pattern
- **Hi-hats**: Off-beat (on the "and" counts)
- **Groove**: Driving, danceable, hypnotic
- **Bass**: Deep, rolling bass lines
- **Origin**: Chicago, 1980s

---

## Core Pattern (4-on-floor)

The foundation of all house music - the classic four-on-the-floor beat:

```javascript
setcps(125/60/4)

stack(
  s("bd*4").bank("RolandTR909"),
  s("~ sd ~ sd").bank("RolandTR909"),
  s("~ hh ~ hh").bank("RolandTR909"),
  s("oh ~ ~ ~").bank("RolandTR909")
)
```

### Breakdown:
- `bd*4` - Kick on every beat (1, 2, 3, 4)
- `~ sd ~ sd` - Snare/clap on beats 2 and 4
- `~ hh ~ hh` - Off-beat hi-hats
- `oh ~ ~ ~` - Open hi-hat on beat 1 for variation

---

## Sub-genres

### Deep House (Darker, Minimal)

Characterized by deeper bass, subtle melodies, and soulful chord progressions:

```javascript
setcps(122/60/4)

stack(
  // Deep kick with subtle attack
  s("bd*4").bank("RolandTR909").gain(0.9).lpf(200),

  // Soft clap on 2 and 4
  s("~ cp ~ cp").bank("RolandTR909").gain(0.6).room(0.4),

  // Shimmering hats
  s("~ hh*2").bank("RolandTR909").gain(0.4).hpf(8000),

  // Deep rolling bass
  note("<c2 c2 f2 g2>").s("sawtooth")
    .lpf(sine.range(200, 800).slow(8))
    .gain(0.7)
    .decay(0.2).sustain(0.3),

  // Soulful pad
  note("<Cm7 Cm7 Fm7 G7>").s("pad")
    .gain(0.3).lpf(2000).room(0.5).slow(2)
)
```

### Tech House (More Percussive)

Heavier percussion, driving basslines, and minimal melodic elements:

```javascript
setcps(126/60/4)

stack(
  // Punchy kick
  s("bd*4").bank("RolandTR909").gain(1),

  // Layered percussion
  s("~ [cp,rm] ~ [cp,rm]").bank("RolandTR909").gain(0.7),
  s("hh*8").bank("RolandTR909").gain(0.5).pan(sine),
  s("~ ~ ~ oh").bank("RolandTR909").gain(0.4),

  // Extra percussion layers
  s("~ tom:1 ~ ~").bank("RolandTR909").gain(0.4).slow(2),
  s("[~ shaker]*4").gain(0.3),

  // Driving bass
  note("c2*4").s("sawtooth")
    .lpf(500).gain(0.8)
    .decay(0.1).sustain(0)
)
```

### Classic Chicago House

Raw, energetic, with piano stabs and that classic jack sound:

```javascript
setcps(124/60/4)

stack(
  // Classic 909 kit
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").bank("RolandTR909").room(0.3),
  s("[~ hh]*4").bank("RolandTR909").gain(0.6),
  s("oh ~ ~ ~").bank("RolandTR909").gain(0.5),

  // Chicago bass
  note("<c2 c2 f2 g2>").s("square")
    .lpf(400).gain(0.7).decay(0.15).sustain(0),

  // Piano stabs
  note("<[Cm7,~,~,Cm7] [~,~,Fm7,~]>")
    .s("piano").gain(0.5).room(0.2)
)
```

### Disco House

Funky, groovy, with more organic elements and strings:

```javascript
setcps(123/60/4)

stack(
  // Disco-style kick
  s("bd*4").bank("RolandTR909").gain(0.9),

  // Off-beat claps
  s("~ cp ~ [cp cp]").bank("RolandTR909").gain(0.6).room(0.3),

  // Busy hi-hat pattern
  s("hh*8").bank("RolandTR909").gain(rand.range(0.3, 0.6)),
  s("oh ~ oh ~").bank("RolandTR909").gain(0.4),

  // Funky bass
  note("<c2 [c2 c3] f2 [g2 g2 g3 g2]>").s("sawtooth")
    .lpf(600).gain(0.7),

  // Disco strings
  note("<Cm Fm Gm Fm>/2").voicing()
    .s("sawtooth").lpf(3000).gain(0.3).room(0.4)
)
```

---

## Bass Lines

### Rolling Bass Pattern

```javascript
note("<c2 c2 c3 c2 c2 c2 c3 c2>*2")
  .s("sawtooth")
  .lpf(sine.range(200, 600).slow(4))
  .gain(0.7)
  .decay(0.2).sustain(0.3)
```

### Funky Syncopated Bass

```javascript
note("<c2 ~ c2 c3 ~ c2 c3 ~>")
  .s("square")
  .lpf(400)
  .gain(0.8)
  .decay(0.15).sustain(0)
```

### Filter Envelope Bass

```javascript
note("c2*4")
  .s("sawtooth")
  .lpf(perlin.range(200, 1200).slow(2))
  .lpq(8)
  .gain(0.7)
  .attack(0.01).decay(0.2).sustain(0.4)
```

### Octave Jump Bass

```javascript
note("<[c2 c3] [c2 c2] [f2 f3] [g2 g2]>")
  .s("sawtooth")
  .lpf(500)
  .gain(0.75)
```

---

## Percussion

### Claps and Snares

```javascript
stack(
  // Main clap
  s("~ cp ~ cp").bank("RolandTR909").gain(0.7).room(0.3),

  // Ghost snares
  s("~ ~ ~ [~ sd:1]").bank("RolandTR909").gain(0.3),

  // Layered clap
  s("~ [cp,sd] ~ [cp,sd]").bank("RolandTR909").gain(0.6)
)
```

### Rides and Hi-hats

```javascript
stack(
  // Off-beat hats
  s("~ hh ~ hh").bank("RolandTR909").gain(0.5),

  // Sixteenth hats
  s("hh*16").bank("RolandTR909").gain(rand.range(0.2, 0.5)),

  // Ride pattern
  s("ride*4").bank("RolandTR909").gain(0.4).hpf(6000),

  // Open hat accents
  s("~ ~ oh ~").bank("RolandTR909").gain(0.45)
)
```

### Shakers and Auxiliary

```javascript
stack(
  s("[shaker shaker]*4").gain(0.35),
  s("~ tambourine ~ ~").gain(0.3).slow(2),
  s("cabasa*8").gain(0.25).pan(sine)
)
```

### Congas and Bongos

```javascript
stack(
  s("~ conga:1 ~ conga:2").gain(0.5),
  s("bongo:0 ~ bongo:1 ~").gain(0.4),
  s("~ ~ conga:0 ~").gain(0.35).slow(2)
)
```

### Full Percussion Stack

```javascript
stack(
  s("~ cp ~ cp").bank("RolandTR909").gain(0.7).room(0.3),
  s("~ hh*2").bank("RolandTR909").gain(0.5),
  s("oh ~ ~ ~").bank("RolandTR909").gain(0.4),
  s("ride*4").bank("RolandTR909").gain(0.35).hpf(6000),
  s("[shaker shaker]*4").gain(0.3),
  s("~ conga:1 ~ conga:2").gain(0.4)
)
```

---

## Chord Progressions

### Classic House Chords (Cm - Fm - Gm)

```javascript
note("<Cm7 Cm7 Fm7 Gm7>").voicing()
  .s("sawtooth")
  .lpf(2500)
  .gain(0.4)
  .room(0.3)
```

### 7th and 9th Chords

```javascript
note("<Cm9 Fm9 Abmaj7 Gm7>").voicing()
  .s("sawtooth")
  .lpf(3000)
  .gain(0.35)
  .attack(0.05).decay(0.3).sustain(0.5)
  .room(0.4)
```

### Stab Patterns

```javascript
// Rhythmic stabs
note("<Cm7 ~ ~ Cm7 ~ Fm7 ~ ~>")
  .voicing()
  .s("sawtooth")
  .lpf(4000)
  .gain(0.5)
  .decay(0.1).sustain(0)
  .room(0.2)
  .delay(0.25).delaytime(0.375).delayfeedback(0.3)
```

### Organ Chords

```javascript
note("<Cm7 Fm7 Gm7 Fm7>/2").voicing()
  .s("organ")
  .gain(0.4)
  .leslie(1)
  .room(0.3)
```

### Piano Stabs

```javascript
note("<[Cm7,~,Cm7,~] [~,Fm7,~,Fm7]>")
  .s("piano")
  .gain(0.5)
  .room(0.25)
  .delay(0.2).delaytime(0.25)
```

---

## Effects

### Sidechain Compression Effect

Simulating sidechain with the `.mask()` or volume automation:

```javascript
stack(
  // Kick stays full
  s("bd*4").bank("RolandTR909"),

  // Bass ducks on kick
  note("c2*4").s("sawtooth")
    .lpf(500)
    .gain(cosine.range(0.3, 0.8).fast(4)),

  // Chords duck on kick
  note("<Cm7 Fm7>").voicing().s("sawtooth")
    .lpf(2000)
    .gain(cosine.range(0.2, 0.5).fast(4))
)
```

### Filter Sweeps

```javascript
// Rising filter
note("c2*4").s("sawtooth")
  .lpf(sine.range(200, 4000).slow(16))
  .lpq(5)
  .gain(0.7)

// Filter breakdown
note("<Cm7 Fm7>").voicing().s("sawtooth")
  .lpf(perlin.range(500, 8000).slow(8))
  .gain(0.4)
```

### Reverb on Claps

```javascript
s("~ cp ~ cp").bank("RolandTR909")
  .gain(0.7)
  .room(0.5)
  .roomsize(0.8)
```

### Delay on Stabs

```javascript
note("<Cm7 ~ ~ Fm7>")
  .voicing()
  .s("sawtooth")
  .lpf(3000)
  .gain(0.5)
  .delay(0.4)
  .delaytime(0.375)
  .delayfeedback(0.4)
```

### Combined Effects Chain

```javascript
note("<Cm7 Fm7 Gm7 Fm7>").voicing()
  .s("sawtooth")
  .lpf(sine.range(1000, 4000).slow(8))
  .gain(0.4)
  .room(0.3)
  .delay(0.25).delaytime(0.375).delayfeedback(0.3)
  .phaser(2).phaserdepth(0.5)
```

---

## Complete Templates

### Template 1: Classic House Track

```javascript
setcps(125/60/4)

stack(
  // Drums
  s("bd*4").bank("RolandTR909").gain(0.95),
  s("~ cp ~ cp").bank("RolandTR909").gain(0.7).room(0.3),
  s("~ hh*2").bank("RolandTR909").gain(0.5),
  s("oh ~ ~ ~").bank("RolandTR909").gain(0.4),

  // Bass
  note("<c2 c2 f2 g2>").s("sawtooth")
    .lpf(sine.range(200, 600).slow(4))
    .gain(0.7)
    .decay(0.2).sustain(0.3),

  // Chords
  note("<Cm7 Cm7 Fm7 Gm7>").voicing()
    .s("sawtooth")
    .lpf(2500)
    .gain(cosine.range(0.2, 0.4).fast(4))
    .room(0.3),

  // Stabs
  note("<[Cm7,~,~,Cm7] [~,Fm7,~,~]>")
    .voicing()
    .s("sawtooth")
    .lpf(4000)
    .gain(0.4)
    .decay(0.1).sustain(0)
    .delay(0.3).delaytime(0.375).delayfeedback(0.35)
)
```

### Template 2: Deep House Track

```javascript
setcps(122/60/4)

stack(
  // Deep kick
  s("bd*4").bank("RolandTR909").gain(0.9).lpf(180),

  // Soft percussion
  s("~ cp ~ cp").bank("RolandTR909").gain(0.55).room(0.45),
  s("~ [hh hh] ~ [hh hh hh]").bank("RolandTR909").gain(0.4).hpf(7000),
  s("[shaker]*8").gain(0.25),

  // Deep bass with filter movement
  note("<c2 [c2 c3] f2 [g2 ~]>").s("sawtooth")
    .lpf(perlin.range(150, 500).slow(8))
    .gain(0.65)
    .decay(0.25).sustain(0.35),

  // Soulful pads
  note("<Cm9 Fm9 Abmaj7 Gm7>").voicing()
    .s("pad")
    .lpf(2000)
    .gain(0.25)
    .attack(0.5).release(1)
    .room(0.5),

  // Subtle lead
  note("<c4 ~ eb4 ~ g4 ~ f4 ~>").s("sine")
    .gain(0.2)
    .delay(0.4).delaytime(0.5).delayfeedback(0.5)
    .room(0.4)
    .slow(2)
)
```

### Template 3: Tech House Banger

```javascript
setcps(127/60/4)

stack(
  // Punchy kick
  s("bd*4").bank("RolandTR909").gain(1),

  // Heavy percussion
  s("~ [cp,rm] ~ [cp,rm]").bank("RolandTR909").gain(0.7),
  s("hh*16").bank("RolandTR909").gain(rand.range(0.3, 0.55)).pan(sine),
  s("~ ~ oh ~").bank("RolandTR909").gain(0.4),
  s("ride*8").bank("RolandTR909").gain(0.3).hpf(8000),

  // Toms
  s("~ ~ tom:0 ~").bank("RolandTR909").gain(0.5).slow(2),

  // Driving bass
  note("c2*8").s("sawtooth")
    .lpf(sine.range(300, 800).fast(0.5))
    .gain(0.75)
    .decay(0.08).sustain(0),

  // Minimal stab
  note("<Cm ~ ~ ~ Fm ~ ~ ~>")
    .voicing()
    .s("sawtooth")
    .lpf(5000)
    .gain(0.45)
    .decay(0.05).sustain(0)
    .delay(0.35).delaytime(0.25).delayfeedback(0.4)
)
```

### Template 4: Disco House Groove

```javascript
setcps(123/60/4)

stack(
  // Disco kick
  s("bd*4").bank("RolandTR909").gain(0.9),

  // Funky percussion
  s("~ cp ~ [cp cp]").bank("RolandTR909").gain(0.65).room(0.35),
  s("hh*8").bank("RolandTR909").gain(rand.range(0.35, 0.55)),
  s("oh*2").bank("RolandTR909").gain(0.4),
  s("[shaker]*8").gain(0.3),
  s("~ conga:0 conga:1 conga:2").gain(0.4),

  // Funky bass
  note("<c2 [c2 c3] c2 [c3 c2] f2 [f2 f3] g2 [g3 g2]>")
    .s("sawtooth")
    .lpf(700)
    .gain(0.7),

  // Disco strings
  note("<Cm Fm Gm Fm>/2").voicing()
    .s("sawtooth")
    .lpf(4000)
    .gain(0.3)
    .attack(0.1).release(0.5)
    .room(0.4),

  // Funky guitar-style stabs
  note("<[Cm,Cm,~,Cm] [~,Fm,Fm,~]>")
    .voicing()
    .s("sawtooth")
    .lpf(3500)
    .gain(0.4)
    .decay(0.08).sustain(0)
)
```

---

## Tips and Tricks

### Building Energy

1. **Filter automation**: Gradually open the filter over 8-16 bars
2. **Add percussion layers**: Introduce hi-hats, then rides, then shakers
3. **Remove kick for breakdowns**: Use `degradeBy(0.5)` or silence patterns

### Creating Tension

```javascript
// Snare roll for builds
s("sd*<1 2 4 8 16>").bank("RolandTR909").gain(0.6).slow(4)

// Rising filter
.lpf(sine.range(500, 10000).slow(8))
```

### Groove Variations

```javascript
// Swing feel
.swing(0.1)

// Humanize timing
.late(rand.range(-0.02, 0.02))

// Velocity variation
.gain(rand.range(0.6, 0.9))
```

### Layering Kicks

```javascript
stack(
  s("bd*4").bank("RolandTR909").lpf(100),  // Sub layer
  s("bd*4").bank("RolandTR808").hpf(100).gain(0.5)  // Click layer
)
```

---

## Sample Banks Reference

Best sample banks for house music in Strudel:

- `RolandTR909` - The classic house drum machine
- `RolandTR808` - For deeper kicks and snappy snares
- `RolandTR707` - Classic hi-hats
- `RolandTR606` - Punchy, tight drums
- `LinndDrum` - 80s flavor

---

All code examples are ready to paste directly into [Strudel.cc](https://strudel.cc)
