const path = require("path");
const glob = require('glob')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  // entry: glob.sync("./src/assets/js/**.js").reduce(function (obj, el) {
  //   obj[path.parse(el).name] = el;
  //   return obj;
  // }, {}),
  entry: {
    global: './src/assets/js/global.js',
    router: './src/assets/js/router.js',
    "views/AbstractView": './src/assets/js/views/AbstractView.js',
    "views/AuthLogin": './src/assets/js/views/AuthLogin.js',
    "views/404": './src/assets/js/views/404.js',
    "scripts/AuthLogin": './src/assets/js/scripts/AuthLogin.js',
  },
  output: {
    path: path.resolve(__dirname, "src", "assets", "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sassOptions: {
                includePaths: ["node_modules"],
              }
            },
          },
        ],
      }
    ],
  },
  plugins: [new CompressionPlugin()]
};
