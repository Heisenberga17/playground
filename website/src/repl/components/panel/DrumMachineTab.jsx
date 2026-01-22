import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { getAudioContext, soundMap, connectToDestination } from '@strudel/webaudio';
import {
  instruments,
  getAvailableKits,
  createEmptyPattern,
  patternToStrudel,
  presetPatterns
} from '../../drumMachineUtils.mjs';

// Casa 24 Records original colors
const CASA24_GREEN = '#00a651';
const CASA24_GREEN_GLOW = 'rgba(0, 166, 81, 0.6)';
const ACCENT_ORANGE = '#ff6b00';
const DARK_BG = '#1a1a1a';
const DARK_BG_SECONDARY = '#252525';
const BORDER_COLOR = '#333';
const TEXT_MUTED = '#888';

// FULL GREEDY sound options per instrument - many variations!
const soundOptionsPerInstrument = {
  // === KICKS ===
  kick: [
    { id: 'bd', label: 'Kick' },
    { id: 'bd:1', label: 'Kick 2' },
    { id: 'bd:2', label: 'Kick 3' },
    { id: 'bd:3', label: 'Kick 4' },
    { id: 'lt', label: 'Lo Tom' },
  ],
  // === SNARES ===
  snare: [
    { id: 'sd', label: 'Snare' },
    { id: 'sd:1', label: 'Snare 2' },
    { id: 'sd:2', label: 'Snare 3' },
    { id: 'sd:3', label: 'Snare 4' },
    { id: 'rim', label: 'Rim' },
    { id: 'cp', label: 'Clap' },
  ],
  // === CLAPS ===
  clap: [
    { id: 'cp', label: 'Clap' },
    { id: 'cp:1', label: 'Clap 2' },
    { id: 'sd', label: 'Snare' },
    { id: 'rim', label: 'Rim' },
  ],
  // === HI-HATS ===
  hihat: [
    { id: 'hh', label: 'Closed' },
    { id: 'hh:1', label: 'Closed 2' },
    { id: 'hh:2', label: 'Closed 3' },
    { id: 'hh:3', label: 'Tight' },
    { id: 'sh', label: 'Shaker' },
  ],
  openhat: [
    { id: 'oh', label: 'Open HH' },
    { id: 'oh:1', label: 'Open 2' },
    { id: 'cr', label: 'Crash' },
    { id: 'rd', label: 'Ride' },
  ],
  // === TOMS ===
  hitom: [
    { id: 'ht', label: 'Hi Tom' },
    { id: 'ht:1', label: 'Hi Tom 2' },
    { id: 'mt', label: 'Mid Tom' },
    { id: 'perc', label: 'Perc' },
  ],
  midtom: [
    { id: 'mt', label: 'Mid Tom' },
    { id: 'mt:1', label: 'Mid 2' },
    { id: 'ht', label: 'Hi Tom' },
    { id: 'lt', label: 'Lo Tom' },
  ],
  lotom: [
    { id: 'lt', label: 'Lo Tom' },
    { id: 'lt:1', label: 'Lo Tom 2' },
    { id: 'mt', label: 'Mid Tom' },
    { id: 'bd', label: 'Kick' },
  ],
  // === CYMBALS ===
  crash: [
    { id: 'cr', label: 'Crash' },
    { id: 'cr:1', label: 'Crash 2' },
    { id: 'oh', label: 'Open HH' },
    { id: 'rd', label: 'Ride' },
  ],
  ride: [
    { id: 'rd', label: 'Ride' },
    { id: 'rd:1', label: 'Ride 2' },
    { id: 'cr', label: 'Crash' },
    { id: 'cb', label: 'Bell' },
  ],
  // === PERCUSSION ===
  rim: [
    { id: 'rim', label: 'Rim' },
    { id: 'rim:1', label: 'Rim 2' },
    { id: 'sd', label: 'Snare' },
    { id: 'cb', label: 'Cowbell' },
  ],
  cowbell: [
    { id: 'cb', label: 'Cowbell' },
    { id: 'cb:1', label: 'Cowbell 2' },
    { id: 'rim', label: 'Rim' },
    { id: 'perc', label: 'Perc' },
  ],
  perc: [
    { id: 'perc', label: 'Perc' },
    { id: 'perc:1', label: 'Perc 2' },
    { id: 'perc:2', label: 'Perc 3' },
    { id: 'cb', label: 'Cowbell' },
    { id: 'misc', label: 'Misc' },
  ],
  shaker: [
    { id: 'sh', label: 'Shaker' },
    { id: 'sh:1', label: 'Shaker 2' },
    { id: 'hh', label: 'HiHat' },
    { id: 'cb', label: 'Cowbell' },
  ],
  // === EXTRAS ===
  tom: [
    { id: 'tom', label: 'Tom' },
    { id: 'tom:1', label: 'Tom 2' },
    { id: 'tom:2', label: 'Tom 3' },
    { id: 'mt', label: 'Mid Tom' },
  ],
  misc: [
    { id: 'misc', label: 'Misc' },
    { id: 'misc:1', label: 'Misc 2' },
    { id: 'perc', label: 'Perc' },
    { id: 'fx', label: 'FX' },
  ],
};

export function DrumMachineTab({ context }) {
  const sounds = useStore(soundMap);
  const [pattern, setPattern] = useState(() => createEmptyPattern());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [selectedKit, setSelectedKit] = useState('RolandTR808');
  const [availableKits, setAvailableKits] = useState([]);
  const [instrumentSounds, setInstrumentSounds] = useState(() => {
    const defaults = {};
    instruments.forEach(inst => {
      defaults[inst.id] = inst.strudelId;
    });
    return defaults;
  });

  const schedulerRef = useRef(null);
  const nextStepTimeRef = useRef(0);
  const currentStepRef = useRef(0);
  const trigRef = useRef();

  useEffect(() => {
    const kits = getAvailableKits();
    setAvailableKits(kits);
  }, []);

  const soundsReady = sounds && Object.keys(sounds).length > 0;

  const getSoundKey = useCallback((instrumentId) => {
    const soundId = instrumentSounds[instrumentId];
    return `${selectedKit.toLowerCase()}_${soundId}`;
  }, [selectedKit, instrumentSounds]);

  const triggerSound = useCallback(async (instrumentId) => {
    try {
      const soundKey = getSoundKey(instrumentId);
      const soundData = sounds?.[soundKey];

      if (!soundData) {
        console.warn('[DrumMachine] Sound not found:', soundKey);
        return;
      }

      const { onTrigger } = soundData;
      if (!onTrigger) return;

      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const params = {
        s: soundKey,
        n: 0,
        clip: 1,
        release: 0.5,
        duration: 0.5,
        gain: 0.8,
      };

      const onended = () => trigRef.current?.node?.disconnect();
      const time = ctx.currentTime + 0.01;
      const ref = await onTrigger(time, params, onended);
      trigRef.current = ref;

      if (ref?.node) {
        connectToDestination(ref.node);
      }
    } catch (error) {
      console.error('[DrumMachine] Error playing sound:', error);
    }
  }, [sounds, getSoundKey]);

  const handleInstrumentClick = useCallback(async (instrumentId) => {
    await triggerSound(instrumentId);
  }, [triggerSound]);

  const toggleStep = useCallback(async (instrumentId, stepIndex) => {
    setPattern(prev => {
      const newPattern = { ...prev };
      newPattern[instrumentId] = [...prev[instrumentId]];
      newPattern[instrumentId][stepIndex] = !newPattern[instrumentId][stepIndex];
      return newPattern;
    });

    const isCurrentlyActive = pattern[instrumentId]?.[stepIndex];
    if (!isCurrentlyActive) {
      await triggerSound(instrumentId);
    }
  }, [pattern, triggerSound]);

  const scheduler = useCallback(() => {
    if (!isPlaying || !sounds) return;

    try {
      const ctx = getAudioContext();
      const secondsPerBeat = 60.0 / bpm;
      const secondsPerStep = secondsPerBeat / 4;

      while (nextStepTimeRef.current < ctx.currentTime + 0.1) {
        const step = currentStepRef.current;

        instruments.forEach(instrument => {
          if (pattern[instrument.id] && pattern[instrument.id][step]) {
            const soundKey = getSoundKey(instrument.id);
            const soundData = sounds?.[soundKey];

            if (soundData?.onTrigger) {
              const params = {
                s: soundKey,
                n: 0,
                clip: 1,
                release: 0.3,
                duration: secondsPerStep,
                gain: 0.8,
              };

              soundData.onTrigger(nextStepTimeRef.current, params, () => {})
                .then(ref => {
                  if (ref?.node) {
                    connectToDestination(ref.node);
                  }
                })
                .catch(() => {});
            }
          }
        });

        setCurrentStep(step);
        currentStepRef.current = (step + 1) % 16;
        nextStepTimeRef.current += secondsPerStep;
      }

      schedulerRef.current = requestAnimationFrame(scheduler);
    } catch (error) {
      console.error('[DrumMachine] Scheduler error:', error);
    }
  }, [isPlaying, bpm, pattern, sounds, getSoundKey]);

  useEffect(() => {
    if (isPlaying) {
      const startPlayback = async () => {
        try {
          const ctx = getAudioContext();
          if (ctx.state === 'suspended') {
            await ctx.resume();
          }
          currentStepRef.current = 0;
          nextStepTimeRef.current = ctx.currentTime;
          schedulerRef.current = requestAnimationFrame(scheduler);
        } catch (error) {
          console.error('[DrumMachine] Failed to start playback:', error);
        }
      };
      startPlayback();
    } else {
      if (schedulerRef.current) {
        cancelAnimationFrame(schedulerRef.current);
      }
      setCurrentStep(0);
    }

    return () => {
      if (schedulerRef.current) {
        cancelAnimationFrame(schedulerRef.current);
      }
    };
  }, [isPlaying, scheduler]);

  useEffect(() => {
    // 16 keys for 16 instruments - full keyboard layout!
    const PAD_KEYS = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b', 'n'];

    const handleKeyDown = async (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      const keyIndex = PAD_KEYS.indexOf(e.key.toLowerCase());
      if (keyIndex !== -1 && instruments[keyIndex]) {
        await triggerSound(instruments[keyIndex].id);
      }
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSound]);

  const clearPattern = useCallback(() => {
    setPattern(createEmptyPattern());
  }, []);

  const loadPreset = useCallback((presetName) => {
    if (presetPatterns[presetName]) {
      setPattern(presetPatterns[presetName]);
    }
  }, []);

  const updateInstrumentSound = useCallback((instrumentId, soundId) => {
    setInstrumentSounds(prev => ({
      ...prev,
      [instrumentId]: soundId
    }));
  }, []);

  const exportToStrudel = useCallback(() => {
    const strudelCode = patternToStrudel(pattern, selectedKit, bpm);

    if (context?.editorRef?.current?.setCode) {
      context.editorRef.current.setCode(strudelCode);
      setTimeout(() => {
        context.editorRef.current?.repl?.evaluate(strudelCode);
      }, 100);
    } else {
      navigator.clipboard?.writeText(strudelCode);
      alert('Code copied to clipboard!');
    }
  }, [pattern, selectedKit, bpm, context]);

  const handlePlayClick = useCallback(async () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('[DrumMachine] Play error:', error);
    }
  }, [isPlaying]);

  const hasSoundFor = useCallback((instrumentId) => {
    const soundKey = getSoundKey(instrumentId);
    return !!sounds?.[soundKey];
  }, [sounds, getSoundKey]);

  // Inline styles for better control
  const containerStyle = {
    backgroundColor: DARK_BG,
    padding: '10px',
    minHeight: '100%',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#fff',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    paddingBottom: '8px',
    borderBottom: `2px solid ${CASA24_GREEN}40`,
    flexWrap: 'wrap',
    gap: '6px',
  };

  const titleStyle = {
    color: CASA24_GREEN,
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: "'Courier New', monospace",
    textShadow: `0 0 10px ${CASA24_GREEN_GLOW}`,
    margin: 0,
  };

  const selectStyle = {
    backgroundColor: DARK_BG_SECONDARY,
    color: CASA24_GREEN,
    border: `1px solid ${CASA24_GREEN}`,
    borderRadius: '4px',
    padding: '4px 6px',
    fontSize: '10px',
    cursor: 'pointer',
    outline: 'none',
  };

  const smallSelectStyle = {
    backgroundColor: DARK_BG_SECONDARY,
    color: '#aaa',
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: '3px',
    padding: '2px 3px',
    fontSize: '8px',
    cursor: 'pointer',
    outline: 'none',
    width: '48px',
  };

  const buttonStyle = {
    backgroundColor: DARK_BG_SECONDARY,
    color: TEXT_MUTED,
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const getStepStyle = (instrumentId, stepIndex) => {
    const isActive = pattern[instrumentId]?.[stepIndex];
    const isCurrent = isPlaying && currentStep === stepIndex;
    const isBeat = stepIndex % 4 === 0;

    return {
      width: '16px',
      height: '16px',
      backgroundColor: isActive ? CASA24_GREEN : DARK_BG_SECONDARY,
      border: `1px solid ${isCurrent ? '#fff' : isBeat ? CASA24_GREEN + '60' : BORDER_COLOR}`,
      borderRadius: '2px',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      boxShadow: isActive
        ? `0 0 8px ${CASA24_GREEN_GLOW}, inset 0 0 3px rgba(255,255,255,0.2)`
        : isCurrent
          ? '0 0 4px #fff'
          : 'none',
    };
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>🥁 DRUM MACHINE</h2>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            style={selectStyle}
            value={selectedKit}
            onChange={(e) => setSelectedKit(e.target.value)}
          >
            {availableKits.map(kit => (
              <option key={kit.id} value={kit.id}>{kit.name}</option>
            ))}
          </select>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '2px 5px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: '4px',
            border: `1px solid ${CASA24_GREEN}`,
          }}>
            <span style={{ color: CASA24_GREEN, fontSize: '9px', fontWeight: 'bold' }}>{bpm}</span>
            <input
              type="range"
              min="60"
              max="200"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={{ width: '50px', height: '4px', accentColor: CASA24_GREEN }}
            />
          </div>

          <button
            style={{
              ...buttonStyle,
              ...(isPlaying ? {
                backgroundColor: CASA24_GREEN,
                color: DARK_BG,
                borderColor: CASA24_GREEN,
              } : {}),
            }}
            onClick={handlePlayClick}
          >
            {isPlaying ? '⏹' : '▶'}
          </button>

          <button
            style={{
              ...buttonStyle,
              color: '#fff',
              borderColor: ACCENT_ORANGE,
              backgroundColor: ACCENT_ORANGE,
            }}
            onClick={clearPattern}
          >
            CLR
          </button>
        </div>
      </div>

      {/* Sequencer Grid */}
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        padding: '12px',
        paddingLeft: '6px',
        overflowX: 'auto',
      }}>
        {/* Step numbers header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
          borderBottom: `1px solid ${BORDER_COLOR}`,
          paddingBottom: '6px',
        }}>
          <div style={{ width: '60px', flexShrink: 0 }}></div>
          <div style={{ width: '70px', flexShrink: 0, fontSize: '9px', color: TEXT_MUTED, textAlign: 'center', marginRight: '6px' }}>SOUND</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '24px',
                  fontSize: '10px',
                  color: i % 4 === 0 ? CASA24_GREEN : TEXT_MUTED,
                  textAlign: 'center',
                  fontWeight: i % 4 === 0 ? 'bold' : 'normal',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Instrument rows */}
        {instruments.map(instrument => (
          <div
            key={instrument.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px',
              padding: '2px 0',
            }}
          >
            {/* Instrument name */}
            <div
              style={{
                width: '60px',
                flexShrink: 0,
                color: hasSoundFor(instrument.id) ? CASA24_GREEN : TEXT_MUTED,
                fontSize: '10px',
                fontWeight: 'bold',
                textAlign: 'right',
                paddingRight: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onClick={() => handleInstrumentClick(instrument.id)}
              title={`Click to play ${instrument.name}`}
            >
              {instrument.icon} {instrument.name}
            </div>

            {/* Sound selector */}
            <select
              style={{
                ...smallSelectStyle,
                width: '70px',
                flexShrink: 0,
                fontSize: '9px',
                padding: '4px 6px',
                marginRight: '6px',
              }}
              value={instrumentSounds[instrument.id]}
              onChange={(e) => updateInstrumentSound(instrument.id, e.target.value)}
              title="Select sound"
            >
              {(soundOptionsPerInstrument[instrument.id] || []).map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>

            {/* 16 steps */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(16)].map((_, stepIndex) => (
                <div
                  key={stepIndex}
                  style={{
                    ...getStepStyle(instrument.id, stepIndex),
                    width: '24px',
                    height: '24px',
                    borderRadius: '3px',
                  }}
                  onClick={() => toggleStep(instrument.id, stepIndex)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '8px',
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <span style={{ color: TEXT_MUTED, fontSize: '9px' }}>PRESETS:</span>
        <select
          style={selectStyle}
          onChange={(e) => {
            if (e.target.value) {
              loadPreset(e.target.value);
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Load...</option>
          <option value="trap">Trap</option>
          <option value="house">House</option>
          <option value="dembow">Dembow</option>
          <option value="reggaeton">Reggaeton</option>
          <option value="drill">Drill</option>
          <option value="hiphop">Hip-Hop</option>
          <option value="techno">Techno</option>
          <option value="breakbeat">Breakbeat</option>
          <option value="dnb">DnB</option>
          <option value="disco">Disco</option>
        </select>

        <button
          style={{
            ...buttonStyle,
            color: CASA24_GREEN,
            borderColor: CASA24_GREEN,
          }}
          onClick={exportToStrudel}
        >
          → STRUDEL
        </button>
      </div>

      {/* Status */}
      <div style={{
        marginTop: '6px',
        padding: '4px 6px',
        backgroundColor: 'rgba(0, 166, 81, 0.1)',
        borderRadius: '4px',
        fontSize: '8px',
        color: CASA24_GREEN,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>Kit: {selectedKit}</span>
        <span>{soundsReady ? '✓ Ready' : '⏳ Loading...'}</span>
        <span>Keys: QWERT ASDFG ZXCVBN</span>
      </div>
    </div>
  );
}
