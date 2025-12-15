import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        body: colors.slate[700],
        primary: {
          DEFAULT: colors.slate[900],
          foreground: colors.white,
        },
        secondary: {
          DEFAULT: colors.blue[600],
          foreground: colors.white,
        },
        muted: {
          DEFAULT: colors.slate[500],
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
