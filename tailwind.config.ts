
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,css}",
		"./components/**/*.{ts,tsx,css}",
		"./app/**/*.{ts,tsx,css}",
		"./src/**/*.{ts,tsx,css}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our app
				"algo-purple": {
					100: "#e5deff",
					200: "#c7bdff",
					300: "#a99cff",
					400: "#8b7bfe",
					500: "#6d5afd",
					600: "#5748ca",
					700: "#413697",
					800: "#2c2464",
					900: "#161232"
				},
				"algo-blue": {
					100: "#d3e4fd",
					200: "#a7c9fb",
					300: "#7caff9",
					400: "#5094f7",
					500: "#2479f5",
					600: "#1d61c4",
					700: "#164993",
					800: "#0e3062",
					900: "#071831"
				},
				"algo-green": {
					100: "#d4f7e9",
					200: "#a9efd3",
					300: "#7fe7bd",
					400: "#54dfa7",
					500: "#29d791",
					600: "#21ac74",
					700: "#198157",
					800: "#10563a",
					900: "#082b1d"
				},
				"algo-dark": {
					100: "#d0d0d8",
					200: "#a1a2b1",
					300: "#73738b",
					400: "#444564",
					500: "#15163d", // Primary dark background
					600: "#11123e",
					700: "#0d0d2e",
					800: "#08081f",
					900: "#04040f"
				},
				"algo-accent": {
					100: "#ffecf8",
					200: "#fed9f1",
					300: "#fec6ea",
					400: "#fdb3e3",
					500: "#fda0dc",
					600: "#ca80b0",
					700: "#986084",
					800: "#654058",
					900: "#33202c"
				}
			},
			fontFamily: {
				sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			boxShadow: {
				'soft': '0 4px 15px rgba(0, 0, 0, 0.1)',
				'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'dark-soft': '0 4px 15px rgba(0, 0, 0, 0.3)',
				'dark-card': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" }
				},
				"bounce-subtle": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" }
				},
				"pulse-gentle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" }
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				"shine": {
					"from": { backgroundPosition: "200% 0" },
					"to": { backgroundPosition: "0 0" }
				},
				"pop": {
					"0%": { transform: "scale(0.95)", opacity: "0.7" },
					"50%": { transform: "scale(1.05)", opacity: "1" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				"slide-right": {
					"0%": { transform: "translateX(-100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" }
				},
				"slide-up": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				"rotate-center": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.4s ease-out",
				"bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
				"pulse-gentle": "pulse-gentle 1.5s ease-in-out infinite",
				"scale-in": "scale-in 0.2s ease-out",
				"float": "float 3s ease-in-out infinite",
				"shine": "shine 2s infinite",
				"pop": "pop 0.3s ease-out",
				"slide-right": "slide-right 0.4s ease-out",
				"slide-up": "slide-up 0.4s ease-out",
				"rotate-center": "rotate-center 0.6s ease-in-out",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
