"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Chart
} from 'react-d3-core';

import {
  ScatterPlot,
  series
} from 'react-d3-basic';

import {
  default as BrushSet
} from './inherit/index';

import {
  default as Brush,
} from './utils/brush';

import {
  default as BrushFocus,
} from './utils/brush_focus';

export default class ScatterBrush extends BrushSet {
  constructor(props) {
    super(props)

    const {
      margins,
      brushHeight,
      width,
      height
    } = this.props;

    const brushMargins = this.props.brushMargins || {top: 30, right: margins.right, bottom: 30, left: margins.left}
    const yBrushRange = this.props.yBrushRange || [brushHeight - brushMargins.top - brushMargins.bottom, 0]
    const xDomain = this.mkXDomain();
    const yDomain = this.mkYDomain();

    this.state = {
      xRange: this.props.xRange || [0, width - margins.left - margins.right],
      yRange: this.props.yRange || [height - margins.top - margins.bottom, 0],
      xRangeRoundBands: this.props.xRangeRoundBands || {interval: [0, width - margins.left - margins.right], padding: .1},
      brushMargins: brushMargins,
      yBrushRange: yBrushRange,
      xDomainSet: xDomain,
      yDomainSet: yDomain
    }
  }

  render() {
    const {
      xDomainSet
    } = this.state;

    var chartSeriesData = series(this.props)

    var focus = <BrushFocus {...this.props} />
    var brush = <Brush xDomain= {this.setXDomain} yDomain= {this.setYDomain} {...this.props} {...this.state} brushType="scatter" chartSeriesData={chartSeriesData} setDomain={this.setDomain.bind(this)} />

    return (
      <div>
        <Chart {...this.props}>
          <ScatterPlot {...this.props} xDomain={xDomainSet} showBrush={true}/>
          {focus}
        </Chart>
        {brush}
      </div>
    )
  }
}
