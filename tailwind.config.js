/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,astro,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        colors: {
            "primary": "#0853a6",
            "white-prim": "#eee",
            "hov": "rgb(0,0,0,.1)"
        },
        boxShadow: {
            'med': '0 0 10px -2px rgba(0,0,0,.4)',
        },
        screens: {
            'mobile': {'max': '600px'},
            
            'tablet': {"min": "601px", 'max': '1024px'},
        }
    }
  },
  plugins: [],
}

