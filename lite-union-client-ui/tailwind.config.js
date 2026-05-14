/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        appBg: '#F8FAFC',
        cardWhite: '#FFFFFF',
        primary: '#75A8A4',
        primaryLight: '#F0F6F5',
        textMain: '#2C3E50',
        textMuted: '#94A3B8',
        borderLine: '#E2E8F0',
        danger: '#E07A5F'
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
