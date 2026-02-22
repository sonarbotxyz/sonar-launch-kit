import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          blue: "#0052FF",
          "blue-light": "#3370FF",
          "blue-dark": "#0041CC",
          black: "#0A0B0D",
          "dark-1": "#111318",
          "dark-2": "#1A1D26",
          "dark-3": "#232734",
          gray: "#8A919E",
          "gray-light": "#B0B7C3",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 82, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 82, 255, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
