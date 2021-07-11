module.exports = {
  purge: {
    content: ['./src/**/*.svelte', './public/index.html'],
    enabled: !process.env.ROLLUP_WATCH,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        light: '#e7e7e7',
        dark: '#a1a1a1',
      },
      primary: {
        DEFAULT: '#fec400',
        light: '#fdedb2',
      },
      secondary: '#262626',
    },
    extend: {
      gridTemplateColumns: {
        // frame
        frame: '1rem 1fr',
      },
      gridTemplateRows: {
        // frame
        frame: '1fr 4rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
