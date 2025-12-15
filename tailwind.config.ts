import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.slate[900],
          foreground: colors.white,
        },
        secondary: { DEFAULT: colors.blue[600] },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
