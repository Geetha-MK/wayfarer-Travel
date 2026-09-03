/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14213D',
          50: '#EAEDF3',
          100: '#CBD2E1',
          400: '#3B4F72',
          600: '#233458',
          900: '#0D1526',
        },
        paper: {
          DEFAULT: '#FAF6EE',
          dim: '#F1EBDC',
        },
        pine: {
          DEFAULT: '#2F6F63',
          light: '#4C9184',
          dark: '#1F4B42',
        },
        gold: {
          DEFAULT: '#E4A33D',
          light: '#F0C077',
        },
        stone: {
          DEFAULT: '#8C8577',
          light: '#C7C0AF',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        reveal: 'reveal 0.7s cubic-bezier(0.16,1,0.3,1) both',
        pulseSoft: 'pulseSoft 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
