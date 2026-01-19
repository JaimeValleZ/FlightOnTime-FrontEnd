/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2b6cee",

        /*  Tema oscuro como base */
        background: "#101622",
        surface: "#1c1f27",

        text: {
          primary: "#ffffff",
          secondary: "#9da6b9",
          muted: "#6b7280",
        },

        border: "#282e39",
        input: "#101622",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
