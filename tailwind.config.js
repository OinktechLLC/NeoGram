/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          bg: '#1c1c1d',
          secondary: '#2c2c2e',
          tertiary: '#3a3a3c',
          hint: '#8e8e93',
          text: '#ffffff',
          blue: '#007aff',
          green: '#34c759',
          red: '#ff3b30',
          orange: '#ff9500',
          messageOut: '#007aff',
          messageIn: '#2c2c2e',
          border: '#38383a',
          overlay: 'rgba(0, 0, 0, 0.4)',
        }
      },
      borderRadius: {
        'tg-sm': '10px',
        'tg-md': '14px',
        'tg-lg': '18px',
        'tg-xl': '22px',
      },
      animation: {
        'message-in': 'messageIn 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
      },
      keyframes: {
        messageIn: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

