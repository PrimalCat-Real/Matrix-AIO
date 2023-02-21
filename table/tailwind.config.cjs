/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['"Inter', 'sans-serif'],
        'roboto': ['"Roboto Mono"', 'monospace']
      },
      colors: {
        'primary': {
          'default': '#ff0000',
          'dark': '#141414',
          'orange': '#FF4910',
          'gray': '#636363'
        },
        'secondary': {
          'default': '#f0f0f0',
          'dark': '#707070',
          'light': '#D9D9D9',
          'gray': '#848484'
        },
      },
    },
  },
  plugins: [],
}
