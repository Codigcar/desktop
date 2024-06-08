const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    mainFields: ["main"]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  externals: ["aws-sdk"], // this tells webpack not to bundle 'aws-sdk', we don't need this because AWS lambda environment has this included
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
