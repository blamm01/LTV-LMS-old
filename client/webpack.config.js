const path = require("path");
const glob = require('glob')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  // entry: glob.sync("./src/assets/js/**.js").reduce(function (obj, el) {
  //   obj[path.parse(el).name] = el;
  //   return obj;
  // }, {}),
  entry: glob.sync("./src/assets/**/*.js").reduce((acc, cur) => {
    if(!cur.includes("dist")) {
      let splitted = cur.split("/")
      let index = splitted.findIndex(v => v == "js")
      let key = splitted.slice(index + 1, splitted.length).join("/")
      return { [key.slice(0, key.indexOf(".js"))]: cur, ...acc }
    } else return {}
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
