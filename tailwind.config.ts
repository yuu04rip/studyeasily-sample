import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                futura: ['var(--font-futura)', 'Arial', 'Helvetica', 'sans-serif'],
                higuan: ['var(--font-higuan)', 'Georgia', 'Times New Roman', 'serif'],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#5B4D9D",
                accent: "#E84CB4",
                gradientStart: "#5B4D9D",
                gradientEnd: "#E84CB4",
                gradientBlueStart: "#4A5FD9",
                gradientBlueEnd: "#8B5CF6",
                darkPurple: "#2D1B69",
                lightPurple: "#8B7FC7",
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