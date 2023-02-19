/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'monospace': ['"VT323"', 'monospace'],
      },
      colors: {
        'primary': {
          'default': '#ff0000',
          'dark': '#141414',
          'orange': '#FF4910',
          'gray': '#BCBCBC'
        },
        'secondary': {
          'default': '#f0f0f0',
          'dark': '#707070'
        },
      },
    },
  },
  plugins: [],
}
