/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: ["visible", "animate-bounceIn"],
  },
  theme: {
    extend: {
      // height: {
      //   24: "6rem",
      //   20: "5rem",
      //   16: "4rem",
      //   12: "3rem",
      //   8: "2rem",
      // },
      screens: {
        xs: "480px", // Extra small screens, mobile devices (portrait)
        sm: "640px", // Small screens, like larger smartphones
        "sm-md": "700px", // Small-to-medium range (new custom breakpoint)
        md: "768px", // Medium screens, tablets in portrait mode
        "md-lg": "900px", // Medium-to-large range (new custom breakpoint)
        lg: "1024px", // Large screens, tablets in landscape mode, small desktops
        "lg-xl": "1100px", // Large-to-extra large range (new custom breakpoint)
        xl: "1280px", // Extra large screens, typical desktops and laptops
        "2xl": "1536px", // Very large screens, high-res displays, larger desktops
        "3xl": "1920px", // Custom 3xl breakpoint
        "4xl": "2560px", // Custom 4xl breakpoint
        "4k": "3840px", // 4K screens, ultra-high-definition screens
        xxl: "5000px", // Extreme custom breakpoint (example)
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(60deg)" },
          "75%": { transform: "rotateY(120deg)" },
          "100%": { transform: "rotateY(180deg)" },
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
        green_dark: "#029239",
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
    function ({ addComponents }) {
      addComponents({
        ".text-responsive": {
          "@apply text-sm xs:text-base sm:text-xl sm-md:text-xl md:text-xl lg:text-xl xl:text-2xl 4k:text-3xl":
            {},
        },
        ".text-responsive_header": {
          "@apply text-xl xs:text-base sm:text-xl sm-md:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 4k:text-5xl":
            {},
        },
        ".height-responsive": {
          "@apply h-8 sm:h-12 md:h-16 lg:h-24 xl:h-32 4k:h-48": {},
        },
      });
    },
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
