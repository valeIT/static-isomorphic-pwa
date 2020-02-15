var Encore = require('@symfony/webpack-encore');
// var OfflinePlugin = require('offline-plugin');
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

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    // .addEntry('sw', './assets/js/sw.js')
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    // .enableSingleRuntimeChunk()
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader(function (options) {}, {
        resolveUrlLoader: false
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    .enableReactPreset()
    .enablePostCssLoader(options => {
        options.plugins = [
            require('tailwindcss'),
            require('autoprefixer'),
        ];
        if (Encore.isProduction()) {
            options.plugins.push(purgecss);
        }
    })
    //.addEntry('admin', './assets/js/admin.js')
;

var config = Encore.getWebpackConfig();
// push offline-plugin
// config.plugins.push(new OfflinePlugin({
//     "strategy": "changed",
//     "responseStrategy": "cache-first",
//     "caches": {
//         "main": [
//             'app.css', //offline plugin doesn't know about build file , if I added build in it , it will show something like : OfflinePlugin: Cache pattern [build/images/*] did not match any assets
//             'app.js',
//             'runtime.js',
//             'manifest.json',
//             // 'fonts/*',
//             // 'images/*'
//         ]
//     },
//     'appShell': '/'
// }));
module.exports = config;
