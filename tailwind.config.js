/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Brand Colors
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#00a8ff', // PROTOSS PYLON
          600: '#0096e6',
          700: '#0082cc',
          800: '#006bb3',
          900: '#004d80',
        },
        secondary: {
          50: '#f0edff',
          100: '#ddd4ff',
          200: '#c9bbff',
          300: '#b5a2ff',
          400: '#a195ff',
          500: '#9c88ff', // PERIWINKLE
          600: '#8c7ae6', // MATT PURPLE
          700: '#7c6ce6',
          800: '#6c5edd',
          900: '#5c4ed4',
        },
        accent: {
          50: '#fffbf0',
          100: '#fff4d9',
          200: '#ffecb3',
          300: '#ffe082',
          400: '#ffd54f',
          500: '#fbc531', // RISE_N_SHINE
          600: '#e1b12c', // NANOHANACHA GOLD
          700: '#c7971f',
          800: '#ad7d12',
          900: '#936305',
        },
        success: {
          50: '#f0fff4',
          100: '#c6f6d5',
          200: '#9ae6b4',
          300: '#68d391',
          400: '#48bb78',
          500: '#4cd137', // DOWNLOAD PROGRESS
          600: '#44bd32', // SKIRRET GREEN
          700: '#38a169',
          800: '#2d7d32',
          900: '#22543d',
        },
        info: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#0097e6', // VANADYL BLUE
          600: '#487eb0', // SEABROOK
          700: '#0082cc',
          800: '#40739e', // NAVAL
          900: '#273c75', // MAZARINE BLUE
        },
        danger: {
          50: '#fff5f5',
          100: '#fed7d7',
          200: '#feb2b2',
          300: '#fc8181',
          400: '#f56565',
          500: '#e84118', // NASTURCIAN FLOWER
          600: '#c23616', // HARLEY DAVIDSON ORANGE
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        },
        neutral: {
          50: '#f5f6fa', // LYNX WHITE
          100: '#dcdde1', // HINT OF PENSIVE
          200: '#c5c6ca',
          300: '#a4a6b3',
          400: '#7f8fa6', // BLUEBERRY SODA
          500: '#718093', // CHAIN GANG GRAY
          600: '#57606f',
          700: '#353b48', // BLUE NIGHTS
          800: '#2f3640', // ELECTROMAGNETIC
          900: '#192a56', // PICO VOID
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 168, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 168, 255, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 168, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 168, 255, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0, 168, 255, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(135deg, #00a8ff, #9c88ff)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-mesh': {
          background: 'linear-gradient(135deg, #00a8ff 0%, #9c88ff 25%, #fbc531 50%, #4cd137 75%, #0097e6 100%)',
          'background-size': '400% 400%',
          animation: 'gradientShift 8s ease infinite',
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};