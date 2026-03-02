/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter_400Regular", "system-ui", "sans-serif"],
      medium: ["Inter_500Medium", "system-ui", "sans-serif"],
      semibold: ["Inter_600SemiBold", "system-ui", "sans-serif"],
      bold: ["Inter_700Bold", "system-ui", "sans-serif"],
      mono: ["monospace"],
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};

