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
        'magnolia': '#F6EDFF',
        'periwink': '#E1D3FA',
        'eerie-black': '#1E1F22',
        'night': '#1E1B1B'
      },
      spacing: {
        70: '280px'
      },
      screens: {
        'xs': '400px'
      }
    }
  },
  plugins: [],
}
export default config
