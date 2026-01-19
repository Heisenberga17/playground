# Strudel Synthesizers Catalog

A comprehensive reference for all Strudel synthesizers, their parameters, and practical recipes.

---

## Basic Oscillators

The fundamental waveforms available in Strudel:

### Sine Wave
Pure tone with no harmonics. Perfect for sub bass and clean tones.

```javascript
note("c2").s("sine")
note("c3 e3 g3 c4").s("sine").decay(0.3).sustain(0)
```

### Triangle Wave
Soft, mellow tone with odd harmonics that decrease rapidly.

```javascript
note("c3").s("triangle")
note("c3 e3 g3").s("triangle").attack(0.1).decay(0.4)
```

### Square Wave
Hollow, woody tone with strong odd harmonics.

```javascript
note("c3").s("square")
// Alias: sqr
note("c3 e3").s("sqr").decay(0.2).sustain(0.3)
```

### Sawtooth Wave
Bright, buzzy tone with all harmonics. Great for leads and basses.

```javascript
note("c2").s("sawtooth")
// Alias: saw
note("c3 e3 g3").s("saw").cutoff(800).resonance(5)
```

### Pulse Wave
Square wave with adjustable pulse width for timbral variation.

```javascript
note("c3").s("pulse").pw(0.3)

// Parameters:
// pw       - pulse width (0-1, default 0.5)
// pwrate   - LFO rate for pulse width modulation
// pwsweep  - amount of pulse width sweep

note("c3").s("pulse").pw(0.1).pwrate(2).pwsweep(0.4)
```

---

## Advanced Synths

### Supersaw
Multiple detuned sawtooth oscillators for thick, wide sounds.

```javascript
note("c3").s("supersaw")

// Parameters:
// unison  - number of oscillators (1-16)
// detune  - amount of detuning between oscillators
// spread  - stereo spread of oscillators

note("c4 e4 g4").s("supersaw").unison(5).detune(0.2).spread(0.8)
note("c3").s("supersaw").unison(7).detune(0.15).cutoff(2000)
```

### Wavetable
Morphable wavetable synthesis for evolving timbres.

```javascript
note("c3").s("wavetable")

// Parameters:
// wt       - wavetable position (0-1)
// warp     - warp amount
// warpmode - warp mode selection

note("c3 e3 g3").s("wavetable").wt(0.5).warp(0.3)
note("c3").s("wavetable").wt("<0 0.25 0.5 0.75>").warpmode(2)
```

### Bytebeat
Algorithmic synthesis using bytebeat expressions.

```javascript
// n selects preset 0-14
note("c3").s("bytebeat").n(0)
note("c3").s("bytebeat").n(7)

// Custom expression
note("c3").s("bytebeat").byteBeatExpression("t*(t>>5|t>>8)")
```

### FM Synthesis
Frequency modulation synthesis with up to 8 operators.

```javascript
note("c3").s("sine").fm(4)

// Parameters:
// fm      - modulation index (amount of FM)
// fmh     - frequency ratio of modulator to carrier
// fmwave  - modulator waveform
// fmdecay - decay time of FM amount
// fmattack - attack time of FM amount
// fmsustain - sustain level of FM
// fmenv   - FM envelope amount

// 8 operators available for complex FM
note("c4").s("sine").fm(6).fmh(2).fmdecay(0.2)
note("c3 e3 g3").s("sine").fm(3).fmh(1).fmwave("sine")
```

---

## Noise Types

### White Noise
Full spectrum noise, equal energy at all frequencies.

```javascript
s("white").decay(0.1)
s("white").cutoff(2000).resonance(10).decay(0.3)
```

### Pink Noise
Softer noise with less high frequency content (-3dB/octave).

```javascript
s("pink").decay(0.2)
s("pink").hcutoff(200).decay(0.5)
```

### Brown Noise
Deep, rumbling noise with even less highs (-6dB/octave).

```javascript
s("brown").decay(0.3)
s("brown").cutoff(500).decay(0.8)
```

### Crackle
Random impulse noise with adjustable density.

```javascript
s("crackle")

// Parameters:
// density - frequency of crackles (higher = more frequent)

s("crackle").density(0.1)
s("crackle").density(0.5).cutoff(3000)
```

---

## Universal Synth Parameters

These parameters work with all synthesizers:

### Amplitude Envelope (ADSR)

```javascript
// attack  - time to reach peak (seconds)
// decay   - time to fall to sustain level (seconds)
// sustain - level to hold at (0-1)
// release - time to fade after note off (seconds)

note("c3").s("saw")
  .attack(0.01)
  .decay(0.2)
  .sustain(0.5)
  .release(0.3)

// Plucky sound: fast attack, short decay, no sustain
note("c3 e3 g3").s("triangle").attack(0.001).decay(0.15).sustain(0)

// Pad sound: slow attack, long release
note("c3").s("saw").attack(0.5).decay(0.3).sustain(0.7).release(1)
```

### Gain and Velocity

```javascript
// gain     - overall volume (0-1+)
// velocity - note velocity affecting volume

note("c3").s("sine").gain(0.8)
note("c3 e3 g3").s("saw").velocity("0.5 0.7 1")
```

### Low Pass Filter

```javascript
// cutoff    - filter cutoff frequency in Hz (alias: lpf)
// resonance - filter resonance/Q (0-20+)

note("c2").s("saw").cutoff(400).resonance(5)
note("c3").s("square").lpf(800).resonance(10)
```

### High Pass Filter

```javascript
// hcutoff - high pass filter cutoff in Hz (alias: hpf)

note("c2").s("saw").hcutoff(100)
note("c3").s("white").hpf(500).lpf(2000)
```

### Filter Envelope

```javascript
// lpenv    - filter envelope amount
// lpattack - filter envelope attack time
// lpdecay  - filter envelope decay time

note("c2").s("saw")
  .cutoff(200)
  .lpenv(4)
  .lpattack(0.01)
  .lpdecay(0.3)
```

---

## Synth Recipes

### 1. 808 Sub Bass
Deep, powerful sub bass inspired by the TR-808.

```javascript
note("c1 c1 c1 [c1 c2]")
  .s("sine")
  .lpf(150)
  .decay(0.5)
  .sustain(0.2)
  .gain(0.9)

// With pitch envelope for thump
note("c1").s("sine")
  .lpf(150)
  .decay(0.5)
  .sustain(0.1)
  .fm(2)
  .fmdecay(0.05)
```

### 2. Reese Bass
Classic D&B/dubstep bass with movement.

```javascript
note("c1 [~ c1] c1 [c1 d#1]")
  .s("saw")
  .lpf(400)
  .resonance(3)
  .decay(0.4)
  .sustain(0.6)

// With detune for width
note("c1").s("supersaw")
  .unison(2)
  .detune(0.1)
  .lpf(400)
  .resonance(5)
  .decay(0.5)
```

### 3. Acid Bass
Classic TB-303 style acid bass with squelchy filter.

```javascript
note("c2 c2 e2 [c2 g2]")
  .s("saw")
  .lpf(sine.range(300, 2000).slow(2))
  .resonance(15)
  .decay(0.2)
  .sustain(0.1)

// Alternative with filter envelope
note("c2 c2 [c2 d#2] c2")
  .s("saw")
  .cutoff(300)
  .lpenv(6)
  .lpdecay(0.15)
  .resonance(18)
  .decay(0.25)
```

### 4. FM Pluck
Bright, percussive FM pluck sound.

```javascript
note("c4 e4 g4 c5")
  .s("sine")
  .fm(6)
  .fmh(1)
  .fmdecay(0.15)
  .decay(0.3)
  .sustain(0)

// Bell-like variation
note("c4 e4 g4 b4")
  .s("sine")
  .fm(8)
  .fmh(2.5)
  .fmdecay(0.4)
  .decay(0.8)
  .sustain(0)
```

### 5. Supersaw Lead
Massive trance/EDM lead sound.

```javascript
note("c4 e4 g4 c5")
  .s("supersaw")
  .unison(5)
  .detune(0.2)
  .spread(0.7)
  .cutoff(3000)
  .attack(0.05)
  .release(0.3)

// With filter movement
note("c4 ~ e4 ~ g4 ~ c5 ~")
  .s("supersaw")
  .unison(7)
  .detune(0.15)
  .lpf(sine.range(1000, 4000).slow(4))
  .resonance(3)
```

### 6. Pluck Synth
Simple, clean pluck sound.

```javascript
note("c4 e4 g4 c5 g4 e4")
  .s("triangle")
  .decay(0.15)
  .sustain(0)
  .release(0.1)

// With slight filter
note("c3 g3 c4 e4")
  .s("triangle")
  .lpf(2000)
  .decay(0.2)
  .sustain(0)
  .gain(0.7)
```

---

## Quick Reference Table

| Synth | Best For | Key Parameters |
|-------|----------|----------------|
| sine | Sub bass, clean tones | fm, fmh |
| triangle | Soft leads, plucks | attack, decay |
| square/sqr | Hollow bass, chiptune | cutoff, resonance |
| sawtooth/saw | Leads, bass, pads | cutoff, resonance |
| pulse | Evolving timbres | pw, pwrate, pwsweep |
| supersaw | Big leads, EDM | unison, detune, spread |
| wavetable | Evolving sounds | wt, warp, warpmode |
| bytebeat | Glitchy, experimental | n (0-14), byteBeatExpression |
| white | Percussion, FX | cutoff, decay |
| pink | Softer percussion | cutoff, decay |
| brown | Rumble, wind | cutoff, decay |
| crackle | Vinyl, fire FX | density |

---

## Tips

1. **Layer synths** - Combine a sine sub with a saw mid for full bass
2. **Filter movement** - Use `lpf(sine.range(x, y))` for evolving sounds
3. **Stereo width** - Supersaw's `spread` parameter adds width
4. **FM for attack** - Short `fmdecay` adds punch to sine waves
5. **Resonance carefully** - High values can be harsh, start around 5-10
