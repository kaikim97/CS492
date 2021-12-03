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
        "9/10": "90%",
      },
      spacing: {
        poster: "2%",
        table: "17vh",
        "1/10": "20%",
      },
      inset: {
        "1/3": "33%",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "1/80": "80px",
        full: "100%",
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
