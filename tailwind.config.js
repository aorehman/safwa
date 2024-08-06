/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4b49ac",
        secondary: "#98bdff",
        cardDarkBackground: "#071426",
        orange: "#f3797e",
        background: "#f5f7ff",
        lightBlue: "#7da0fa",
        darkBlue: "#7978e9",
        vError: "#B00020",
        shadow: {
          // 500: "rgba(112, 144, 176, 0.08)",
          500: "rgba(176, 0, 0, 0.08)",
          // 500: "rgba(176, 0, 32, 0.05)",
        },
        vShadow: {
          500: "rgba(176, 0, 32, 0.05)",
        },
      },
    },
  },
  plugins: [],
};

// errorOutline;
// border-color: #ff0000;
