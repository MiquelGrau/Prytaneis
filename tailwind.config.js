const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // Add custom colors
      backgroundColor: {
        'blue': '#264653',
        'green': '#2A9D8F',
        'yellow': '#E9C46A',
        'orange': '#F4A261',
        'red': '#E76F51',
      },
      textColor: {
        'blue': '#264653',
        'green': '#2A9D8F',
        'yellow': '#E9C46A',
        'orange': '#F4A261',
        'red': '#E76F51',
      },
      // Custom font families
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      },
      // Custom spacing
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      // Custom breakpoints
      screens: {
        'xs': '480px',
        '3xl': '1600px',
      },
    },
  },
  variants: {
    extend: {
      // Add custom variants
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      textColor: ['responsive', 'hover', 'focus', 'active'],
    },
  },
  plugins: [
    // Add custom plugins or third-party plugins
    // Example: require('@tailwindcss/forms'),
  ],
};
