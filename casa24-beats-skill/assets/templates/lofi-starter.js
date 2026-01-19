// Lo-Fi Starter - Casa 24 Beats
// BPM: 80 (chill, laid-back tempo)
// Dusty drums, warm bass, and that classic lo-fi texture
setcps(80/60/2)

stack(
  // Kick - slightly swung, muted feel
  s("bd ~ ~ ~ bd ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.9)
    .lpf(800)
    .crush(10),

  // Snare - dusty and soft
  s("~ ~ ~ ~ sd ~ ~ ~")
    .bank("RolandTR808")
    .gain(0.65)
    .lpf(3000)
    .crush(8)
    .room(0.3)
    .size(0.5),

  // Hi-hats - loose and humanized
  s("[~ hh] [hh ~] [~ hh] [hh hh]")
    .bank("RolandTR808")
    .gain("[0.3 0.4 0.35 0.5]")
    .crush(7)
    .coarse(4)
    .pan(rand.range(0.3, 0.7)),

  // Vinyl crackle texture
  s("~ ~ ~ ~")
    .n(rand.range(0, 5).floor())
    .s("hh")
    .crush(4)
    .coarse(8)
    .gain(0.15)
    .lpf(2000),

  // Warm bass - round and mellow
  note("[c2 ~ ~ eb2 ~ ~ c2 ~]")
    .s("sine")
    .lpf(300)
    .decay(0.4)
    .sustain(0.2)
    .gain(0.95)
    .crush(12),

  // Ghost rimshot for texture
  s("~ ~ rim ~ ~ ~ ~ rim")
    .bank("RolandTR808")
    .gain(0.25)
    .crush(6)
    .room(0.4)
)
// Global lo-fi treatment
.lpf(4000)
.room(0.15)
.size(0.4)
