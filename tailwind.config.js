export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        league: {
          50: "#F2FBF3",
          100: "#DDF6E1",
          200: "#B7EBC1",
          300: "#83DB97",
          400: "#4ACF6C",
          500: "#1FB85A",
          600: "#178F48",
          700: "#136B38",
          800: "#0F4C2A",
          900: "#0B331F",
          950: "#071F13",
        },
        ink: {
          900: "#0B0F1A",
          950: "#070A10",
        },
        accent: {
          yellow: "#F7C948",
          blue: "#2E5E9E",
        },
      },
      backgroundImage: {
        "league-sweep":
          "linear-gradient(100deg, #21E35C 0%, #118A37 52%, #0B1110 100%)",
        "league-soft":
          "linear-gradient(120deg, #F6F7F8 0%, #EAF7EE 45%, #F6F7F8 100%)",
      },
      boxShadow: {
        "card-soft": "0 20px 60px rgba(10, 15, 10, 0.15)",
      },
    },
  },
  plugins: [],
};
