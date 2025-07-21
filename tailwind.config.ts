import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Helvetica Neue',
          'Verdana',
        ],
      },
      width: {
        '22': '5.5rem',
        '28': '7rem',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};
export default config; 