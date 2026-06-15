/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#1a1a1a",
        cinnabar: "#E34234",
        gold: "#FFD700",
        // Agregamos algunos básicos que usa tu header también
        background: "#0f172a",
        foreground: "#f8fafc",
        border: "#334155",
        "muted-foreground": "#94a3b8",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
      }
    },
  },
  plugins: [],
}