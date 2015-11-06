# react-d3-brush

[![Dependency Status](https://gemnasium.com/react-d3/react-d3-brush.svg)](https://gemnasium.com/react-d3/react-d3-brush)

`react-d3` brush implementation.

## Quick example

- Line Chart

```js
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var LineBrush = require('react-d3-brush').LineBrush;

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
      height= {400}
      brushHeight= {100}
      data= {generalChartData}
      chartSeries= {chartSeries}
      x= {x}
      xLabel= {"test"}
    />
  , document.getElementById('data_brush_line')
  )
})()

```

## Install

```
npm install --save react-d3-brush
```

## LIVE DEMO

http://reactd3.org/docs/brush

## Support Brush Component

- Line Chart: export as `LineBrush`
- Area Stack Chart: export as `AreaStackBrush`
- Scatter Plot: export as `ScatterBrush`
- Bar Chart: export as `BarBrush`
- Bar Stack: export as `BarStackBrush`
- Bar Group: export as `BarGroupBrush`

## Gallery

![img](http://www.reactd3.org/img/brush/cover.png)

## License

Apache 2.0
