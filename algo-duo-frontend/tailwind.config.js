/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Duolingo Green Palette
        duo: {
          green: {
            50: '#E5F7E5',
            100: '#C8EFC8',
            200: '#A3E5A3',
            300: '#7EDB7E',
            400: '#58CC02', // Primary Duolingo Green
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
            400: '#1CB0F6', // Duolingo Blue
            500: '#1890FF',
            600: '#096DD9',
            700: '#0050B3',
            800: '#003A8C',
            900: '#002766',
          },
          yellow: {
            400: '#FFC800', // Duolingo Gold/Yellow
            500: '#FFB020',
          },
          red: {
            400: '#FF4B4B', // Duolingo Red for errors
            500: '#E53935',
          },
          purple: {
            400: '#CE82FF', // Duolingo Purple for special
            500: '#B366F5',
          },
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E8E8E8',
            300: '#D4D4D4',
            400: '#AFAFAF',
            500: '#777777',
            600: '#5C5C5C',
            700: '#3C3C3C',
            800: '#2B2B2B',
            900: '#1F1F1F',
          }
        },
        // Dark mode colors for coders
        dark: {
          bg: {
            primary: '#0d1117',    // GitHub dark bg
            secondary: '#161b22',  // Slightly lighter
            tertiary: '#21262d',   // Card backgrounds
            code: '#0d1117',       // Code block bg
          },
          text: {
            primary: '#f0f6fc',    // Main text
            secondary: '#8b949e',  // Secondary text
            muted: '#6e7681',      // Muted text
          },
          border: {
            primary: '#30363d',    // Main borders
            secondary: '#21262d',  // Subtle borders
          },
          accent: {
            blue: '#58a6ff',       // VS Code blue
            green: '#7ee787',      // Success green
            purple: '#d2a8ff',     // VS Code purple
            yellow: '#f9e2af',     // Warning yellow
            red: '#ffa198',        // Error red
            orange: '#ffab70',     // Highlight orange
          },
          syntax: {
            keyword: '#ff7b72',    // Keywords (red)
            string: '#a5d6ff',     // Strings (light blue)
            number: '#79c0ff',     // Numbers (blue)
            comment: '#8b949e',    // Comments (gray)
            function: '#d2a8ff',   // Functions (purple)
            variable: '#ffa657',   // Variables (orange)
          }
        }
      },
      fontFamily: {
        'din': ['DIN Round', 'Nunito', 'system-ui', 'sans-serif'],
        'nunito': ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'pop': 'pop 0.3s ease-out',
      },
      keyframes: {
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
      },
      boxShadow: {
        'duo': '0 4px 0 0 rgba(0,0,0,0.1)',
        'duo-lg': '0 6px 0 0 rgba(0,0,0,0.1)',
        'duo-button': '0 4px 0 0 #3D8B00',
        'duo-button-active': '0 2px 0 0 #3D8B00',
      },
    },
  },
  plugins: [],
} 