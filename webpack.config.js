const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Get the environment file based on the current environment
const env = dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed;

// Convert the environment variables to a format Webpack can use
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
      path:path.resolve(__dirname, "dist"),
      filename: 'main.js', // Ensure the output filename matches your HTML script reference
      publicPath: '/' // Ensures the asset paths are resolved correctly
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        filename: 'index.html' // Ensures the correct filename is used
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    module: {
        rules: [
          {
            test: /\.?(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]' // Keeps the file structure intact in the output
                }
              }
            ]
          }
        ]
      },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "assets": path.resolve(__dirname, "src/assets"),
            "components": path.resolve(__dirname, "src/components"),
            "layouts": path.resolve(__dirname, "src/layouts"),
            "providers": path.resolve(__dirname, "src/providers"),
            "hooks": path.resolve(__dirname, "src/hooks"),
            "middlewares": path.resolve(__dirname, "src/middlewares"),
            "utils": path.resolve(__dirname, "src/utils"),
        }
    },
    devServer: {
        port: 4000,
        historyApiFallback: true
    },
};