module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // this tells Tailwind to use `class="dark"` system
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark", // which theme to apply when class="dark"
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",

    // 👇 This makes DaisyUI respect the class
    class: "theme", // <-- allows switching theme based on `class="theme-light"` etc.
  },
};
