import type { Config } from "tailwindcss";

const plugin = require('tailwindcss/plugin')

const config: Config = {
  safelist: [
    'w-[10%]',
    'w-[25%]',
    'w-[50%]',
    'w-[100%]',
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': {
          100: '#f3faf5',
          200: '#e0f2e9',
          300: '#bbb',
          400: '#848b8d',
          500: '#343943',
          600: '#25292c',
          700: '#1f2325',
          800: '#1a1d20',
          900: '#151719',
        },
        'custom-red': {
          400: '#f87171',
          500: '#FF4A4A'
        },
        'custom-green': {
          100: '#dcfce7',
          400: '#34d399',
          500: '#4CCD99'
          // 500: '#00b45a'
        },
        'custom-yellow': {
          500: '#ffc701'
        },
        'custom-orange': {
          500: '#ffa510'
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineShrink: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
      }
    },
  },
  plugins: [],
};
export default config;
