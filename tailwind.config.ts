import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F5F5F5",
        textPrimary: "#000000",
        borderPrimary: "#000000",
        hoverPrimary: "#ACACAC",
        loadingPrimary: "#ACACAC",
      },
    },
  },
  plugins: [],
} satisfies Config;
