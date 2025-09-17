/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "algo-purple": {
          100: "#EDE9FE",
          200: "#DDD6FE",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: '#7c3aed',
          800: "#4C1D95",
          900: "#2E1065",
        },
        "algo-blue": {
          200: "#BFDBFE",
          500: "#3B82F6",
          800: "#1E40AF",
        },
        "algo-green": {
          200: "#BBF7D0",
          500: "#22C55E",
          800: "#166534",
        },
        "algo-accent": {
          500: "#6D5AFD",
        },
        // 🔥 Added missing custom colors
        "algo-dark": {
          "accent-purple": "#6D5AFD",   // for bg-algo-dark-accent-purple
          "bg-tertiary": "#21262d",     // for dark:bg-algo-dark-bg-tertiary
        },
        // Original Duolingo colors
        duo: {
          green: {
            50: '#E5F7E5',
            100: '#C8EFC8',
            200: '#A3E5A3',
            300: '#7EDB7E',
            400: '#58CC02',
            500: '#4CAF00',
            600: '#3D8B00',
            700: '#2E6800',
            800: '#1F4500',
            900: '#0F2200',
          },
          blue: {
            50: '#E6F7FF',
            100: '#BAE7FF',
            200: '#91D5FF',
            300: '#69C0FF',
            400: '#1CB0F6',
            500: '#1890FF',
            600: '#096DD9',
            700: '#0050B3',
            800: '#003A8C',
            900: '#002766',
          },
          yellow: {
            400: '#FFC800',
            500: '#FFB020',
          },
          red: {
            400: '#FF4B4B',
            500: '#E53935',
          },
          purple: {
            400: '#CE82FF',
            500: '#B366F5',
          }
        },
        dark: {
          bg: {
            primary: '#0d1117',
            secondary: '#161b22',
            tertiary: '#21262d',
            code: '#0d1117',
          },
          text: {
            primary: '#f0f6fc',
            secondary: '#8b949e',
            muted: '#6e7681',
          },
          border: {
            primary: '#30363d',
            secondary: '#21262d',
          },
          accent: {
            blue: '#58a6ff',
            green: '#7ee787',
            purple: '#d2a8ff',
            yellow: '#f9e2af',
            red: '#ffa198',
            orange: '#ffab70',
          },
          syntax: {
            keyword: '#ff7b72',
            string: '#a5d6ff',
            number: '#79c0ff',
            comment: '#8b949e',
            function: '#d2a8ff',
            variable: '#ffa657',
          }
        }
      },
      fontFamily: {
        'din': ['DIN Round', 'Nunito', 'system-ui', 'sans-serif'],
        'nunito': ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        shine: 'shine 2s infinite',
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'pop': 'pop 0.3s ease-out',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '80%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        "pulse-gentle": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.7 },
        },
      },
      boxShadow: {
        'duo': '0 4px 0 0 rgba(0,0,0,0.1)',
        'duo-lg': '0 6px 0 0 rgba(0,0,0,0.1)',
        'duo-button': '0 4px 0 0 #3D8B00',
        'duo-button-active': '0 2px 0 0 #3D8B00',
        'dark-card': '0 4px 10px rgba(0, 0, 0, 0.6)', // 🔥 Added
      },
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.gray.700', 'currentColor'),
      }),
    },
  },
  plugins: [],
}