import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'Helvetica Neue',
          'HelveticaNeue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        sans: [
          'Helvetica Neue',
          'HelveticaNeue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      },
    },
  },
  plugins: [],
};
export default config; 