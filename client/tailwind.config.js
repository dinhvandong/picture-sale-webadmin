/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        calibriLight: ['Courier New', 'sans-serif'],
      },
      colors: {
        delete: '#ff4d4f',
        edit: '#1e90ff ',
        insert: '#10B981',
        history:'#4C1A71',
        base_color:'#023047'

      },
    },
  },
  plugins: [],
}