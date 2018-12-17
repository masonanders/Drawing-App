const path = require('path');

module.exports = {
  context: __dirname,
  entry: './app/js/app.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
};
