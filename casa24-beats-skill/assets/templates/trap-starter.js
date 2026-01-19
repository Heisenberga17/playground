// Trap Starter - Casa 24 Beats
// BPM: 140 (half-time feel)
// Classic trap with 808s, rolling hats, and punchy snares
setcps(70/60)

stack(
  // 808 Kick - sparse, punchy pattern
  s("bd(3,8)")
    .bank("RolandTR808")
    .gain(1.2),

  // Snare on beat 3 (half-time feel)
  s("~ ~ ~ ~ sd ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.9)
    .room(0.2),

  // Hi-hats with rolls and velocity variation
  s("hh*16")
    .bank("RolandTR808")
    .gain("[0.4 0.3 0.5 0.3 0.4 0.3 1 0.3]*2")
    .pan(sine.range(0.3, 0.7).slow(4)),

  // Open hat accents
  s("~ ~ ~ ~ ~ ~ oh ~")
    .bank("RolandTR808")
    .gain(0.5)
    .decay(0.15),

  // 808 Bass - deep sub with slides
  note("[c1 ~ ~ c1 ~ eb1 ~ ~]*2")
    .s("sine")
    .lpf(150)
    .decay(0.5)
    .sustain(0.3)
    .gain(1.3)
    .distort(0.2)
)
// Global room reverb
.room(0.05)
.size(0.5)
