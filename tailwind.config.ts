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
        primary: "#5B4D9D", // Deep purple from design
        accent: "#E84CB4", // Bright pink from design
        gradientStart: "#5B4D9D", // Purple
        gradientEnd: "#E84CB4", // Pink
        gradientBlueStart: "#4A5FD9", // Blue gradient start
        gradientBlueEnd: "#8B5CF6", // Blue gradient end
        darkPurple: "#2D1B69", // Dark purple for cards
        lightPurple: "#8B7FC7", // Light purple accent
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #5B4D9D 0%, #4A5FD9 50%, #E84CB4 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #5B4D9D 0%, #4A5FD9 100%)',
        'gradient-purple-pink': 'linear-gradient(135deg, #5B4D9D 0%, #E84CB4 100%)',
        'gradient-dark': 'linear-gradient(180deg, #2D1B69 0%, #1a103d 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
