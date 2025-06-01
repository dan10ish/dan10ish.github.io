module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        secondary: 'var(--secondary)',
        'link-blue': 'var(--link-blue)',
      },
      textColor: {
        primary: 'var(--foreground)',
        secondary: 'var(--secondary)',
        'link-blue': 'var(--link-blue)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 