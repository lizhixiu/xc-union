/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        appBg: '#F5F6FA',
        cardWhite: '#FFFFFF',
        primary: '#FF0036',
        primaryLight: '#FFF0F3',
        textMain: '#1F2937',
        textMuted: '#94A3B8',
        borderLine: '#E6EAF0',
        danger: '#FF4D4F'
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Helvetica Neue', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
};
