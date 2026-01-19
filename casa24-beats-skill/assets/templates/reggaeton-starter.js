// Reggaeton Starter - Casa 24 Beats
// BPM: 95 (classic dembow tempo)
// Iconic dembow riddim with punchy kicks and snappy snares
setcps(95/60/2)

stack(
  // Kick - dembow pattern (boom-ch-boom-ch feel)
  s("bd ~ ~ bd ~ ~ bd ~")
    .bank("RolandTR808")
    .gain(1.1),

  // Snare - the signature dembow accent
  s("~ ~ ~ sd ~ ~ ~ sd")
    .bank("RolandTR808")
    .gain(0.85)
    .room(0.15),

  // Rimshot - adds the reggaeton click
  s("~ rim ~ ~ ~ rim ~ ~")
    .bank("RolandTR808")
    .gain(0.6),

  // Hi-hats - steady 8ths with accent variation
  s("hh*8")
    .bank("RolandTR808")
    .gain("[0.5 0.3 0.5 0.4 0.5 0.3 0.5 0.4]"),

  // Shaker layer for groove
  s("~ shaker:2 ~ shaker:2 ~ shaker:2 ~ shaker:2")
    .gain(0.25)
    .pan(0.6),

  // Bass - simple but effective root pattern
  note("[g1 ~ ~ g1 ~ ~ g1 ~]")
    .s("sawtooth")
    .lpf(200)
    .decay(0.2)
    .sustain(0.1)
    .gain(0.9)
)
// Subtle room for cohesion
.room(0.08)
.size(0.3)
