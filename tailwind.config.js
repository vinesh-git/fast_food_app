/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}","./index.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        green : {
          100 : '#084137',
        }
      }
    },
  },
  plugins: [],
}