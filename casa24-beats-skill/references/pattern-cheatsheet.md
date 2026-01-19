# Pattern Cheatsheet 🎛️

A comprehensive reference for Strudel mini-notation and pattern transforms.

---

## Mini-Notation Basics

| Symbol | Name | Description | Example |
|--------|------|-------------|---------|
| `*` | Multiply | Repeat element n times | `"bd*4"` = 4 kicks per cycle |
| `/` | Divide | Slow down by factor n | `"bd/2"` = 1 kick every 2 cycles |
| `@` | Elongate | Stretch duration | `"bd@3 sd"` = bd takes 3/4, sd takes 1/4 |
| `!` | Replicate | Copy element n times | `"bd!3"` = `"bd bd bd"` |
| `?` | Degrade | Random 50% chance to play | `"bd?"` = sometimes plays |
| `[]` | Grouping | Group elements together | `"[bd sd]*2"` = "bd sd bd sd" |
| `<>` | Alternating | Cycle through options | `"<bd sd hh>"` = different each cycle |
| `,` | Parallel | Play simultaneously | `"[bd, hh*4]"` = layer patterns |

### Copy-Paste Examples

```javascript
// Basic multiplication - 4 kicks per cycle
$: s("bd*4")

// Division - kick every 2 cycles
$: s("bd/2")

// Elongation - uneven timing
$: s("bd@3 sd@1")

// Replication vs Multiplication
$: s("bd!3 sd")      // "bd bd bd sd" - evenly spaced
$: s("bd*3 sd")      // 3 bds squeezed into first slot

// Grouping with operations
$: s("[bd sd hh]*2")

// Alternating patterns
$: s("<bd sd> hh hh hh")

// Parallel layers
$: s("[bd sd bd sd, hh*8, ~ cp ~ cp]")
```

---

## Euclidean Rhythms

Euclidean rhythms distribute n pulses across k steps as evenly as possible.

**Syntax:** `element(pulses, steps)` or `element(pulses, steps, rotation)`

### Common Euclidean Patterns

| Pattern | Name/Origin | Feel | Visual |
|---------|-------------|------|--------|
| `(2,3)` | | Basic triplet | `[X . X]` |
| `(3,4)` | Waltz | Triple meter | `[X . X X]` |
| `(2,5)` | | Khafif-e-ramal | `[X . X . .]` |
| `(3,5)` | | Naïve 3/5 | `[X . X . X]` |
| `(3,7)` | | | `[X . X . X . .]` |
| `(3,8)` | Tresillo/Cuban | Latin groove | `[X . . X . . X .]` |
| `(4,7)` | | Ruchenitza | `[X . X . X . X]` |
| `(5,8)` | Cinquillo | Afro-Cuban | `[X . X X . X X .]` |
| `(5,9)` | | Agsag-Samai | `[X . X . X . X . X]` |
| `(5,12)` | | | `[X . . X . X . . X . X .]` |
| `(7,8)` | | Dense pattern | `[X X X X X X X .]` |
| `(7,12)` | West African | Bell pattern | `[X . X X . X . X X . X .]` |
| `(7,16)` | | Brazilian | `[X . X . X . X . X . X . X . X .]` |
| `(9,16)` | | | `[X . X X . X . X X . X . X X . X]` |
| `(11,16)` | | Dense clave | `[X X . X X . X X . X X . X X . X]` |
| `(13,24)` | | Complex African | Complex polyrhythm |

### Copy-Paste Examples

```javascript
// Classic Tresillo bass
$: s("bd(3,8)")

// Cuban Cinquillo rhythm
$: s("rim(5,8)")

// West African bell pattern
$: s("bell(7,12)")

// Waltz feel
$: s("bd(3,4)")

// With rotation (offset the pattern)
$: s("bd(3,8,1)")  // Rotated by 1 step
$: s("bd(3,8,2)")  // Rotated by 2 steps

// Layered Euclidean polyrhythm
$: s("[bd(3,8), hh(5,8), cp(2,8)]")

// Evolving Euclidean
$: s("bd(<3 5 7>,8)")  // Changes pulses each cycle
```

---

## Pattern Transforms

### Time Manipulation

| Function | Description | Example |
|----------|-------------|---------|
| `fast(n)` | Speed up by factor n | `.fast(2)` = double speed |
| `slow(n)` | Slow down by factor n | `.slow(2)` = half speed |
| `hurry(n)` | Fast + pitch shift | `.hurry(2)` = fast & high |
| `stretch(n)` | Stretch to n cycles | `.stretch(4)` |
| `early(n)` | Shift earlier in time | `.early(0.25)` |
| `late(n)` | Shift later in time | `.late(0.125)` |

```javascript
// Speed manipulation
$: s("bd sd hh cp").fast(2)
$: s("bd sd hh cp").slow(2)

// Gradual speedup
$: s("bd sd hh cp").fast("<1 2 4>")

// Time shifting
$: s("cp").late(0.01)  // Slight humanize delay
```

### Pattern Manipulation

| Function | Description | Example |
|----------|-------------|---------|
| `rev` | Reverse pattern | `.rev` |
| `palindrome` | Forward then backward | `.palindrome` |
| `iter(n)` | Rotate pattern each cycle | `.iter(4)` |
| `iter2(n)` | iter in opposite direction | `.iter2(4)` |
| `chunk(n,fn)` | Apply fn to nth chunk | `.chunk(4, rev)` |
| `shuffle(n)` | Randomly reorder n parts | `.shuffle(4)` |

```javascript
// Reverse
$: n("0 1 2 3").s("piano").rev

// Iteration - shifts starting point each cycle
$: s("bd sd hh cp").iter(4)
// cycle 1: bd sd hh cp
// cycle 2: sd hh cp bd
// cycle 3: hh cp bd sd
// cycle 4: cp bd sd hh

// Palindrome
$: s("bd sd hh cp").palindrome
```

### Conditional Transforms

| Function | Description | Example |
|----------|-------------|---------|
| `every(n, fn)` | Apply fn every n cycles | `.every(4, rev)` |
| `every(n, fn, m)` | Offset by m cycles | `.every(4, rev, 2)` |
| `when(test, fn)` | Apply fn when test true | `.when(c => c%2==0, fast(2))` |
| `firstOf(n, fn)` | Apply fn on first of n | `.firstOf(4, rev)` |
| `lastOf(n, fn)` | Apply fn on last of n | `.lastOf(4, rev)` |

```javascript
// Every 4th cycle, reverse
$: s("bd sd hh cp").every(4, rev)

// Every 3rd cycle, double speed
$: s("bd sd hh cp").every(3, fast(2))

// First of every 4, add distortion
$: s("bd sd hh cp").firstOf(4, x => x.distort(0.5))

// Combine multiple
$: s("bd sd hh cp")
  .every(4, rev)
  .every(3, fast(2))
```

### Stereo & Space

| Function | Description | Example |
|----------|-------------|---------|
| `jux(fn)` | Split stereo, fn on right | `.jux(rev)` |
| `juxBy(n, fn)` | jux with stereo width | `.juxBy(0.5, rev)` |
| `pan(n)` | Stereo position 0-1 | `.pan(0.25)` |

```javascript
// Classic jux reversal - creates stereo movement
$: s("bd sd hh cp").jux(rev)

// Subtle jux
$: s("bd sd hh cp").juxBy(0.3, fast(2))

// Auto-pan
$: s("hh*8").pan(sine)
```

---

## Combining Patterns

### Stack & Cat

| Function | Description |
|----------|-------------|
| `stack()` | Play patterns simultaneously (layering) |
| `cat()` | Play patterns in sequence (one per cycle) |
| `fastcat()` | All patterns in one cycle |
| `slowcat()` | Same as cat() |
| `randcat()` | Random pattern each cycle |

```javascript
// Stack - all at once (same as , in mini-notation)
$: stack(
  s("bd*4"),
  s("~ cp"),
  s("hh*8")
)

// Cat - sequence through cycles
$: cat(
  s("bd*4"),
  s("bd*8"),
  s("bd*16")
)

// Fastcat - all in one cycle
$: fastcat(
  s("bd*2"),
  s("hh*4"),
  s("cp")
)

// Random selection each cycle
$: randcat(
  s("bd sd bd sd"),
  s("bd bd cp bd"),
  s("bd ~ bd cp")
)
```

---

## Random & Probability

### Random Values

| Function | Description | Range |
|----------|-------------|-------|
| `rand` | Random float | 0 to 1 |
| `irand(n)` | Random integer | 0 to n-1 |
| `perlin` | Smooth random (Perlin noise) | 0 to 1 |

```javascript
// Random filter cutoff
$: s("bd*4").lpf(rand.range(200, 2000))

// Random notes
$: n(irand(8)).s("piano")

// Smooth random panning
$: s("hh*8").pan(perlin)
```

### Choice Functions

| Function | Description | Example |
|----------|-------------|---------|
| `choose()` | Pick randomly from list | `choose("bd", "sd", "hh")` |
| `wchoose()` | Weighted random choice | `wchoose(["bd",4], ["sd",1])` |
| `chooseInWith(fn)` | Deterministic choice | |

```javascript
// Random sound each event
$: s(choose("bd", "sd", "hh", "cp")).fast(4)

// Weighted - bd 80%, sd 20%
$: s(wchoose(["bd", 0.8], ["sd", 0.2])).fast(4)
```

### Degradation (Random Muting)

| Function | Description | Example |
|----------|-------------|---------|
| `degrade` | 50% random mute | `.degrade` |
| `degradeBy(n)` | n% chance to mute | `.degradeBy(0.3)` |
| `?` | Mini-notation degrade | `"bd?"` |
| `undegradeBy(n)` | n% chance to play | `.undegradeBy(0.7)` |

```javascript
// 50% random muting
$: s("hh*16").degrade

// 30% muting
$: s("hh*16").degradeBy(0.3)

// 70% muting
$: s("hh*16").degradeBy(0.7)

// Mini-notation version
$: s("hh*16?")
$: s("hh*16?0.3")  // With probability
```

### Sometimes Functions

| Function | Description | Probability |
|----------|-------------|-------------|
| `sometimes(fn)` | Apply fn ~50% of events | 50% |
| `often(fn)` | Apply fn ~75% of events | 75% |
| `rarely(fn)` | Apply fn ~25% of events | 25% |
| `almostNever(fn)` | Apply fn ~10% of events | 10% |
| `almostAlways(fn)` | Apply fn ~90% of events | 90% |
| `someCycles(fn)` | Apply fn ~50% of cycles | 50% |
| `someCyclesBy(n,fn)` | Apply fn n% of cycles | n% |

```javascript
// Sometimes add distortion
$: s("bd*4").sometimes(x => x.distort(0.5))

// Often pitch up
$: s("bd*4").often(x => x.speed(2))

// Rarely add reverb
$: s("hh*8").rarely(x => x.room(0.8))

// Some cycles double speed
$: s("bd sd hh cp").someCycles(fast(2))

// 30% of cycles, reverse
$: s("bd sd hh cp").someCyclesBy(0.3, rev)
```

---

## Tempo & Time

### Setting Tempo

```javascript
// setcps = cycles per second
// Formula: cps = bpm / 60 / 4 (for 4/4 time)

setcps(0.5)           // 120 BPM (default)
setcps(70/60/4)       // 70 BPM
setcps(90/60/4)       // 90 BPM
setcps(120/60/4)      // 120 BPM
setcps(140/60/4)      // 140 BPM
setcps(160/60/4)      // 160 BPM

// Half-time feel (2 beats per cycle instead of 4)
setcps(140/60/2)      // 140 BPM half-time
```

### Common BPM Reference

| BPM | CPS (4 beats/cycle) | CPS (2 beats/cycle) |
|-----|---------------------|---------------------|
| 60 | `setcps(60/60/4)` = 0.25 | `setcps(60/60/2)` = 0.5 |
| 70 | `setcps(70/60/4)` ≈ 0.29 | `setcps(70/60/2)` ≈ 0.58 |
| 90 | `setcps(90/60/4)` = 0.375 | `setcps(90/60/2)` = 0.75 |
| 120 | `setcps(120/60/4)` = 0.5 | `setcps(120/60/2)` = 1.0 |
| 140 | `setcps(140/60/4)` ≈ 0.58 | `setcps(140/60/2)` ≈ 1.17 |
| 160 | `setcps(160/60/4)` ≈ 0.67 | `setcps(160/60/2)` ≈ 1.33 |
| 180 | `setcps(180/60/4)` = 0.75 | `setcps(180/60/2)` = 1.5 |

---

## Visual Pattern Reference

Understanding how patterns translate to rhythms:

```
Basic Patterns:
"bd"           = [X . . . . . . . . . . . . . . .]  (1 hit per cycle)
"bd bd"        = [X . . . . . . . X . . . . . . .]  (2 hits per cycle)
"bd*4"         = [X . . . X . . . X . . . X . . .]  (4 hits per cycle)
"bd*8"         = [X . X . X . X . X . X . X . X .]  (8 hits per cycle)
"bd*16"        = [X X X X X X X X X X X X X X X X]  (16 hits per cycle)

Rests:
"bd ~ bd ~"    = [X . . . . . . . X . . . . . . .]  (2 kicks with rests)
"bd ~ ~ ~"     = [X . . . . . . . . . . . . . . .]  (1 kick then silence)

Grouping:
"[bd sd] hh"   = [X S . . . . . . H . . . . . . .]  (bd+sd in first half)
"[bd sd]*2"    = [X S . . X S . . . . . . . . . .]  (group repeated)

Alternating (across cycles):
"<bd sd>"      = Cycle 1: [X . . . . . . . . . . . . . . .]
                 Cycle 2: [S . . . . . . . . . . . . . . .]
                 Cycle 3: [X . . . . . . . . . . . . . . .]

"<bd sd hh>"   = Cycle 1: bd, Cycle 2: sd, Cycle 3: hh, Cycle 4: bd...

Euclidean:
"bd(3,8)"      = [X . . X . . X .]                  (Tresillo)
"bd(5,8)"      = [X . X X . X X .]                  (Cinquillo)
"bd(7,12)"     = [X . X X . X . X X . X .]          (West African)

Parallel (simultaneous):
"[bd, hh*4]"   = bd:  [X . . . . . . . . . . . . . . .]
                 hh:  [H . . . H . . . H . . . H . . .]
                 Both play together!
```

---

## Quick Reference Card

```javascript
// ═══════════════════════════════════════════════
// MINIMAL BEAT TEMPLATE
// ═══════════════════════════════════════════════

setcps(120/60/4)  // 120 BPM

// Drums
$: s("[bd, hh*8]")
$: s("~ cp")

// Bass
$: note("<c2 g1>*2").s("sawtooth").lpf(400)

// ═══════════════════════════════════════════════
// PATTERN BUILDING BLOCKS
// ═══════════════════════════════════════════════

// Four-on-floor
$: s("bd*4")

// Offbeat hi-hats
$: s("~ hh").fast(4)

// Backbeat snare
$: s("~ sd ~ sd")

// Tresillo
$: s("bd(3,8)")

// ═══════════════════════════════════════════════
// VARIATION TECHNIQUES
// ═══════════════════════════════════════════════

// Every 4th cycle variation
$: s("bd*4").every(4, x => x.s("bd*8"))

// Random fills
$: s("bd*4").sometimes(fast(2))

// Evolving pattern
$: s("bd*<4 8 4 16>")

// Stereo width
$: s("hh*8").jux(rev)
```

---

## See Also

- [Strudel Documentation](https://strudel.cc/learn)
- [Tidal Cycles (Strudel's inspiration)](https://tidalcycles.org)
- [Mini-notation Reference](https://strudel.cc/learn/mini-notation)
