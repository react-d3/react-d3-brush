"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Chart as Chart
} from 'react-d3-core';

import {
  AreaStackChart as AreaStackChart,
  series as series
} from 'react-d3-basics';

import {
  default as BrushSet
} from './inherit/index';

import {
  default as Brush,
} from './utils/brush';

import {
  default as BrushFocus,
} from './utils/brush_focus';

export default class AreaStackBrush extends BrushSet {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      xDomainSet
    } = this.state;

    var chartSeriesData = series(this.props)

    var focus = <BrushFocus {...this.props} />
    var brush = <Brush {...this.props} {...this.state} brushType="area_stack" chartSeriesData={chartSeriesData} setDomain={this.setDomain.bind(this)} />

    return (
      <div>
        <Chart {...this.props}>
          <AreaStackChart {...this.props} xDomain={xDomainSet} showBrush={true}/>
          {focus}
        </Chart>
        {brush}
      </div>
    )
  }
}
