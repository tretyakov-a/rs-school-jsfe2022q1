const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    liveReload: true,
    static: true,
    watchFiles: [
      './src/*.html',
      './src/*.ejs'
    ]
  },
};
