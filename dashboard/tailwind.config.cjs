/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,vue}',
    './components/**/*.{html,js,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          'default': '#ff0000',
          'dark': '#141414',
          'orange': '#FF4910',
          'gray': '#474747',
          'background': "#1D1D1D"
        },
        'secondary': {
          'default': '#f0f0f0',
          'gray': '#949494',
          'dark': '#1E1E1E'
        },
      },
    },
  },
  plugins: [],
}
