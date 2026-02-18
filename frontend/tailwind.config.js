/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "'Google Sans'",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "'Google Sans Display'",
          "'Google Sans'",
          "Inter",
          "sans-serif",
        ],
        mono: ["'Google Sans Mono'", "'Fira Code'", "monospace"],
      },
    },
  },
  plugins: [],
};
