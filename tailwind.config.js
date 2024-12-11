import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cabin', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: 'var(--background)',
        title: 'var(--title)',
        divider: 'var(--divider)',
        checkboxHover: 'var(--checkbox-hover)',
        radioSelected: 'var(--radio-selected)',
        toggleCircleBorder: 'var(--toggle-circle-border)',

        whiteC: 'var(--badge-white)',
        whiteText: 'var(--badge-white-text)',

        blackC: 'var(--badge-black)',
        blackText: 'var(--badge-black-text)',

        blueC: 'var(--badge-blue)',
        blueText: 'var(--badge-blue-text)',

        greenC: 'var(--badge-green)',
        greenText: 'var(--badge-green-text)',

        beigeC: 'var(--badge-beige)',
        beigeText: 'var(--badge-beige-text)',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-(whiteC|blackC|blueC|greenC|beigeC)+$/,
    },
    {
      pattern: /^text-(white|black|blue|green|beige)+Text$/,
    },
  ],
}
