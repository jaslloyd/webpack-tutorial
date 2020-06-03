const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const isEnvProduction = env.production;
  return {
    mode: !isEnvProduction ? "development" : "production",
    devtool: "source-map",
    entry: "./src/index",
    output: {
      path: __dirname + "/build",
      publicPath: "/",
      filename: isEnvProduction
        ? "static/js/[name].[contenthash].js"
        : !isEnvProduction && "static/js/bundle.js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash].chunk.js"
        : !isEnvProduction && "static/js/[name].chunk.js",
    },
    devServer: {
      contentBase: "./dist",
      port: "3001",
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
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
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css",
        chunkFilename: "static/css/[id].[contenthash].chunk.css",
      }),
      // The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
