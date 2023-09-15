/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0853a6",
        "white-prim": "#eee",
        "hov": "rgb(0,0,0,.1)"
      },
      boxShadow: {
          'med': '0 5px 30px -2px rgba(0,0,0,.2)',
      },
      screens: {
          'mobile': {'max': '480px'},
          
          'tablet': {"min": "481px", 'max': '1023px'},
      }
    },
  },
  plugins: [],
}

