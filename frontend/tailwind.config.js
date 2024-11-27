/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: ["visible", "animate-bounceIn"],
  },
  theme: {
    extend: {
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(60deg)" },
          "75%": { transform: "rotateY(120deg)" },
          "100%": { transform: "rotateY(1800deg)" },
        },
        bounceIn: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        flip: "flip 200ms ease-in-out",
        bounceIn: "bounceIn 1000ms ease",
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-custom": {
          "&::-webkit-scrollbar": {
            height: "0.5rem",
            width: "0.5rem",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#03C04A",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#009A3A",
          },
        },
      });
    },
  ],
};
