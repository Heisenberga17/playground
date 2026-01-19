import { useState } from 'react';
import { defaultSettings, settingsMap, useSettings } from '../../../settings.mjs';
import { themes } from '@strudel/codemirror';
import { Textbox } from '../textbox/Textbox.jsx';
import { confirmAndReloadPage, isUdels } from '../../util.mjs';
import { ButtonGroup } from './Forms.jsx';
import { AudioDeviceSelector } from './AudioDeviceSelector.jsx';
import { AudioEngineTargetSelector } from './AudioEngineTargetSelector.jsx';
import { confirmDialog } from '../../util.mjs';
import { DEFAULT_MAX_POLYPHONY, setMaxPolyphony, setMultiChannelOrbits } from '@strudel/webaudio';
import { SpecialActionButton } from '../button/action-button.jsx';
import { ImportPrebakeScriptButton } from './ImportPrebakeScriptButton.jsx';

// Neon toggle switch
function NeonToggle({ checked, onChange, label, description, icon }) {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-300 cursor-pointer
      ${checked ? 'border-neon-green/50 bg-neon-green/10' : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'}`}
      onClick={() => onChange(!checked)}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <div>
          <span className="font-medium">{label}</span>
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <div
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-neon-green' : 'bg-gray-600'}`}
        style={checked ? { boxShadow: '0 0 10px var(--neon-green)' } : {}}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${checked ? 'left-7' : 'left-1'}`}
        />
      </div>
    </div>
  );
}

// Neon select input
function NeonSelect({ value, options, onChange, label }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <select
        className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl text-foreground focus:border-neon-cyan focus:outline-none transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(options).map(([k, label]) => (
          <option key={k} className="bg-gray-900" value={k}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Neon slider
function NeonSlider({ value, onChange, min, max, step = 1, label }) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between">
          <label className="text-sm text-gray-400">{label}</label>
          <span className="text-sm text-neon-green font-mono">{value}</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:bg-neon-green [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--neon-green)]"
        />
      </div>
    </div>
  );
}

// Collapsible section with neon style
function NeonSection({ title, icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-medium flex items-center gap-2">
          {icon && <span className="text-neon-cyan">{icon}</span>}
          {title}
        </span>
        <span
          className={`text-neon-green transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      {isOpen && <div className="p-4 space-y-4 bg-gray-900/20">{children}</div>}
    </div>
  );
}

// Checkbox with neon style
function NeonCheckbox({ label, value, onChange, disabled = false }) {
  return (
    <label
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-800/30 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          value ? 'border-neon-green bg-neon-green/20' : 'border-gray-600'
        }`}
        style={value ? { boxShadow: '0 0 5px var(--neon-green)' } : {}}
      >
        {value && <span className="text-neon-green text-xs">✓</span>}
      </div>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

const themeOptions = Object.fromEntries(Object.keys(themes).map((k) => [k, k]));
const fontFamilyOptions = {
  monospace: 'monospace',
  Courier: 'Courier',
  CutiePi: 'CutiePi',
  JetBrains: 'JetBrains',
  Hack: 'Hack',
  FiraCode: 'FiraCode',
  'FiraCode-SemiBold': 'FiraCode SemiBold',
  teletext: 'teletext',
  tic80: 'tic80',
  mode7: 'mode7',
  BigBlueTerminal: 'BigBlueTerminal',
  x3270: 'x3270',
  Monocraft: 'Monocraft',
  PressStart: 'PressStart2P',
  'we-come-in-peace': 'we-come-in-peace',
  galactico: 'galactico',
};

export function SettingsTab({ started }) {
  const {
    theme,
    keybindings,
    isBracketClosingEnabled,
    isBracketMatchingEnabled,
    isLineNumbersDisplayed,
    isPatternHighlightingEnabled,
    isActiveLineHighlighted,
    isAutoCompletionEnabled,
    isTooltipEnabled,
    isFlashEnabled,
    isButtonRowHidden,
    isCSSAnimationDisabled,
    isSyncEnabled,
    isLineWrappingEnabled,
    fontSize,
    fontFamily,
    panelPosition,
    audioDeviceName,
    audioEngineTarget,
    togglePanelTrigger,
    maxPolyphony,
    multiChannelOrbits,
    isTabIndentationEnabled,
    isMultiCursorEnabled,
    patternAutoStart,
    includePrebakeScriptInShare,
    beginnerMode,
  } = useSettings();

  const shouldAlwaysSync = isUdels();
  const canChangeAudioDevice = AudioContext.prototype.setSinkId != null;

  return (
    <div className="text-foreground p-4 space-y-4 max-w-2xl mx-auto" style={{ fontFamily }}>
      {/* Header */}
      <div className="text-center py-2">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
          <span className="text-neon-cyan">⚙️</span> Settings
        </h2>
      </div>

      {/* Beginner Mode Toggle */}
      <NeonToggle
        checked={beginnerMode}
        onChange={(value) => settingsMap.setKey('beginnerMode', value)}
        label="Beginner Mode"
        description="Show only essential settings"
        icon="🎓"
      />

      {/* Appearance - Always visible */}
      <NeonSection title="Appearance" icon="🎨" defaultOpen={true}>
        <NeonSelect
          label="Theme"
          options={themeOptions}
          value={theme}
          onChange={(theme) => settingsMap.setKey('theme', theme)}
        />
        <div className="grid grid-cols-2 gap-4">
          <NeonSelect
            label="Font"
            options={fontFamilyOptions}
            value={fontFamily}
            onChange={(fontFamily) => settingsMap.setKey('fontFamily', fontFamily)}
          />
          <NeonSlider
            label="Font Size"
            value={fontSize}
            onChange={(fontSize) => settingsMap.setKey('fontSize', fontSize)}
            min={10}
            max={40}
            step={2}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Panel Position</label>
          <ButtonGroup
            value={panelPosition}
            onChange={(value) => settingsMap.setKey('panelPosition', value)}
            items={{ bottom: 'Bottom', right: 'Right' }}
          />
        </div>
      </NeonSection>

      {/* Advanced sections - Hidden in beginner mode */}
      {!beginnerMode && (
        <>
          {/* Audio */}
          <NeonSection title="Audio" icon="🔊">
            {canChangeAudioDevice && (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Output Device</label>
                <AudioDeviceSelector
                  isDisabled={started}
                  audioDeviceName={audioDeviceName}
                  onChange={(audioDeviceName) => {
                    confirmAndReloadPage(() => {
                      settingsMap.setKey('audioDeviceName', audioDeviceName);
                    });
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Audio Engine</label>
              <AudioEngineTargetSelector
                target={audioEngineTarget}
                onChange={(target) => {
                  confirmAndReloadPage(() => {
                    settingsMap.setKey('audioEngineTarget', target);
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Max Polyphony</label>
              <Textbox
                min={1}
                max={Infinity}
                onBlur={(e) => {
                  let v = parseInt(e.target.value);
                  v = isNaN(v) ? DEFAULT_MAX_POLYPHONY : v;
                  setMaxPolyphony(v);
                  settingsMap.setKey('maxPolyphony', v);
                }}
                onChange={(v) => {
                  v = Math.max(1, parseInt(v));
                  settingsMap.setKey('maxPolyphony', isNaN(v) ? undefined : v);
                }}
                type="number"
                placeholder=""
                value={maxPolyphony ?? ''}
              />
            </div>
            <NeonCheckbox
              label="Multi Channel Orbits"
              onChange={(cbEvent) => {
                const val = cbEvent.target.checked;
                confirmAndReloadPage(() => {
                  settingsMap.setKey('multiChannelOrbits', val);
                  setMultiChannelOrbits(val);
                });
              }}
              value={multiChannelOrbits}
            />
          </NeonSection>

          {/* Editor */}
          <NeonSection title="Editor" icon="📝">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Keybindings</label>
              <ButtonGroup
                value={keybindings}
                onChange={(keybindings) => settingsMap.setKey('keybindings', keybindings)}
                items={{ codemirror: 'Default', vim: 'Vim', emacs: 'Emacs', vscode: 'VSCode' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <NeonCheckbox
                label="Bracket matching"
                onChange={(e) => settingsMap.setKey('isBracketMatchingEnabled', e.target.checked)}
                value={isBracketMatchingEnabled}
              />
              <NeonCheckbox
                label="Auto close brackets"
                onChange={(e) => settingsMap.setKey('isBracketClosingEnabled', e.target.checked)}
                value={isBracketClosingEnabled}
              />
              <NeonCheckbox
                label="Line numbers"
                onChange={(e) => settingsMap.setKey('isLineNumbersDisplayed', e.target.checked)}
                value={isLineNumbersDisplayed}
              />
              <NeonCheckbox
                label="Highlight active line"
                onChange={(e) => settingsMap.setKey('isActiveLineHighlighted', e.target.checked)}
                value={isActiveLineHighlighted}
              />
              <NeonCheckbox
                label="Auto-completion"
                onChange={(e) => settingsMap.setKey('isAutoCompletionEnabled', e.target.checked)}
                value={isAutoCompletionEnabled}
              />
              <NeonCheckbox
                label="Tooltips on hover"
                onChange={(e) => settingsMap.setKey('isTooltipEnabled', e.target.checked)}
                value={isTooltipEnabled}
              />
              <NeonCheckbox
                label="Line wrapping"
                onChange={(e) => settingsMap.setKey('isLineWrappingEnabled', e.target.checked)}
                value={isLineWrappingEnabled}
              />
              <NeonCheckbox
                label="Tab indentation"
                onChange={(e) => settingsMap.setKey('isTabIndentationEnabled', e.target.checked)}
                value={isTabIndentationEnabled}
              />
              <NeonCheckbox
                label="Multi-cursor"
                onChange={(e) => settingsMap.setKey('isMultiCursorEnabled', e.target.checked)}
                value={isMultiCursorEnabled}
              />
            </div>
          </NeonSection>

          {/* Advanced */}
          <NeonSection title="Advanced" icon="⚙️">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Prebake Script</label>
              <ImportPrebakeScriptButton />
              <NeonCheckbox
                label="Include in share"
                onChange={(e) => settingsMap.setKey('includePrebakeScriptInShare', e.target.checked)}
                value={includePrebakeScriptInShare}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Open Panel On</label>
              <ButtonGroup
                value={togglePanelTrigger}
                onChange={(value) => settingsMap.setKey('togglePanelTrigger', value)}
                items={{ click: 'Click', hover: 'Hover' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <NeonCheckbox
                label="Highlight events"
                onChange={(e) => settingsMap.setKey('isPatternHighlightingEnabled', e.target.checked)}
                value={isPatternHighlightingEnabled}
              />
              <NeonCheckbox
                label="Flash on eval"
                onChange={(e) => settingsMap.setKey('isFlashEnabled', e.target.checked)}
                value={isFlashEnabled}
              />
              <NeonCheckbox
                label="Sync tabs"
                onChange={(e) => {
                  confirmAndReloadPage(() => {
                    settingsMap.setKey('isSyncEnabled', e.target.checked);
                  });
                }}
                disabled={shouldAlwaysSync}
                value={isSyncEnabled}
              />
              <NeonCheckbox
                label="Hide top buttons"
                onChange={(e) => settingsMap.setKey('isButtonRowHidden', e.target.checked)}
                value={isButtonRowHidden}
              />
              <NeonCheckbox
                label="Disable animations"
                onChange={(e) => settingsMap.setKey('isCSSAnimationDisabled', e.target.checked)}
                value={isCSSAnimationDisabled}
              />
              <NeonCheckbox
                label="Auto-start pattern"
                onChange={(e) => settingsMap.setKey('patternAutoStart', e.target.checked)}
                value={patternAutoStart}
              />
            </div>
          </NeonSection>
        </>
      )}

      {/* Reset Button */}
      <div className="pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-600 mb-3 text-center">
          💡 Tip: Click the logo for Zen Mode
        </p>
        <button
          onClick={() => {
            confirmDialog('Reset all settings to default?').then((r) => {
              if (r) {
                const { userPatterns } = settingsMap.get();
                settingsMap.set({ ...defaultSettings, userPatterns });
              }
            });
          }}
          className="w-full p-3 rounded-xl border border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10 transition-all text-sm font-medium"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
