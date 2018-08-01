import Typography from 'typography'

const typography = new Typography({
  googleFonts: [
    {
      name: 'IBM Plex Mono',
      styles: ['400', '400i', '500', '500i', '700', '700i'],
    },
    {
      name: 'IBM Plex Sans',
      styles: ['400', '400i', '500', '500i', '700', '700i'],
    },
  ],
  baseFontSize: '16pt',
  bodyFontFamily: ['IBM Plex Mono', 'monospace'],
  headerFontFamily: ['IBM Plex Sans', 'sans-serif'],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h3: {
      fontSize: '1em',
      marginBottom: 0,
    },
  }),
})

export default typography
