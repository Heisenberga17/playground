import { useState, useEffect } from 'react';
import { useSettings, settingsMap } from '@src/settings.mjs';

const { BASE_URL } = import.meta.env;
const baseNoTrailing = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

// Quick Actions - One click to auto-adjust your beat
const quickActions = [
  {
    id: 'double-speed',
    icon: '⚡',
    label: 'Double Speed',
    description: 'Make it 2x faster',
    transform: (code) => {
      // Add .fast(2) to pattern or wrap in fast()
      if (code.includes('.fast(')) {
        return code.replace(/\.fast\((\d+)\)/, (_, n) => `.fast(${parseInt(n) * 2})`);
      }
      return code.replace(/(sound\([^)]+\))/, '$1.fast(2)');
    },
  },
  {
    id: 'half-speed',
    icon: '🐢',
    label: 'Half Speed',
    description: 'Slow it down',
    transform: (code) => {
      if (code.includes('.slow(')) {
        return code.replace(/\.slow\((\d+)\)/, (_, n) => `.slow(${parseInt(n) * 2})`);
      }
      return code.replace(/(sound\([^)]+\))/, '$1.slow(2)');
    },
  },
  {
    id: 'add-reverb',
    icon: '🌊',
    label: 'Add Reverb',
    description: 'Spacey vibes',
    transform: (code) => {
      if (code.includes('.room(')) return code;
      return code.replace(/(sound\([^)]+\))/, '$1.room(0.8)');
    },
  },
  {
    id: 'add-delay',
    icon: '📡',
    label: 'Add Delay',
    description: 'Echo effect',
    transform: (code) => {
      if (code.includes('.delay(')) return code;
      return code.replace(/(sound\([^)]+\))/, '$1.delay(0.5)');
    },
  },
  {
    id: 'randomize',
    icon: '🎲',
    label: 'Randomize',
    description: 'Add randomness',
    transform: (code) => {
      if (code.includes('.sometimes(')) return code;
      return code.replace(/(sound\([^)]+\))/, '$1.sometimes(x => x.speed(rand.range(0.5, 2)))');
    },
  },
  {
    id: 'chop',
    icon: '✂️',
    label: 'Chop It',
    description: 'Slice into pieces',
    transform: (code) => {
      if (code.includes('.chop(')) return code;
      return code.replace(/(sound\([^)]+\))/, '$1.chop(8)');
    },
  },
];

// Genre presets - complete patterns ready to play
const genrePresets = [
  {
    id: 'techno',
    icon: '🔊',
    name: 'Techno',
    bpm: 130,
    code: `// Techno Beat
stack(
  sound("bd*4").gain(1.2),
  sound("~ hh ~ hh").gain(0.6),
  sound("~ ~ cp ~").room(0.3),
  sound("hh*8").gain(0.3).pan(sine)
).cpm(130/4)`,
  },
  {
    id: 'hiphop',
    icon: '🎤',
    name: 'Hip Hop',
    bpm: 90,
    code: `// Hip Hop Beat
stack(
  sound("bd ~ ~ bd ~ ~ bd ~"),
  sound("~ ~ sd ~ ~ ~ sd ~").gain(0.9),
  sound("hh*4").gain(0.5)
).slow(2).cpm(90/4)`,
  },
  {
    id: 'house',
    icon: '🏠',
    name: 'House',
    bpm: 125,
    code: `// House Beat
stack(
  sound("bd*4"),
  sound("~ cp ~ cp"),
  sound("hh*8").gain(0.4),
  sound("oh ~ oh ~").gain(0.3)
).cpm(125/4)`,
  },
  {
    id: 'dnb',
    icon: '🥁',
    name: 'Drum & Bass',
    bpm: 174,
    code: `// Drum & Bass
stack(
  sound("bd ~ [~ bd] ~"),
  sound("~ ~ sd ~"),
  sound("hh*8").gain(0.4)
).fast(2).cpm(174/4)`,
  },
  {
    id: 'ambient',
    icon: '🌙',
    name: 'Ambient',
    bpm: 60,
    code: `// Ambient Pad
note("c3 e3 g3 b3")
  .sound("sawtooth")
  .lpf(800)
  .room(0.9)
  .delay(0.5)
  .slow(4)`,
  },
  {
    id: 'lofi',
    icon: '📻',
    name: 'Lo-Fi',
    bpm: 75,
    code: `// Lo-Fi Chill
stack(
  sound("bd ~ bd ~"),
  sound("~ sd ~ sd").gain(0.7),
  note("c4 e4 g4 e4").sound("piano").room(0.6)
).lpf(2000).slow(2).cpm(75/4)`,
  },
];

// Stat card component
function StatCard({ value, label, icon, color = 'green' }) {
  const colorClasses = {
    green: 'from-neon-green/20 to-neon-cyan/10 border-neon-green/30',
    cyan: 'from-neon-cyan/20 to-neon-purple/10 border-neon-cyan/30',
    magenta: 'from-neon-magenta/20 to-neon-orange/10 border-neon-magenta/30',
  };

  return (
    <div className={`stat-card bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-4 relative overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-magenta" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-neon-green" style={{ textShadow: '0 0 10px var(--neon-green)' }}>
            {value}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
        <div className="text-2xl opacity-60">{icon}</div>
      </div>
    </div>
  );
}

// Quick action button
function QuickActionButton({ action, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    onClick(action);
    setTimeout(() => setIsActive(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`quick-action group flex items-center gap-3 p-3 rounded-xl border transition-all duration-300
        ${isActive
          ? 'border-neon-green bg-neon-green/20 scale-95'
          : 'border-gray-700 bg-gray-900/50 hover:border-neon-cyan hover:bg-neon-cyan/10'
        }`}
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
        {action.icon}
      </div>
      <div className="text-left">
        <div className="font-medium text-sm">{action.label}</div>
        <div className="text-xs text-gray-500">{action.description}</div>
      </div>
    </button>
  );
}

// Genre preset card
function GenreCard({ preset, onClick, isActive }) {
  return (
    <button
      onClick={() => onClick(preset)}
      className={`relative p-4 rounded-xl border transition-all duration-300 text-left w-full
        ${isActive
          ? 'border-neon-green bg-neon-green/10'
          : 'border-gray-700 bg-gray-900/30 hover:border-neon-cyan hover:bg-gray-800/50'
        }`}
    >
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green to-neon-cyan animate-pulse" />
      )}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{preset.icon}</span>
        <div>
          <div className="font-semibold">{preset.name}</div>
          <div className="text-xs text-gray-500">{preset.bpm} BPM</div>
        </div>
      </div>
    </button>
  );
}

export function WelcomeTab({ context }) {
  const { fontFamily } = useSettings();
  const [activePreset, setActivePreset] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [patternsPlayed, setPatternsPlayed] = useState(0);

  // Session timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Apply quick action to current code
  const handleQuickAction = (action) => {
    if (context?.setCode && context?.code) {
      const newCode = action.transform(context.code);
      context.setCode(newCode);
      // Trigger evaluation if playing
      if (context?.evaluate) {
        context.evaluate();
      }
    }
  };

  // Load genre preset
  const handlePresetClick = (preset) => {
    setActivePreset(preset.id);
    setPatternsPlayed((p) => p + 1);
    if (context?.setCode) {
      context.setCode(preset.code);
      if (context?.evaluate) {
        setTimeout(() => context.evaluate(), 100);
      }
    }
  };

  // Copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="text-foreground p-4 space-y-6 max-w-2xl mx-auto" style={{ fontFamily }}>
      {/* Header with Logo */}
      <div className="text-center py-6">
        <div className="inline-block">
          <span
            className="text-5xl font-bold bg-gradient-to-r from-neon-green via-neon-cyan to-neon-magenta bg-clip-text text-transparent"
            style={{ textShadow: '0 0 30px rgba(0, 255, 159, 0.5)' }}
          >
            ꩜
          </span>
        </div>
        <h1 className="text-2xl font-bold mt-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          STRUDEL
        </h1>
        <p className="text-gray-500 text-sm mt-1">Live Coding Music</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard value={formatTime(sessionTime)} label="Session" icon="⏱️" color="green" />
        <StatCard value={patternsPlayed} label="Patterns" icon="🎵" color="cyan" />
        <StatCard value={genrePresets.length} label="Presets" icon="📦" color="magenta" />
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            <span className="text-neon-green">⚡</span> Quick Actions
          </h2>
          <span className="text-xs text-gray-500">Click to auto-adjust</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <QuickActionButton key={action.id} action={action} onClick={handleQuickAction} />
          ))}
        </div>
      </div>

      {/* Neon Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />

      {/* Genre Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            <span className="text-neon-cyan">🎛️</span> Genre Presets
          </h2>
          <span className="text-xs text-gray-500">One-click beats</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {genrePresets.map((preset) => (
            <GenreCard
              key={preset.id}
              preset={preset}
              onClick={handlePresetClick}
              isActive={activePreset === preset.id}
            />
          ))}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="space-y-3">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-neon-magenta">🚀</span> Quick Start
        </h2>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center text-xs font-bold text-neon-green">
              1
            </div>
            <div>
              <span className="font-medium">Pick a preset above</span>
              <span className="text-gray-500 text-sm"> or write your own code</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center text-xs font-bold text-neon-cyan">
              2
            </div>
            <div>
              <span className="font-medium">Press </span>
              <kbd className="px-2 py-0.5 bg-gray-800 rounded text-xs border border-gray-700">Ctrl</kbd>
              <span> + </span>
              <kbd className="px-2 py-0.5 bg-gray-800 rounded text-xs border border-gray-700">Enter</kbd>
              <span className="text-gray-500 text-sm"> to play</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-neon-magenta/20 border border-neon-magenta/50 flex items-center justify-center text-xs font-bold text-neon-magenta">
              3
            </div>
            <div>
              <span className="font-medium">Use Quick Actions</span>
              <span className="text-gray-500 text-sm"> to transform your sound</span>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <a
          href={`${baseNoTrailing}/workshop/getting-started/`}
          target="_blank"
          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-700 bg-gray-900/30 hover:border-neon-green hover:bg-neon-green/10 transition-all"
        >
          <span>📚</span>
          <span className="text-sm font-medium">Tutorial</span>
        </a>
        <a
          href="https://discord.com/invite/HGEdXmRkzT"
          target="_blank"
          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-700 bg-gray-900/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all"
        >
          <span>💬</span>
          <span className="text-sm font-medium">Discord</span>
        </a>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 pt-4 border-t border-gray-800">
        <p>Powered by TidalCycles • Free & Open Source</p>
      </div>
    </div>
  );
}
