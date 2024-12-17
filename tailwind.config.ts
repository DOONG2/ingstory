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
      transitionProperty: {
        height: "height",
        width: "width",
      },
      keyframes: {
        "width-increase": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "width-decrease": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        increase: "width-increase ease-in-out forwards",
        decrease: "width-decrease 0s ease-in-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
