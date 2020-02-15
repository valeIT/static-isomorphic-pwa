const purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project
  content: [
    './templates/**/*.html.twig',
    './assets/js/**/*.js',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})


module.exports = {
    plugins: [
        // include whatever plugins you want
        // but make sure you install these via yarn or npm!

        // add browserslist config to package.json (see below)
        require('tailwindcss'),
        require('autoprefixer'),
        purgecss
    ]
}
