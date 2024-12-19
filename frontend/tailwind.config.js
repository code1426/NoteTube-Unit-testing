/** @type {import('tailwindcss').Config} */

import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: ["visible", "animate-bounceIn"],
  },
  theme: {
    extend: {
      cursor: {
        chillguy: "url(chillguy.png), auto",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        "sm-md": "700px",
        md: "768px",
        "md-lg": "900px",
        lg: "1024px",
        "lg-xl": "1100px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
        "4k": "3840px",
        xxl: "5000px",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        flip: {
          "0%": {
            transform: "rotateY(60deg)",
          },
          "75%": {
            transform: "rotateY(120deg)",
          },
          "100%": {
            transform: "rotateY(180deg)",
          },
        },
        bounceIn: {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        flip: "flip 200ms ease-in-out",
        bounceIn: "bounceIn 1000ms ease",
        slideIn: "slideIn 0.5s ease-out forwards",
        slideOut: "slideOut 0.5s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        green: {
          DEFAULT: "#22c55e", // Default green
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        green_dark: "#029239",
        green_hover: "#009A3A",
        green_active: "#007A2E",
        white: "#fcfcfc",
        black: "#161616",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        dark: {
          background: "#282828",
          foreground: "#3f3f3f",
          card: {
            DEFAULT: "hsl(var(--card-dark, 210, 25%, 15%))",
            foreground: "hsl(var(--card-foreground-dark, 210, 30%, 88%))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover-dark, 210, 25%, 12%))",
            foreground: "hsl(var(--popover-foreground-dark, 210, 30%, 90%))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary-dark, 210, 100%, 55%))",
            foreground: "hsl(var(--primary-foreground-dark, 210, 30%, 96%))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary-dark, 210, 18%, 20%))",
            foreground: "hsl(var(--secondary-foreground-dark, 210, 25%, 85%))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted-dark, 210, 15%, 18%))",
            foreground: "hsl(var(--muted-foreground-dark, 210, 20%, 80%))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent-dark, 160, 50%, 40%))",
            foreground: "hsl(var(--accent-foreground-dark, 160, 20%, 95%))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive-dark, 0, 70%, 40%))",
            foreground: "hsl(var(--destructive-foreground-dark, 0, 20%, 95%))",
          },
          border: "#717171",
          input: "#575757",
          ring: "hsl(var(--ring-dark, 210, 50%, 40%))",
          chart: {
            1: "hsl(var(--chart-1-dark, 210, 80%, 55%))",
            2: "hsl(var(--chart-2-dark, 160, 60%, 45%))",
            3: "hsl(var(--chart-3-dark, 50, 70%, 50%))",
            4: "hsl(var(--chart-4-dark, 30, 80%, 55%))",
            5: "hsl(var(--chart-5-dark, 340, 70%, 50%))",
          },
        },
      },
      fontFamily: {
        secondaryRegular: ["Secondary-Regular"],
        primaryRegular: ["Primary-Regular"],
        primaryBold: ["Primary-Bold"],
        primaryMedium: ["Primary-Medium"],
        primaryLight: ["Primary-Light"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
