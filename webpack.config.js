'use strict';

var path            = require('path'),
  webpack         = require('webpack'),
  nodeModulesPath = path.join(__dirname, 'node_modules');

var js_root = './example/src';
var js_dist = path.join(__dirname, './example/dist/origin');


module.exports = [{
  name: 'chartComponent',
  entry: {
    brush_line: js_root + '/brush_line.jsx',
    brush_line_multi: js_root + '/brush_line_multi.jsx',
    brush_scatter: js_root + '/brush_scatter.jsx',
    brush_area_stack: js_root + '/brush_area_stack.jsx',
    brush_bar: js_root + '/brush_bar.jsx',
    brush_bar_group: js_root + '/brush_bar_group.jsx',
    brush_bar_stack: js_root + '/brush_bar_stack.jsx'
  },

  output: {
    path: js_dist,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: [/\.jsx$/],
        loaders: ["jsx-loader?insertPragma=React.DOM&harmony"],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
}];
