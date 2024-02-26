/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}