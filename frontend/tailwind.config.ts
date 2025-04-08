import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "80px",
    },
    extend: {
      colors: {
        background: "#2E4057",
        title: "#333333",
        button: "#28AFB0",
        oceanBlue: "#2CB7BE",
      },
      fontFamily: {
        bricolage: ["var(--font-bricolage)"],
        montserrat: ["var(--font-montserrat)"],
        poppins: ["var(--font-poppins)"],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.oceanBlue"),
              "&:hover": {
                color: theme("colors.white"),
              },
            },
            h1: {
              color: theme("colors.white"),
            },
            h2: {
              color: theme("colors.white"),
            },
            h3: {
              color: theme("colors.white"),
            },
            h4: {
              color: theme("colors.white"),
            },
            strong: {
              color: theme("colors.white"),
            },
            blockquote: {
              color: theme("colors.gray.300"),
              borderLeftColor: theme("colors.oceanBlue"),
            },
            code: {
              color: theme("colors.oceanBlue"),
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
            },
          },
        },
      }),
    },
  },
  plugins: [daisyui, typography],
};

export default config;