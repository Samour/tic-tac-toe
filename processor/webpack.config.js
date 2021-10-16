const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  module: {
    // Use `ts-loader` on any file that ends in '.ts'
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // Bundle '.ts' files as well as '.js' files.
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "processor.js",
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    'path': 'commonjs path',
    'electron': 'commonjs electron',
  },
};
