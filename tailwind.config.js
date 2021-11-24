module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Noto Sans KR"],
      body: ["Noto Sans KR"],
      spoqa: ["Spoqa Han Sans Neo"],
    },
    extend: {
      width: {
        "1/4.5": "23%",
      },
      height: {
        "5screen": "5vh",
        "95screen": "95vh",
      },
      spacing: {
        poster: "2%",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      borderColor: ["active"],
    },
  },
  plugins: [],
};