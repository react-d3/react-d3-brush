"use strict";

const width = 960;
const height = 500;
const margins = {top: 50, right: 50, bottom: 50, left: 50};
const brushHeight = 200;

export default {
  width: width,
  height: height,
  margins: margins,
  y: (d) => {return +d;},
  xScale: 'linear',
  yScale: 'linear',
  brushHeight: brushHeight,
}
