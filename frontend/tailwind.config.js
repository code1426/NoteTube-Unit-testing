/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(60deg)" },
          "75%": { transform: "rotateY(120deg)" },
          "100%": { transform: "rotateY(1800deg)" },
        },
      },
      animation: {
        flip: "flip 200ms ease-in-out",
      },
      colors: {
        green: "#03C04A",
        green_hover: "#009A3A",
        green_active: "#007A2E",
        white: "#fcfcfc",
        black: "#161616",
      },
      fontFamily: {
        secondaryRegular: ["Secondary-Regular"],
        primaryRegular: ["Primary-Regular"],
        primaryBold: ["Primary-Bold"],
        primaryMedium: ["Primary-Medium"],
        primaryLight: ["Primary-Light"],
      },
    },
  },
  plugins: [],
};
