import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8A20D5',
        'secondary': '#E0B6FF',
        'tertiary': '#E2D3FA',
        'pale-purple': '#EBDEFF',
        'eerie-black': '#1E1F22',
        'night': '#1E1B1B'
      }
    }
  },
  plugins: [],
}
export default config
