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
    },
  },
  plugins: [],
};
export default config; 