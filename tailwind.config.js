const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2023d4",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        indigo: {
          50: "#f5f7ff",
          100: "#ebf0ff",
          200: "#d8dbff",
          300: "#b8c1ff",
          400: "#8a9eff",
          500: "#2023d4",
          600: "#2e58ff",
          700: "#0e3aff",
          800: "#0022ff",
          900: "#0010ff",
          DEFAULT: "#2023d4",
        },
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        radius: {
          DEFAULT: "0.125rem",
          none: "0rem",
          small: "0.125rem",
          medium: "0.375rem",
          large: "0.5rem",
          full: "9999px",
        },
      },
      themes: {
        dark: {
          colors: {
            background: "#1f212e",
            foreground: {
              DEFAULT: "#ffffff",
              secondary: "#c7c7c7",
            },
            surface: "#2a2c3b",
            primary: {
              DEFAULT: "#3436ae",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#6366f1",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
