/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/metrics/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/components/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/hoc/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/modals/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/utils/**/*.{js,ts,jsx,tsx}",

    "./apps/metricsowner/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/components/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/hoc/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/utils/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/serverlets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
