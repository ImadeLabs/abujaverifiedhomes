import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        luxuryGreen: "#0f5132",
        luxuryLight: "#198754",
        luxuryGold: "#c9a227"
      }
    }
  },
  plugins: []
}

export default config