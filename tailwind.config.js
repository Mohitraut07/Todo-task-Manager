/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include TypeScript files
  ],

  theme: {
    extend: {
      colors: {
        primary: "#100d25",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      // Add custom spacing, fonts, or breakpoints here if needed
    },
  },

  plugins: [
    // Add plugins here if necessary, like @tailwindcss/forms or @tailwindcss/typography
  ],
};
