// House Starter - Casa 24 Beats
// BPM: 125 (classic house tempo)
// 4-on-floor groove with TR-909 punch and pumping bass
setcps(125/60/2)

stack(
  // Kick - 4-on-floor foundation
  s("bd*4")
    .bank("RolandTR909")
    .gain(1.1),

  // Clap on 2 and 4
  s("~ cp ~ cp")
    .bank("RolandTR909")
    .gain(0.8)
    .room(0.25)
    .size(0.4),

  // Off-beat open hats - the house signature
  s("~ oh ~ oh ~ oh ~ oh")
    .bank("RolandTR909")
    .gain(0.55)
    .decay(0.1),

  // Closed hats - steady 16ths with dynamics
  s("hh*16")
    .bank("RolandTR909")
    .gain("[0.4 0.2 0.3 0.2]*4")
    .pan(sine.range(0.4, 0.6).slow(2)),

  // Ride for shimmer
  s("~ ~ ~ ~ ride ~ ~ ~")
    .bank("RolandTR909")
    .gain(0.3),

  // Pumping bass - classic house line
  note("[c2 ~ c2 ~ c2 ~ c2 c3]")
    .s("sawtooth")
    .lpf(400)
    .lpq(2)
    .decay(0.15)
    .sustain(0.05)
    .gain(0.85)
    .distort(0.05)
)
// Room reverb for club feel
.room(0.12)
.size(0.6)
