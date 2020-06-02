const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  devServer: {
    contentBase: "./dist",
    port: "3001",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  module: {
    rules: [
      // Loader has two "required" properties, test & use/loader, test is used to identifer the files the specific loader should transform, in case below babel-loader should look at jsx files.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        // Options for the plugin
        options: {
          presets: [
            require.resolve("@babel/preset-react"),
            require.resolve("@babel/preset-typescript"),
          ],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
