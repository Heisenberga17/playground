import { useState, useEffect, useRef, useCallback } from 'react';
import {
  instruments,
  getAvailableKits,
  loadDrumKit,
  playSound,
  createEmptyPattern,
  patternToStrudel,
  presetPatterns
} from '../../../drumMachineUtils.mjs';

const NEON_GREEN = '#00ff9f';
const NEON_CYAN = '#00d4ff';
const NEON_MAGENTA = '#ff006e';
const DARK_BG = '#0a0a0f';
const DARK_BG_SECONDARY = '#161b22';

const styles = {
  container: {
    backgroundColor: DARK_BG,
    padding: '20px',
    minHeight: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: {
    color: NEON_CYAN,
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: `0 0 10px ${NEON_CYAN}, 0 0 20px ${NEON_CYAN}`,
    margin: 0,
  },
  controls: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  select: {
    backgroundColor: DARK_BG_SECONDARY,
    color: NEON_CYAN,
    border: `1px solid ${NEON_CYAN}`,
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: `0 0 5px ${NEON_CYAN}40`,
  },
  button: {
    backgroundColor: 'transparent',
    color: NEON_GREEN,
    border: `2px solid ${NEON_GREEN}`,
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
  },
  buttonActive: {
    backgroundColor: NEON_GREEN,
    color: DARK_BG,
    boxShadow: `0 0 15px ${NEON_GREEN}, 0 0 30px ${NEON_GREEN}50`,
  },
  buttonDanger: {
    color: NEON_MAGENTA,
    borderColor: NEON_MAGENTA,
  },
  buttonExport: {
    color: NEON_CYAN,
    borderColor: NEON_CYAN,
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sliderLabel: {
    color: NEON_CYAN,
    fontSize: '14px',
    minWidth: '80px',
  },
  slider: {
    appearance: 'none',
    width: '120px',
    height: '6px',
    backgroundColor: DARK_BG_SECONDARY,
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
  },
  padsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    maxWidth: '500px',
    margin: '0 auto 30px',
  },
  pad: {
    aspectRatio: '1',
    backgroundColor: DARK_BG_SECONDARY,
    border: `2px solid ${NEON_MAGENTA}40`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    userSelect: 'none',
  },
  padActive: {
    backgroundColor: NEON_MAGENTA + '30',
    borderColor: NEON_MAGENTA,
    boxShadow: `0 0 20px ${NEON_MAGENTA}, 0 0 40px ${NEON_MAGENTA}50`,
    transform: 'scale(0.95)',
  },
  padLabel: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '5px',
  },
  padKey: {
    color: NEON_CYAN,
    fontSize: '10px',
    opacity: 0.7,
  },
  sequencerContainer: {
    backgroundColor: DARK_BG_SECONDARY,
    borderRadius: '8px',
    padding: '20px',
    overflowX: 'auto',
  },
  sequencerGrid: {
    display: 'grid',
    gap: '4px',
    minWidth: '700px',
  },
  sequencerRow: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(16, 1fr)',
    gap: '4px',
    alignItems: 'center',
  },
  instrumentLabel: {
    color: NEON_CYAN,
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingRight: '10px',
    textAlign: 'right',
  },
  step: {
    aspectRatio: '1',
    backgroundColor: DARK_BG,
    border: `1px solid ${NEON_GREEN}30`,
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    minWidth: '25px',
    minHeight: '25px',
  },
  stepActive: {
    backgroundColor: NEON_GREEN,
    boxShadow: `0 0 8px ${NEON_GREEN}`,
  },
  stepCurrent: {
    borderColor: NEON_CYAN,
    boxShadow: `0 0 10px ${NEON_CYAN}, inset 0 0 5px ${NEON_CYAN}50`,
  },
  stepHeader: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(16, 1fr)',
    gap: '4px',
    marginBottom: '8px',
  },
  stepNumber: {
    color: NEON_CYAN + '60',
    fontSize: '10px',
    textAlign: 'center',
  },
  presetSection: {
    marginTop: '20px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    color: NEON_CYAN,
    fontSize: '14px',
  },
};

const PAD_KEYS = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f'];

export function DrumMachineTab({ context }) {
  const [pattern, setPattern] = useState(() => createEmptyPattern());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [selectedKit, setSelectedKit] = useState('tr808');
  const [audioBuffers, setAudioBuffers] = useState({});
  const [activePads, setActivePads] = useState({});
  const [availableKits, setAvailableKits] = useState([]);

  const audioContextRef = useRef(null);
  const schedulerRef = useRef(null);
  const nextStepTimeRef = useRef(0);
  const currentStepRef = useRef(0);

  // Initialize available kits
  useEffect(() => {
    const kits = getAvailableKits();
    setAvailableKits(kits);
  }, []);

  // Initialize AudioContext on first user interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Load drum kit samples
  useEffect(() => {
    const loadSamples = async () => {
      if (!audioContextRef.current) {
        initAudioContext();
      }
      try {
        const buffers = await loadDrumKit(selectedKit, audioContextRef.current);
        setAudioBuffers(buffers);
      } catch (error) {
        console.error('Failed to load drum kit:', error);
      }
    };
    loadSamples();
  }, [selectedKit, initAudioContext]);

  // Play a drum sound
  const triggerSound = useCallback((instrumentId) => {
    const ctx = initAudioContext();
    if (audioBuffers[instrumentId]) {
      playSound(ctx, audioBuffers[instrumentId]);

      // Visual feedback
      setActivePads(prev => ({ ...prev, [instrumentId]: true }));
      setTimeout(() => {
        setActivePads(prev => ({ ...prev, [instrumentId]: false }));
      }, 100);
    }
  }, [audioBuffers, initAudioContext]);

  // Handle pad click
  const handlePadClick = useCallback((instrumentId) => {
    triggerSound(instrumentId);
  }, [triggerSound]);

  // Toggle step in sequencer
  const toggleStep = useCallback((instrumentId, stepIndex) => {
    initAudioContext();
    setPattern(prev => {
      const newPattern = { ...prev };
      newPattern[instrumentId] = [...prev[instrumentId]];
      newPattern[instrumentId][stepIndex] = !newPattern[instrumentId][stepIndex];
      return newPattern;
    });
  }, [initAudioContext]);

  // Sequencer scheduler
  const scheduler = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !isPlaying) return;

    const secondsPerBeat = 60.0 / bpm;
    const secondsPerStep = secondsPerBeat / 4; // 16th notes

    while (nextStepTimeRef.current < ctx.currentTime + 0.1) {
      const step = currentStepRef.current;

      // Trigger sounds for active steps
      instruments.forEach(instrument => {
        if (pattern[instrument.id] && pattern[instrument.id][step]) {
          if (audioBuffers[instrument.id]) {
            playSound(ctx, audioBuffers[instrument.id], nextStepTimeRef.current);
          }
        }
      });

      // Update visual step indicator
      setCurrentStep(step);

      // Advance to next step
      currentStepRef.current = (step + 1) % 16;
      nextStepTimeRef.current += secondsPerStep;
    }

    schedulerRef.current = requestAnimationFrame(scheduler);
  }, [isPlaying, bpm, pattern, audioBuffers]);

  // Start/stop playback
  useEffect(() => {
    if (isPlaying) {
      const ctx = initAudioContext();
      currentStepRef.current = 0;
      nextStepTimeRef.current = ctx.currentTime;
      schedulerRef.current = requestAnimationFrame(scheduler);
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
  }, [isPlaying, scheduler, initAudioContext]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyIndex = PAD_KEYS.indexOf(e.key.toLowerCase());
      if (keyIndex !== -1 && instruments[keyIndex]) {
        handlePadClick(instruments[keyIndex].id);
      }
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePadClick]);

  // Clear pattern
  const clearPattern = useCallback(() => {
    setPattern(createEmptyPattern());
  }, []);

  // Load preset pattern
  const loadPreset = useCallback((presetName) => {
    if (presetPatterns[presetName]) {
      setPattern(presetPatterns[presetName]);
    }
  }, []);

  // Export to Strudel
  const exportToStrudel = useCallback(() => {
    const strudelCode = patternToStrudel(pattern, selectedKit, bpm);
    if (context && context.setCode) {
      context.setCode(strudelCode);
    }
  }, [pattern, selectedKit, bpm, context]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>DRUM MACHINE</h2>
        <div style={styles.controls}>
          <select
            style={styles.select}
            value={selectedKit}
            onChange={(e) => setSelectedKit(e.target.value)}
          >
            {availableKits.map(kit => (
              <option key={kit.id} value={kit.id}>{kit.name}</option>
            ))}
          </select>

          <div style={styles.sliderContainer}>
            <span style={styles.sliderLabel}>BPM: {bpm}</span>
            <input
              type="range"
              min="60"
              max="200"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <button
            style={{
              ...styles.button,
              ...(isPlaying ? styles.buttonActive : {}),
            }}
            onClick={() => {
              initAudioContext();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? 'Stop' : 'Play'}
          </button>

          <button
            style={{ ...styles.button, ...styles.buttonDanger }}
            onClick={clearPattern}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Drum Pads */}
      <div style={styles.padsContainer}>
        {instruments.map((instrument, index) => (
          <div
            key={instrument.id}
            style={{
              ...styles.pad,
              ...(activePads[instrument.id] ? styles.padActive : {}),
            }}
            onMouseDown={() => handlePadClick(instrument.id)}
            onTouchStart={(e) => {
              e.preventDefault();
              handlePadClick(instrument.id);
            }}
          >
            <span style={styles.padLabel}>{instrument.name}</span>
            <span style={styles.padKey}>[{PAD_KEYS[index]?.toUpperCase()}]</span>
          </div>
        ))}
      </div>

      {/* Step Sequencer */}
      <div style={styles.sequencerContainer}>
        <div style={styles.stepHeader}>
          <div></div>
          {[...Array(16)].map((_, i) => (
            <div key={i} style={styles.stepNumber}>{i + 1}</div>
          ))}
        </div>
        <div style={styles.sequencerGrid}>
          {instruments.map(instrument => (
            <div key={instrument.id} style={styles.sequencerRow}>
              <div style={styles.instrumentLabel}>{instrument.name}</div>
              {[...Array(16)].map((_, stepIndex) => (
                <div
                  key={stepIndex}
                  style={{
                    ...styles.step,
                    ...(pattern[instrument.id]?.[stepIndex] ? styles.stepActive : {}),
                    ...(isPlaying && currentStep === stepIndex ? styles.stepCurrent : {}),
                  }}
                  onClick={() => toggleStep(instrument.id, stepIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Presets and Export */}
      <div style={styles.presetSection}>
        <span style={styles.label}>Presets:</span>
        <select
          style={styles.select}
          onChange={(e) => {
            if (e.target.value) {
              loadPreset(e.target.value);
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Select a preset...</option>
          <option value="trap">Trap</option>
          <option value="house">House</option>
          <option value="dembow">Dembow</option>
          <option value="drill">Drill</option>
        </select>

        <button
          style={{ ...styles.button, ...styles.buttonExport }}
          onClick={exportToStrudel}
        >
          Export to Strudel
        </button>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: ${NEON_CYAN};
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px ${NEON_CYAN};
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: ${NEON_CYAN};
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px ${NEON_CYAN};
          border: none;
        }
      `}</style>
    </div>
  );
}
