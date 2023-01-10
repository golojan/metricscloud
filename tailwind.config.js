/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/metrics/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/components/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/hocs/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/modals/**/*.{js,ts,jsx,tsx}",
    "./apps/metrics/utils/**/*.{js,ts,jsx,tsx}",

    "./apps/metricsowner/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/components/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/hocs/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/utils/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsowner/serverlets/**/*.{js,ts,jsx,tsx}",

    "./apps/metricsapp/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsapp/components/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsapp/utils/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsapp/serverlets/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsapp/widgets/**/*.{js,ts,jsx,tsx}",
    "./apps/metricsapp/hocs/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
