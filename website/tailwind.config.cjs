/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../packages/react/src/**/*.{html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        train: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px var(--glow-color, #00ff9f), 0 0 10px var(--glow-color, #00ff9f)' },
          '50%': { boxShadow: '0 0 20px var(--glow-color, #00ff9f), 0 0 30px var(--glow-color, #00ff9f)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        train: 'train 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      colors: {
        // codemirror-theme settings
        background: 'var(--background)',
        lineBackground: 'var(--lineBackground)',
        foreground: 'var(--foreground)',
        caret: 'var(--caret)',
        selection: 'var(--selection)',
        selectionMatch: 'var(--selectionMatch)',
        gutterBackground: 'var(--gutterBackground)',
        gutterForeground: 'var(--gutterForeground)',
        gutterBorder: 'var(--gutterBorder)',
        lineHighlight: 'var(--lineHighlight)',
        neon: {
          green: '#00ff9f',
          cyan: '#00d4ff',
          magenta: '#ff006e',
          orange: '#ff9f00',
          purple: '#bd93f9',
        },
        card: 'var(--card-bg, #161b22)',
      },
      spacing: {
        'app-height': 'var(--app-height)',
        'app-width': 'var(--app-width)',
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              'code::before': {
                content: 'none', // don’t wrap code in backticks
              },
              'code::after': {
                content: 'none',
              },
              color: 'var(--foreground)',
              a: {
                color: 'var(--foreground)',
              },
              h1: {
                color: 'var(--foreground)',
              },
              h2: {
                color: 'var(--foreground)',
              },
              h3: {
                color: 'var(--foreground)',
              },
              h4: {
                color: 'var(--foreground)',
              },
              pre: {
                color: 'var(--foreground)',
                background: 'var(--background)',
              },
              code: {
                color: 'var(--foreground)',
              },
            },
          },
        };
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
