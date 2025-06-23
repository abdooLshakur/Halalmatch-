/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'drop-in': {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        

      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'pop-in': 'pop-in 0.5s ease-out forwards',
        'drop-in': 'drop-in 0.7s ease-out forwards',
        'bounce-in': 'bounce-in 0.5s ease-in-out forwards',
      },
      animationDelay: {
        150: '150ms',
        300: '300ms',
        500: '500ms',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'form': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      },
    },
  },
  plugins: [],
};
