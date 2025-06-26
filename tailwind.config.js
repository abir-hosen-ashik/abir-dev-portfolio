/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        green: {
          400: '#00ff41',
          500: '#00e838',
          600: '#00cc32',
        },
        gray: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      boxShadow: {
        'green': '0 0 20px rgba(0, 255, 65, 0.3)',
      },
      textShadow: {
        'green': '0 0 10px rgba(0, 255, 65, 0.5)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-green': {
          textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};