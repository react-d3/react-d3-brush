"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var LineBrush = require('../../lib').LineBrush;

(function() {

  var generalChartData = require('json!./data/user.json');

  var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e'
      }
    ],
    x = function(d) {
      return d.index;
    };

  ReactDOM.render(
    <LineBrush
      width= {600}
      height= {180}
      brushHeight= {100}
      data= {generalChartData}
      chartSeries= {chartSeries}
      x= {x}
    />
  , document.getElementById('data_brush_line')
  )
})()
