/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        cursor: "cursor .6s linear infinite alternate",
        type: "type 1.8s ease-out .8s 1 normal both",
        "type-reverse": "type 1.8s ease-out 0s infinite alternate-reverse both",
      },
      keyframes: {
        type: {
          "0%": { width: "0ch" },
          "25%, 30%": { width: "3ch" },
          "35%, 40%": { width: "4ch" },
          "65%, 70%": { width: "7ch" },
          "75%, 80%": { width: "8ch" },
          "95%": { width: "10ch" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
