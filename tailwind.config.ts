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
                playfair: ['Playfair Display', 'Georgia', 'serif'],
                poppins: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
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
                // Neon dashboard colors - primary palette
                neon: {
                    magenta: "#FF66D7",  // Primary accent color
                    violet: "#9B6BFF",   // Secondary accent color
                    cyan: "#35D6C6",     // Tertiary accent color
                },
                dashboard: {
                    bg: "#3b2863",
                    bgMid: "#5a37a6",
                    bgDark: "#2f1b4a",
                },
            },
            backgroundImage: {
                'gradient-main': 'linear-gradient(135deg, #5B4D9D 0%, #4A5FD9 50%, #E84CB4 100%)',
                'gradient-purple-blue': 'linear-gradient(135deg, #5B4D9D 0%, #4A5FD9 100%)',
                'gradient-purple-pink': 'linear-gradient(135deg, #5B4D9D 0%, #E84CB4 100%)',
                'gradient-dark': 'linear-gradient(180deg, #2D1B69 0%, #1a103d 100%)',
                'gradient-neon-dashboard': 'linear-gradient(180deg, #3b2863 0%, #5a37a6 45%, #2f1b4a 100%)',
                'gradient-neon-card': 'linear-gradient(135deg, rgba(155,107,255,0.2) 0%, rgba(53,214,198,0.2) 100%)',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(155,107,255,0.4), 0 0 40px rgba(155,107,255,0.2)',
                'neon-magenta': '0 0 20px rgba(255,102,215,0.4), 0 0 40px rgba(255,102,215,0.2)',
                'neon-cyan': '0 0 20px rgba(53,214,198,0.4), 0 0 40px rgba(53,214,198,0.2)',
                'neon-glow': '0 6px 30px rgba(155,107,255,0.28)',
                'card-neon': '0 8px 30px rgba(155,107,255,0.2)',
            },
            animation: {
                'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'progress-ring': 'progress-ring 0.9s ease-in-out',
            },
            keyframes: {
                'neon-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(155,107,255,0.4)' },
                    '50%': { boxShadow: '0 0 30px rgba(155,107,255,0.6), 0 0 60px rgba(155,107,255,0.3)' },
                },
                'glow': {
                    '0%, 100%': { opacity: '0.8' },
                    '50%': { opacity: '1' },
                },
                'progress-ring': {
                    // 283 = circumference of circle with radius 45 (2 * π * 45 ≈ 283)
                    '0%': { strokeDashoffset: '283' },
                    '100%': { strokeDashoffset: '0' },
                },
            },
        },
    },
    plugins: [],
};
export default config;