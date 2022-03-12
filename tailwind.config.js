module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundColor: {
        navBg: "#0c005b",
        cardBg: "#ffd301",
        inputColor: "#f6f9fe",
        tertiary: "#006699",
      },
      colors: {
        primary: "#ffd301",
        secondary: "#030081",
      },
      height: {
        logoHeight: "15%",
        footerHeight: "10%",
      },
    },
  },
  plugins: [],
};
