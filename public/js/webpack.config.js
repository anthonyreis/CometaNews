var nodeExternals = require('webpack-node-externals')
const path = require('path');

node: {
    fs: 'empty'
  }

module.exports = {
  entry: '../../app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  "target": "node",
  externals: [nodeExternals()],
  module: {
      rules: [
          {
            test:  /\.handlebars$/,
            loader: "handlebars-loader"
          },
          {
            test: /\.css$/i,
            loader: "css-loader"
          },
          {
            test: /\.node$/,
            loader: 'node-loader',
          }
      ],
    plugins: [
        new ContextReplacementPlugin(/any-promise/)
    ]
  }
};