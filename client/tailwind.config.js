/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          // ... other shades
          600: "#2563eb",
        },
        indigo: {
          100: "#e0e7ff",
        },
      },
    },
  },
  plugins: [],
};
