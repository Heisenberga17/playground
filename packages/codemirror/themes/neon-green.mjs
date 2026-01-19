import { tags as t } from '@lezer/highlight';
import { createTheme } from './theme-helper.mjs';

export const settings = {
  background: '#0a0a0f',
  lineBackground: '#0d1117cc',
  foreground: '#e0e0e0',
  caret: '#00ff9f',
  selection: 'rgba(0, 255, 159, 0.3)',
  selectionMatch: 'rgba(0, 212, 255, 0.2)',
  lineHighlight: '#00ff9f10',
  gutterBackground: 'transparent',
  gutterForeground: '#00ff9f66',
  // Custom neon colors
  neonGreen: '#00ff9f',
  neonCyan: '#00d4ff',
  neonMagenta: '#ff006e',
};

export default createTheme({
  theme: 'dark',
  settings,
  styles: [
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ff9f00' },
    { tag: t.labelName, color: '#00d4ff' },
    { tag: t.keyword, color: '#ff006e' },
    { tag: t.operator, color: '#00ff9f' },
    { tag: t.special(t.variableName), color: '#bd93f9' },
    { tag: t.typeName, color: '#00d4ff' },
    { tag: t.atom, color: '#ff9f00' },
    { tag: t.number, color: '#00d4ff' },
    { tag: t.definition(t.variableName), color: '#00d4ff' },
    { tag: t.string, color: '#00ff9f' },
    { tag: t.special(t.string), color: '#00ff9f' },
    { tag: t.comment, color: '#5c6370' },
    { tag: t.variableName, color: '#bd93f9' },
    { tag: t.tagName, color: '#00d4ff' },
    { tag: t.bracket, color: '#5c6370' },
    { tag: t.meta, color: '#ff9f00' },
    { tag: t.attributeName, color: '#bd93f9' },
    { tag: t.propertyName, color: '#bd93f9' },
    { tag: t.className, color: '#00d4ff' },
    { tag: t.invalid, color: '#ff006e' },
    { tag: [t.unit, t.punctuation], color: '#00ff9f' },
  ],
});
