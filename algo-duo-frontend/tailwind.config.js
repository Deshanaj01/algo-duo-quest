/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AlgoVisual Color Scheme
        algo: {
          dark: {
            bg: {
              primary: '#0f172a',    // Very dark blue-gray
              secondary: '#1e293b',  // Dark blue-gray
              tertiary: '#334155',   // Medium blue-gray
              card: '#1e293b',       // Card background
              input: '#0f172a',      // Input backgrounds
            },
            text: {
              primary: '#f8fafc',    // White text
              secondary: '#cbd5e1',  // Light gray text
              muted: '#64748b',      // Muted text
            },
            border: {
              primary: '#334155',    // Border color
              secondary: '#475569',  // Lighter border
            },
            accent: {
              blue: '#3b82f6',       // Blue accent
              purple: '#8b5cf6',     // Purple accent
              green: '#10b981',      // Green accent
              yellow: '#f59e0b',     // Yellow accent
              orange: '#f97316',     // Orange accent
              red: '#ef4444',        // Red accent
              pink: '#ec4899',       // Pink accent
            }
          },
          light: {
            bg: {
              primary: '#ffffff',
              secondary: '#f8fafc',
              tertiary: '#f1f5f9',
            },
            text: {
              primary: '#0f172a',
              secondary: '#475569',
              muted: '#64748b',
            }
          }
        },
        // Original Duolingo colors for backward compatibility
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
        // Keep dark colors for backward compatibility
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