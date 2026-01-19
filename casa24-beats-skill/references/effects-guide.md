# Strudel Effects Reference Guide

Complete reference for audio effects in Strudel, organized by category with practical examples.

---

## Filters

Filters shape the frequency content of sounds. Essential for everything from bass control to sweeping transitions.

### Low-Pass Filter (LPF)

Cuts frequencies above the cutoff point. The most commonly used filter.

```javascript
// Basic low-pass filter at 800Hz
s("sawtooth").lpf(800)

// With resonance (Q) for emphasis at cutoff
s("sawtooth").lpf(800).lpq(5)

// Envelope-controlled filter (auto-wah effect)
s("sawtooth").lpf(200).lpenv(6).lpattack(0.01).lpdecay(0.2)

// Animated filter sweep
s("sawtooth").lpf(sine.range(200, 4000).slow(4))

// Pattern the cutoff frequency
s("sawtooth").lpf("<400 800 1600 3200>")
```

**Parameters:**
- `lpf(freq)` - Cutoff frequency in Hz (20-20000)
- `lpq(resonance)` - Resonance/Q factor (0.1-20, default ~1)
- `lpenv(amount)` - Envelope modulation depth (semitones)
- `lpattack(seconds)` - Filter envelope attack time
- `lpdecay(seconds)` - Filter envelope decay time

### High-Pass Filter (HPF)

Cuts frequencies below the cutoff point. Great for removing muddiness.

```javascript
// Remove low frequencies
s("breaks").hpf(200)

// High-pass with resonance
s("breaks").hpf(400).hpq(4)

// Rising filter effect
s("breaks").hpf(sine.range(100, 2000).slow(8))

// Clean up a mix by removing sub frequencies
s("pad").hpf(80)
```

**Parameters:**
- `hpf(freq)` - Cutoff frequency in Hz
- `hpq(resonance)` - Resonance/Q factor

### Band-Pass Filter (BPF)

Allows only frequencies around the cutoff through. Creates telephone/radio effects.

```javascript
// Narrow band-pass for vocal effect
s("vocals").bpf(1000).bpq(10)

// Sweeping band-pass
s("noise").bpf(sine.range(200, 4000).slow(2)).bpq(8)

// Pattern the center frequency
s("breaks").bpf("<500 1000 2000 4000>").bpq(5)
```

**Parameters:**
- `bpf(freq)` - Center frequency in Hz
- `bpq(resonance)` - Bandwidth (higher = narrower)

### Filter Types

Different filter algorithms with distinct characters.

```javascript
// Standard 12dB/octave (gentle slope)
s("sawtooth").lpf(800).ftype("12db")

// Steeper 24dB/octave (more aggressive)
s("sawtooth").lpf(800).ftype("24db")

// Moog-style ladder filter (warm, classic)
s("sawtooth").lpf(800).ftype("ladder")
```

**Available types:** `'12db'`, `'24db'`, `'ladder'`

---

## Distortion

Distortion adds harmonics and grit. Nine distinct algorithms for different flavors.

### Distortion Types Reference

| Type | Index | Character | Best For |
|------|-------|-----------|----------|
| `scurve` | 0 | Soft saturation | Subtle warmth |
| `soft` | 1 | Tape warmth | Vintage feel |
| `hard` | 2 | Aggressive clipping | Intense sounds |
| `cubic` | 3 | Smooth overdrive | Guitar-like |
| `diode` | 4 | Asymmetric | Transistor crunch |
| `asym` | 5 | Tube-like | Amp simulation |
| `fold` | 6 | Wavefolding | Synth textures |
| `sinefold` | 7 | Smooth folding | Complex harmonics |
| `chebyshev` | 8 | Harmonic-rich | Bright overtones |

### Usage Examples

```javascript
// Basic distortion (default type)
s("sawtooth").distort(0.5)

// Specify distortion type by name
s("sawtooth").distort(0.4).distorttype("soft")

// Specify by index
s("sawtooth").distort(0.4).distorttype(1)

// Tape-style warmth
s("piano").distort(0.2).distorttype("soft")

// Aggressive hard clipping
s("kick").distort(0.8).distorttype("hard")

// Wavefolding for synth textures
s("sine").distort(0.6).distorttype("fold")

// Tube amp simulation
s("guitar").distort(0.5).distorttype("asym")

// Pattern distortion amount
s("sawtooth").distort("<0.1 0.3 0.5 0.7>").distorttype("cubic")

// Combine with filter for shaped distortion
s("sawtooth").lpf(2000).distort(0.4).distorttype("soft")
```

### Distortion Tips

```javascript
// Pre-filter then distort (cleaner result)
s("bass").lpf(500).distort(0.5)

// Distort then filter (warmer result)
s("bass").distort(0.5).lpf(2000)

// Parallel distortion effect (mix clean and dirty)
stack(
  s("bass"),
  s("bass").distort(0.6).gain(0.5)
)
```

---

## Time Effects

### Delay

Echo and delay effects synchronized to tempo or in absolute time.

```javascript
// Basic delay (wet amount 0-1)
s("hh*4").delay(0.5)

// Control delay time in seconds
s("hh*4").delay(0.5).delaytime(0.25)

// Add feedback for repeating echoes
s("hh*4").delay(0.5).delaytime(0.25).delayfeedback(0.6)

// Tempo-synced delay (cycles)
s("hh*4").delay(0.5).delaysync(0.5)  // Half-cycle delay

// Dotted delay for rhythmic interest
s("hh*4").delay(0.4).delaysync(0.375)

// Ping-pong style with panning
s("hh*4").delay(0.5).delaytime(0.2).delayfeedback(0.5).pan(rand)

// Dub delay (long feedback, filtered)
s("rim").delay(0.6).delaysync(0.75).delayfeedback(0.7).lpf(2000)
```

**Parameters:**
- `delay(wet)` - Wet/dry mix (0-1)
- `delaytime(seconds)` - Delay time in seconds
- `delaysync(cycles)` - Delay time in cycles (tempo-synced)
- `delayfeedback(amount)` - Feedback amount (0-0.98, avoid 1.0!)

### Reverb (Room)

Spatial ambience from small rooms to vast halls.

```javascript
// Basic reverb
s("snare").room(0.5)

// Large hall
s("snare").room(0.7).roomsize(8)

// Small tight room
s("snare").room(0.4).roomsize(2)

// Damped reverb (darker)
s("snare").room(0.5).roomsize(5).roomlp(3000)

// Bright reverb
s("snare").room(0.5).roomsize(5).roomdim(8000)

// Ambient pad with huge reverb
s("pad").room(0.8).roomsize(10).roomlp(2000)

// Gated reverb effect
s("snare").room(0.9).roomsize(3).shape(0.8)
```

**Parameters:**
- `room(wet)` - Wet/dry mix (0-1)
- `roomsize(size)` - Room size (1-10)
- `roomlp(freq)` - Low-pass filter on reverb
- `roomdim(freq)` - High frequency damping

---

## Dynamics

### Compressor

Controls dynamic range for punch and consistency.

```javascript
// Basic compression
s("drums").compressor(-20)

// Aggressive compression with ratio
s("drums").compressor(-15).compressorRatio(8)

// Gentle compression for glue
s("mix").compressor(-10).compressorRatio(2)

// Limiting (very high ratio)
s("bass").compressor(-6).compressorRatio(20)

// Parallel compression (New York style)
stack(
  s("drums"),
  s("drums").compressor(-30).compressorRatio(10).gain(0.5)
)
```

**Parameters:**
- `compressor(threshold)` - Threshold in dB (negative values)
- `compressorRatio(ratio)` - Compression ratio (1-20)

### Ducking (Sidechain)

Automatic volume ducking triggered by another orbit.

```javascript
// Classic sidechain pump
// Kick on orbit 0
s("kick").orbit(0)

// Pad ducked by orbit 0
s("pad").orbit(1).duckorbit(0).duckdepth(0.8)

// Adjust attack and release
s("pad").orbit(1).duckorbit(0).duckdepth(0.7).duckattack(0.01).duckrelease(0.2)

// Extreme pumping effect
s("bass").orbit(1).duckorbit(0).duckdepth(1).duckrelease(0.1)

// Subtle ducking for clarity
s("synth").orbit(1).duckorbit(0).duckdepth(0.3).duckrelease(0.3)
```

**Parameters:**
- `duckorbit(n)` - Which orbit triggers ducking
- `duckdepth(amount)` - How much to duck (0-1)
- `duckattack(seconds)` - How fast ducking engages
- `duckrelease(seconds)` - How fast volume recovers

---

## Modulation

### Tremolo

Volume modulation for pulsing effects.

```javascript
// Basic tremolo
s("pad").tremolo(4)  // 4Hz rate

// Deep tremolo
s("pad").tremolo(8).tremolodepth(1)

// Subtle tremolo
s("pad").tremolo(2).tremolodepth(0.3)

// Sync to tempo (approximate)
s("pad").tremolo(4).tremolodepth(0.7)
```

**Parameters:**
- `tremolo(rate)` - Modulation rate in Hz
- `tremolodepth(depth)` - Modulation depth (0-1)

### Phaser

Sweeping comb filter effect.

```javascript
// Classic phaser
s("guitar").phaser(0.5)

// Deep slow phaser
s("guitar").phaser(0.2).phaserdepth(1)

// Fast subtle phaser
s("synth").phaser(2).phaserdepth(0.3)

// Adjust center frequency
s("synth").phaser(0.5).phaserdepth(0.7).phasercenter(1000)
```

**Parameters:**
- `phaser(rate)` - Sweep rate in Hz
- `phaserdepth(depth)` - Effect depth (0-1)
- `phasercenter(freq)` - Center frequency

### Vibrato

Pitch modulation for natural movement.

```javascript
// Subtle vibrato
s("sine").note("c4").vib(5).vibmod(0.1)

// Wide vibrato
s("sine").note("c4").vib(6).vibmod(0.5)

// Slow dramatic vibrato
s("pad").vib(3).vibmod(0.3)

// Fast intense vibrato
s("lead").vib(8).vibmod(0.2)
```

**Parameters:**
- `vib(rate)` - Vibrato rate in Hz
- `vibmod(semitones)` - Pitch deviation in semitones

---

## Lo-Fi Effects

### Bit Crushing

Reduces bit depth for digital degradation.

```javascript
// Subtle bit reduction
s("breaks").crush(12)

// Heavy 8-bit style
s("breaks").crush(8)

// Extreme destruction
s("breaks").crush(4)

// Classic lo-fi (12-bit)
s("piano").crush(12).lpf(4000)

// Pattern the crush amount
s("breaks").crush("<16 12 8 4>")
```

**Parameters:**
- `crush(bits)` - Bit depth (1-16, lower = more crushed)

### Sample Rate Reduction

Reduces effective sample rate for aliasing artifacts.

```javascript
// Subtle reduction
s("breaks").coarse(2)

// Noticeable degradation
s("breaks").coarse(8)

// Extreme lo-fi
s("breaks").coarse(32)

// Combine with bit crush
s("breaks").crush(10).coarse(4)
```

**Parameters:**
- `coarse(factor)` - Reduction factor (higher = more degraded)

---

## Genre Effect Chains

### Trap / 808 Bass

```javascript
// Classic 808 with warmth
s("808").lpf(150).distort(0.2).distorttype("soft")

// Punchy 808 with sub focus
s("808").lpf(80).hpf(30).compressor(-10)

// Distorted 808 for harder tracks
s("808").lpf(200).distort(0.4).distorttype("hard")

// 808 with room ambience
s("808").lpf(120).room(0.1).roomsize(2)
```

### House / Techno

```javascript
// Glued drums
s("kick, hh*4, ~ snare").compressor(-8).room(0.3)

// Classic house organ
s("organ").lpf(2000).room(0.4).delay(0.2).delaysync(0.5)

// Driving bass
s("bass").lpf(1000).distort(0.15).compressor(-12)

// Pumping pad (needs kick on orbit 0)
s("pad").orbit(1).duckorbit(0).duckdepth(0.7).room(0.5)
```

### Lo-Fi Hip Hop

```javascript
// Classic lo-fi treatment
s("piano").lpf(3000).crush(12).room(0.2)

// Dusty drums
s("breaks").lpf(4000).crush(10).coarse(2).room(0.15)

// Vinyl warmth simulation
s("sample").lpf(6000).hpf(60).distort(0.1).distorttype("soft")

// Warbly keys
s("keys").lpf(2500).vib(0.3).vibmod(0.05).room(0.25)
```

### UK Drill

```javascript
// Sliding 808 with filter movement
s("808").lpf(sine.range(200, 1000).slow(2)).distort(0.15)

// Drill hi-hats
s("hh*8").hpf(8000).delay(0.2).delaysync(0.125)

// Dark pad atmosphere
s("pad").lpf(500).room(0.6).roomsize(8).roomlp(1000)

// Punchy snare
s("snare").hpf(200).compressor(-15).room(0.2).roomsize(3)
```

### Ambient / Atmospheric

```javascript
// Huge reverb pad
s("pad").room(0.9).roomsize(10).roomlp(2000).delay(0.3).delaysync(1)

// Shimmering texture
s("sine").note("c4 e4 g4").room(0.8).delay(0.5).delayfeedback(0.7).phaser(0.1)

// Distant piano
s("piano").lpf(1500).room(0.7).roomsize(9).gain(0.5)

// Evolving drone
s("drone").lpf(sine.range(500, 3000).slow(16)).phaser(0.05).room(0.6)
```

### Dub / Reggae

```javascript
// Classic dub delay
s("rim").delay(0.6).delaysync(0.75).delayfeedback(0.7).lpf(2000)

// Spacey snare
s("snare").room(0.7).roomsize(7).delay(0.4).delaysync(0.5).delayfeedback(0.5)

// Dubby bass
s("bass").lpf(800).distort(0.1).room(0.2)

// Filtered delay throws
s("vocals").delay(0.8).delaysync(0.375).delayfeedback(0.6).lpf(1500).hpf(300)
```

---

## Effect Ordering Tips

The order of effects matters! Here are common approaches:

```javascript
// Filter before distortion (cleaner harmonics)
s("saw").lpf(1000).distort(0.5)

// Distortion before filter (warmer, darker)
s("saw").distort(0.5).lpf(2000)

// EQ before compression (shape, then control)
s("drums").hpf(60).lpf(12000).compressor(-12)

// Reverb last (space after processing)
s("snare").compressor(-10).room(0.4)

// Delay before reverb (echoes in space)
s("hh").delay(0.3).delayfeedback(0.4).room(0.3)

// Typical full chain
s("lead")
  .hpf(100)           // Remove mud
  .lpf(8000)          // Tame highs
  .distort(0.2)       // Add warmth
  .compressor(-15)    // Control dynamics
  .delay(0.2)         // Add echoes
  .room(0.3)          // Place in space
```

---

## Quick Reference Card

| Effect | Parameters | Range | Example |
|--------|------------|-------|---------|
| **lpf** | freq, lpq, lpenv, lpattack, lpdecay | 20-20000Hz | `.lpf(800).lpq(5)` |
| **hpf** | freq, hpq | 20-20000Hz | `.hpf(200).hpq(3)` |
| **bpf** | freq, bpq | 20-20000Hz | `.bpf(1000).bpq(8)` |
| **distort** | amount, distorttype | 0-1 | `.distort(0.5).distorttype("soft")` |
| **delay** | wet, delaytime, delayfeedback, delaysync | 0-1, seconds, cycles | `.delay(0.5).delaysync(0.5)` |
| **room** | wet, roomsize, roomlp, roomdim | 0-1, 1-10, Hz | `.room(0.5).roomsize(5)` |
| **compressor** | threshold, compressorRatio | dB, ratio | `.compressor(-15).compressorRatio(4)` |
| **ducking** | duckorbit, duckdepth, duckattack | orbit#, 0-1, seconds | `.duckorbit(0).duckdepth(0.7)` |
| **tremolo** | rate, tremolodepth | Hz, 0-1 | `.tremolo(4).tremolodepth(0.5)` |
| **phaser** | rate, phaserdepth, phasercenter | Hz, 0-1, Hz | `.phaser(0.5).phaserdepth(0.7)` |
| **vib** | rate, vibmod | Hz, semitones | `.vib(5).vibmod(0.2)` |
| **crush** | bits | 1-16 | `.crush(8)` |
| **coarse** | factor | 1-64 | `.coarse(4)` |
