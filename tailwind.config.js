/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-from-blue-600-to-blue-400":
          "linear-gradient(to right, #3182CE, #4A90E2)",
        "gradient-from-pink-600-to-pink-400":
          "linear-gradient(to right, #D53F8C, #EC4899)",
        "gradient-from-green-600-to-green-400":
          "linear-gradient(to right, #38A169, #48BB78)",
        "gradient-from-orange-600-to-orange-400":
          "linear-gradient(to right, #DD6B20, #F6AD55)",
      }),
    },
  },
  plugins: [],
};
