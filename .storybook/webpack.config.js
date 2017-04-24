const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
