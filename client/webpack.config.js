const path = require("path");
const glob = require('glob')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: glob.sync("./src/assets/js/**.js").reduce(function (obj, el) {
    obj[path.parse(el).name] = el;
    return obj;
  }, {}),
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
    ],
  },
  plugins: [new CompressionPlugin()]
};
