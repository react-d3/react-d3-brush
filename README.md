# react-d3-brush

[![Dependency Status](https://gemnasium.com/react-d3/react-d3-brush.svg)](https://gemnasium.com/react-d3/react-d3-brush)

`react-d3` brush implementation.

## Quick example

#### With Webpack build tool

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

#### In HTML (without build tools)

Clone code `react-d3-brush.js` or minify js `react-d3-brush.min.js` and include the script in your HTML.

You'll also need `react`, `react-dom`, `d3`

- Line Chart

```html
<!DOCTYPE html>
<html>
  <head>
    <title>
      Line Chart example
    </title>
  </head>
  <body>
    <div id="data_line"></div>
    <script src="https://fb.me/react-0.14.2.js"></script>
    <script src="https://fb.me/react-dom-0.14.2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <script src="../react-d3-brush.min.js"></script>
    <script type="text/babel">
      var LineBrush = ReactD3Brush.LineBrush;
      var data = [
          {
              "age": 39,
              "index": 0
          },
          {
              "age": 38,
              "index": 1
          },
          {
              "age": 34,
              "index": 2
          },
          {
              "age": 12,
              "index": 3
          }
      ];

      var chartSeries = [
          {
            field: 'age',
            name: 'Age',
            color: '#ff7f0e',
            style: {
              "stroke-width": 2,
              "stroke-opacity": .2,
              "fill-opacity": .2
            }
          }
        ],
        x = function(d) {
          return d.index;
        }

      ReactDOM.render(
        <LineBrush width= {600} height= {500} brushHeight={100} data= {data} chartSeries= {chartSeries} x= {x} />
      , document.getElementById('data_line')
      )
    </script>
  </body>
</html>
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
