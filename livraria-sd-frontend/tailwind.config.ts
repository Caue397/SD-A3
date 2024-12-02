import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1440px"
      },
      colors: {
        background: "##f0f0f0",
        darkColor: "#484848",
        lightColor: "#d8d8d8",
        wineRed: "#604848",
        beige: "#c0c0a8"
      },
    },
  },
  plugins: [],
} satisfies Config;
