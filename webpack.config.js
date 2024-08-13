const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
      path:path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
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
            loader: 'file-loader',
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