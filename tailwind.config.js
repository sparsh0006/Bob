/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8A6D3B', // Whisky amber color
          light: '#D4B88C',
          dark: '#644E2A',
        },
        secondary: {
          DEFAULT: '#121212', // Almost black
          light: '#334155',
          dark: '#0F172A',
        },
        accent: {
          DEFAULT: '#D97706', // Amber glow
          light: '#F59E0B',
          dark: '#B45309',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(217, 119, 6, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
      animation: {
        'typing': 'typing 1.5s steps(20, end) infinite',
        'uncork': 'uncork 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'spin': 'spin 1s linear infinite', // Add this line for the spinner
      },
      
      // Add this to the keyframes section (around line 46-61)
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        uncork: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-5deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        uncork: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-5deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}