/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: ["visible", "animate-bounceIn"],
  },
  theme: {
    extend: {
      cursor: {
        chillguy: "url(assets/images/chillguy.png), auto",
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
      },
      animation: {
        flip: "flip 200ms ease-in-out",
        bounceIn: "bounceIn 1000ms ease",
      },
      colors: {
        green: "#03C04A",
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
  plugins: [require("tailwindcss-animate")],
};
