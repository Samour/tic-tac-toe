const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  mode: "production",

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-typescript", "@babel/preset-flow"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@tictactoe/interfaces': path.resolve(__dirname, "../interfaces"),
      '@tictactoe/internal': path.resolve(__dirname, "../internal"),
    },
  },
  output: {
    path: path.resolve(__dirname, "../build/"),
    publicPath: "/dist/",
    filename: "renderer.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};