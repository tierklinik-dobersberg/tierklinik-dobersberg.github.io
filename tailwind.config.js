const themeDir = __dirname;

module.exports = {
  content: [`${themeDir}/layouts/**/*.html`, `${themeDir}/content/**/*.md`],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: 'fadein 250ms ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadein: {
          '0%': { opacity: '0%' },
          '100%': { opacity:'100%' },
        },
      }),

      fontFamily: {
        lexend: [
          '"Lexend"',
          {
            fontOpticalSizing: 'auto'
          }
        ],
        inter: [
          '"Inter"',
          {
            fontOpticalSizing: 'auto',
            fontVariationSettings: '"slnt" 0'
          }
        ],
      }
    }
  },
  variants: {},
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography")
  ]
}