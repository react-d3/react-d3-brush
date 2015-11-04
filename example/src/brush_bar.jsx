"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var BarBrush = require('../../lib').BarBrush;

(function() {
  var generalChartData = require('dsv?delimiter=\t!./data/letter.tsv')

  var chartSeries = [
      {
        field: 'frequency',
        name: 'Frequency'
      }
    ],
    x = function(d) {
      return d.letter;
    },
    xScale = 'ordinal',
    yTicks = [10, "%"];


  ReactDOM.render(
    <BarBrush
      data= {generalChartData}
      chartSeries = {chartSeries}
      x= {x}
      xScale= {xScale}
      yTicks= {yTicks}
    />
  , document.getElementById('data_brush_bar')
  )
})()
