import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Base colors
        border: "hsl(220 20% 20%)",
        input: "hsl(220 20% 18%)",
        ring: "hsl(160 84% 39%)",
        background: "hsl(220 27% 8%)",
        foreground: "hsl(210 20% 98%)",

        // Brand colors - Professional purple-based analogous palette
        primary: {
          DEFAULT: colors.purple[500], // Purple 500 - main brand
          foreground: colors.white,
          glow: colors.purple[400],
        },
        secondary: {
          DEFAULT: colors.indigo[500], // Indigo 500 - analogous to purple, professional
          foreground: colors.white,
        },
        accent: {
          DEFAULT: colors.pink[500], // Pink 500 - analogous to purple, energetic
          foreground: colors.white,
        },

        // UI element colors
        destructive: {
          DEFAULT: "hsl(0 75% 60%)",
          foreground: "hsl(210 20% 98%)",
        },
        muted: {
          DEFAULT: "hsl(220 20% 15%)",
          foreground: "hsl(215 15% 65%)",
        },
        popover: {
          DEFAULT: "hsl(220 27% 12%)",
          foreground: "hsl(210 20% 98%)",
        },
        card: {
          DEFAULT: "hsl(220 27% 12%)",
          foreground: "hsl(210 20% 98%)",
        },
        sidebar: {
          DEFAULT: "hsl(0 0% 98%)",
          foreground: "hsl(240 5.3% 26.1%)",
          primary: "hsl(240 5.9% 10%)",
          "primary-foreground": "hsl(0 0% 98%)",
          accent: "hsl(240 4.8% 95.9%)",
          "accent-foreground": "hsl(240 5.9% 10%)",
          border: "hsl(220 13% 91%)",
          ring: "hsl(217.2 91.2% 59.8%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "bounce-in": "bounce-in 0.6s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
