// ENV = 1 stands for production, ENV = 0 stands for development
var ENV = !!(+process.env.NODE_ENV || 0);

var brush_charts = [
  "brush_line",
  "brush_line_multi",
  "brush_scatter",
  "brush_area_stack",
  "brush_bar"
]

var prod_brush_link = brush_charts.map(function(d) {
  return 'min/' + d + '.min'
})

var dev_brush_link = brush_charts.map(function(d) {
  return 'origin/' + d
})

module.exports = [{
  "layout": "./gallery.hbs",
  "filename": "./example/brush_gallery.html",
  "data": {
    "charts": brush_charts,
    "link": ENV? prod_brush_link: dev_brush_link,
    "mode": ENV
  }
},{
  "layout": "./gallery.hbs",
  "filename": "./example/combine.html",
  "data": {
    "charts": ["combine"],
    "link": ENV? ['min/combine.min']: ['origin/combine'],
    "mode": ENV
  }
},{
  "layout": "./charts.hbs",
  "filename": "./example/brush_line.html",
  "data": {
    "title": "Brush Line Chart",
    "type": "brush_line",
    "prefix": ENV? 'min': 'origin'
  }
},{
  "layout": "./charts.hbs",
  "filename": "./example/brush_line_multi.html",
  "data": {
    "title": "Brush Multipule Line Chart",
    "type": "brush_line_multi",
    "prefix": ENV? 'min': 'origin'
  }
},{
  "layout": "./charts.hbs",
  "filename": "./example/brush_scatter.html",
  "data": {
    "title": "Brush Scatter Chart",
    "type": "brush_scatter",
    "prefix": ENV? 'min': 'origin'
  }
},{
  "layout": "./charts.hbs",
  "filename": "./example/brush_area_stack.html",
  "data": {
    "title": "Brush Area Stack Chart",
    "type": "brush_area_stack",
    "prefix": ENV? 'min': 'origin'
  }
},{
  "layout": "./charts.hbs",
  "filename": "./example/brush_bar.html",
  "data": {
    "title": "Brush Bar Chart",
    "type": "brush_bar",
    "prefix": ENV? 'min': 'origin'
  }
}]
