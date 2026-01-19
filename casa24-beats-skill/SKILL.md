---
name: casa24-beats
description: |
  Experiencia de beatmaking con Strudel.cc para Casa 24 Records.
  Usar cuando el usuario quiera crear beats (trap, reggaeton, house,
  drill, lo-fi, dembow), programar drums 808/909, diseñar sonidos,
  o aprender pattern programming. Incluye catálogo completo de
  synths, drums, efectos, y templates por género.
---

# Casa 24 Beats

> **Beatmaking con Strudel.cc** | Verde Neón `#00FF41` | Negro `#0a0a0a`

Sistema de producción musical para Casa 24 Records. Crea beats profesionales usando live coding con Strudel.

---

## Quick Start: Trap Beat (140 BPM)

```javascript
// Casa 24 - Trap Template
setcps(140/60/4)

// Kick pattern - hard hitting 808
$: s("bd:5 ~ ~ bd:5 ~ ~ bd:5 ~")
  .bank("RolandTR808")
  .gain(1.2)
  .lpf(200)

// Snare on 2 and 4
$: s("~ sd ~ sd")
  .bank("RolandTR808")
  .gain(0.9)

// Hi-hats with rolls
$: s("hh*4 hh*8 hh*4 hh*16")
  .bank("RolandTR808")
  .gain(0.6)
  .pan(sine.range(0.3, 0.7))

// 808 Bass - Sub frequencies
$: note("c1 ~ ~ c1 ~ eb1 ~ ~")
  .s("sawtooth")
  .lpf(80)
  .gain(1.5)
  .decay(0.3)
  .sustain(0)
```

---

## Genre Selection

| Género | BPM | Archivo | Características |
|--------|-----|---------|-----------------|
| **Trap** | 140 | [recipes/trap.md](recipes/trap.md) | 808 sub bass, hi-hat rolls, dark melodies |
| **Reggaeton** | 95 | [recipes/reggaeton.md](recipes/reggaeton.md) | Dembow rhythm, perreo bass, brass stabs |
| **House** | 125 | [recipes/house.md](recipes/house.md) | Four-on-floor, disco samples, sidechain |
| **Lo-Fi Hip-Hop** | 80 | [recipes/lofi.md](recipes/lofi.md) | Vinyl crackle, jazz chords, tape wobble |
| **UK Drill** | 142 | [recipes/drill.md](recipes/drill.md) | Sliding 808s, triplet hats, dark pads |
| **Dembow** | 115 | [recipes/dembow.md](recipes/dembow.md) | Caribbean percussion, reggaeton fusion |

---

## Core References

| Referencia | Archivo | Contenido |
|------------|---------|-----------|
| Sintetizadores | [synths-catalog.md](synths-catalog.md) | Todos los synths disponibles, parámetros, ejemplos |
| Drums & 808s | [drums-808s.md](drums-808s.md) | Bancos de drums, samples, layering techniques |
| Efectos | [effects-guide.md](effects-guide.md) | Reverb, delay, distortion, filters, modulación |
| Patterns | [pattern-cheatsheet.md](pattern-cheatsheet.md) | Mini-notation, euclidean rhythms, transformations |

---

## Essential Code Examples

### Drum Bank Selection

```javascript
// Usar banco TR-808
$: s("bd sd hh oh")
  .bank("RolandTR808")

// Usar banco TR-909
$: s("bd sd hh oh")
  .bank("RolandTR909")

// Bancos disponibles:
// RolandTR808, RolandTR909, RolandTR707
// AkaiLinn, EmuDrumulator, OberheimDMX
```

### 808 Bass Techniques

```javascript
// 808 Sub Bass básico
$: note("c1 ~ eb1 ~")
  .s("sawtooth")
  .lpf(60)
  .gain(1.4)
  .decay(0.5)
  .sustain(0)

// 808 con slide/glide
$: note("c1 ~ [c1 eb1] ~")
  .s("sawtooth")
  .lpf(80)
  .glide(0.1)
  .gain(1.3)

// 808 distorsionado (Drill style)
$: note("c1 ~ ~ c1 eb1 ~ ~ ~")
  .s("sawtooth")
  .lpf(120)
  .distort(0.4)
  .gain(1.2)
```

### Hi-Hat Patterns

```javascript
// Hi-hats básicos
$: s("hh*8")
  .bank("RolandTR808")
  .gain(0.5)

// Hi-hat rolls (trap style)
$: s("hh*4 hh*8 hh*4 hh*16")
  .bank("RolandTR808")
  .gain(0.6)
  .pan(sine.range(0.3, 0.7))

// Open/Closed alternating
$: s("[hh hh hh oh]*2")
  .bank("RolandTR808")
  .gain(0.55)

// Triplet feel (drill)
$: s("hh*12")
  .bank("RolandTR808")
  .gain(0.5)
  .euclidLegato(7, 12)
```

### Sidechain Ducking

```javascript
// Sidechain compression effect
// El pad duckea cuando entra el kick

$: s("bd ~ ~ bd ~ ~ bd ~")
  .bank("RolandTR808")
  .gain(1.2)

$: note("c3 eb3 g3 bb3")
  .s("supersaw")
  .lpf(800)
  .gain(sine.range(0.2, 0.8).fast(2))  // Simula sidechain
  .room(0.3)
```

---

## Output Format Guidelines

Cuando generes código Strudel para el usuario:

### Estructura del código

```javascript
// Casa 24 - [Nombre del Beat] - [Género]
// BPM: [valor]

setcps([bpm]/60/4)

// === DRUMS ===
$: s("...").bank("...").gain(...)  // Kick
$: s("...").bank("...").gain(...)  // Snare
$: s("...").bank("...").gain(...)  // Hi-hats

// === BASS ===
$: note("...").s("...").lpf(...)

// === MELODÍA/ARMONÍA ===
$: note("...").s("...").fx(...)
```

### Reglas de formato

1. **Siempre incluir BPM** con `setcps(bpm/60/4)`
2. **Comentar cada sección** (drums, bass, melody)
3. **Usar bancos reales** - verificar en drums-808s.md
4. **Gains balanceados**:
   - Kick: 1.0-1.3
   - Snare: 0.8-1.0
   - Hi-hats: 0.5-0.7
   - Bass: 1.2-1.5
   - Melodías: 0.6-0.8
5. **Código copiable** - el usuario debe poder pegar directo en Strudel.cc

### Ejemplo de respuesta

Cuando el usuario pida un beat, responder así:

```
## Tu Beat: [Nombre]

**Género:** Trap | **BPM:** 140

[código Strudel completo]

### Modificaciones sugeridas:
- Cambiar `hh*8` a `hh*16` para más rolls
- Subir `lpf` del bass a 100 para más presencia
- Agregar `.room(0.2)` al snare para espacialidad
```

---

## Casa 24 Records

```
   ██████╗ █████╗ ███████╗ █████╗     ██████╗ ██╗  ██╗
  ██╔════╝██╔══██╗██╔════╝██╔══██╗    ╚════██╗██║  ██║
  ██║     ███████║███████╗███████║     █████╔╝███████║
  ██║     ██╔══██║╚════██║██╔══██║    ██╔═══╝ ╚════██║
  ╚██████╗██║  ██║███████║██║  ██║    ███████╗     ██║
   ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝     ╚═╝
```

> *Verde Neón (#00FF41) sobre Negro (#0a0a0a)*
>
> Beatmaking. Live Coding. Future Sound.
