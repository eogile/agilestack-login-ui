var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(options) {
  var entry, jsLoaders, plugins, cssLoaders;
  var resolversExtensions = [];
  console.log('env variable NODE_ENV=', process.env.NODE_ENV);
  console.log('env variable API_ENV=', process.env.API_ENV);
  var apiEnv = process.env.API_ENV;

  /*
   * Adding a new extension to load the development configuration.
   * It's crucial that ".agilestack.prod.js" is before ".js".
   * development case is when you are also developing your API and want also to debug the api
   * local is to run ui and api in the same standalone server
   * production case is usually for production and is called by callers
   */
  switch (apiEnv) {
    case 'development':
      resolversExtensions.push("", ".agilestack.dev.js", ".webpack.js", ".web.js", ".js");
      break;
    case 'local' : //
      console.log('in switch case local for API_ENV');
      resolversExtensions.push("", ".agilestack.local.js", ".webpack.js", ".web.js", ".js");
      break;
    default :
      console.log('API_ENV not set, using default resolversExtensions');
      resolversExtensions.push("", ".webpack.js", ".web.js", ".js");
  }

  // If production is true
  if (options.prod) {
    // Entry
    entry = [
      path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
    ];
    cssLoaders = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader');
    // Plugins
    plugins = [// Plugins for Webpack
      new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
        compress: {
          warnings: false // ...but do not show warnings in the console (there is a lot of them)
        }
      }),
      new HtmlWebpackPlugin({
        template: 'index.html', // Move the index.html file...
        minify: { // Minifying it while it is parsed
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
      }),
      new ExtractTextPlugin("css/main.css"),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    ];

  // If app is in development
  } else {
    // Entry
    entry = [
      "webpack-dev-server/client?http://localhost:3000", // Needed for hot reloading
      "webpack/hot/only-dev-server", // See above
      path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
    ];
    cssLoaders = 'style-loader!css-loader!postcss-loader';
    // Only plugin is the hot module replacement plugin
    plugins = [
      new webpack.HotModuleReplacementPlugin(), // Make hot loading work
      new HtmlWebpackPlugin({
        template: 'index.html', // Move the index.html file
        inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
      })
    ]
  }

  plugins.push(new AppCachePlugin({ // AppCache should be in both prod and dev env
    exclude: ['.htaccess'] // No need to cache that. See https://support.hostgator.com/articles/403-forbidden-or-no-permission-to-access
  }));

  console.log('resolversExtensions:', resolversExtensions);
  return {
    entry: entry,
    resolve: {
      /*
       * The order of extensions matters.
       */
      extensions: resolversExtensions

    },
    output: { // Compile into build/js/bundle.js
      path: path.resolve(__dirname, 'build'),
      filename: "js/bundle.js"
    },
    module: {
      loaders: [{
          test: /\.js$/, // Transform all .js files required somewhere within an entry point...
          loader: 'babel', // ...with the specified loaders...
          exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
        }, {
          test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
          loader: cssLoaders // ...with PostCSS
        }, {
          test: /\.jpe?g$|\.gif$|\.png$/i,
          loader: "url-loader?limit=10000"
        }
      ]
    },
    plugins: plugins,
    postcss: function() {
      return [
        require('postcss-import')({ // Import all the css files...
          glob: true,
          onImport: function (files) {
              files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
          }.bind(this) // ...so they get hot–reloaded when something changes...
        }),
        require('postcss-simple-vars')(), // ...then replace the variables...
        require('postcss-focus')(), // ...add a :focus to ever :hover...
        require('autoprefixer')({ // ...and add vendor prefixes...
          browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
        }),
        require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
          clearMessages: true
        })
      ];
    },
    target: "web", // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  }
}