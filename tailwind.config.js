/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'space-grotesk': ['"Space Grotesk"', 'sans-serif'], // Custom class for Space Grotesk font
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(45deg, #8c48ff, #ff5f3d)',
      'hover-gradient': 'linear-gradient(45deg, #7a3ede, #e65232)',
    },
    
  },
  plugins: [],
}

