import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6366f1", // Indigo-500
        accent: "#8b5cf6", // Violet-500
        gradientStart: "#6366f1", // Indigo-500
        gradientEnd: "#8b5cf6", // Violet-500
      },
    },
  },
  plugins: [],
};
export default config;
