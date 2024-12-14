import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F5F5F5",
        textPrimary: "#000000",
        loadingPrimary: "#ACACAC",
      },
    },
  },
  plugins: [],
} satisfies Config;
