const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neos": "#F78D1D",
        "cvr": "#EF3728",
        "vrc": "#166CCD"
      },
      fontFamily: ["FiraSans", ...defaultTheme.fontFamily.sans]
    },
  },
  plugins: [],
}
