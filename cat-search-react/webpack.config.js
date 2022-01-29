const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
  /**
   * regenerator-runtime/runtime.js : @babel/polyfill 대신 사용 (asyc/await 사용하기 위함)
   * ./src/index.js : main entry
   */
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "eval-cheap-source-map",
  devServer: {
    hot: true,
    client: {
      overlay: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf)$/i,
        loader: "file-loader",
        options: {
          name: "[hash].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
