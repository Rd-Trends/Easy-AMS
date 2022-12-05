/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        "body-bg": "#F8F8F8",
        "font-color": "#000000",
        "element-bg": "#FFFFFF",
        primary: "#1C69F9",
        "dark-body-bg": "#08163e",
        "dark-element-bg": "#071032",
        "dark-font-color": "#CCCCCC",
      },
      boxShadowColor: "rgba(100,100,111,0.2)",
      keyframes: {
        loader: {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
      },
      animation: {
        loader: "loader 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
