import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'primary': '#8A20D5',
      'secondary': '#E0B6FF',
      'tertiary': '#E2D3FA',
      'eerie-black': '#1E1F22',
    }
  },
  plugins: [],
}
export default config
