const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      spacing: {
        '32.5': '8.125rem',
        '56.25': '14.0625rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '125': '32rem'
      },
      borderRadius: {
        '15': '15px'
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }){
      const newUtilities = {
        '.safe-top' : {
          paddingTop: 'constant(safe-area-inset-top)',
          paddingTop: 'env(safe-area-inset-top)'
        },
        '.safe-left' : {
          paddingLeft: 'constant(safe-area-inset-left)',
          paddingLeft: 'env(safe-area-inset-left)'
        },
        '.safe-right' : {
          paddingRight: 'constant(safe-area-inset-right)',
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-bottom' : {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }
      }

      addUtilities( newUtilities );
    })
  ],
}