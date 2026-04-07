/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@vapor-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '600' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '500' }],
        h3: ['22px', { lineHeight: '30px', fontWeight: '400' }],
        h4: ['20px', { lineHeight: '28px', fontWeight: '300' }],

        body1: ['18px', { lineHeight: '26px' }],
        body2: ['16px', { lineHeight: '24px' }],
        body3: ['14px', { lineHeight: '20px' }],
        body4: ['12px', { lineHeight: '16px' }],
      },

      fontFamily: {
        sans: ['Pretendard Variable', 'sans-serif'],
      },

      colors: {
        primary: {
          500: '#2a72e5',
          400: '#4198f2',
          300: '#51a9f7',
        },
        gray: {
          50: '#f7f7f7',
          90: '#E1E1E1',
          100: '#e1e1e1',
          300: '#7B7B7B',
        },
        semantic: {
          blueSoft: '#EBF4FF',
          greenSoft: '#D6FBE8',
          green: '#10B981',
          purpleSoft: '#F6EEFF',
          purple: '#8B5CF6',
          yellowSoft: '#FEF7D6',
          red: '#FF3434',
          orange: '#F59E0B',
          tree: '#01583C',
        },
        background: {
          DEFAULT: '#ffffff',
          muted: '#f7f7f7',
        },
      },
    },
  },
  plugins: [],
};
