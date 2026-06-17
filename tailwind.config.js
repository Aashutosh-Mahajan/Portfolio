/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        valorant: ['Oswald', 'Orbitron', 'sans-serif'],
        scifi: ['Rajdhani', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: '#070706',
        paper: '#f5efe2',
        dark: {
          bg: '#0a0a0a',
          surface: '#141414',
          accent: '#ff4655',
          accentGlow: 'rgba(255, 70, 85, 0.3)',
          text: '#f9f9f9',
          muted: '#8b8b8b'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
