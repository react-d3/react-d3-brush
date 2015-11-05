"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Chart,
} from 'react-d3-core';

import {
  BarChart,
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

export default class BarBrush extends BrushSet {
  constructor(props) {
    super(props)

    const xDomain = this.mkXDomain();
    const yDomain = this.mkYDomain();

    this.state = {
      xDomainSet: xDomain,
      yDomainSet: yDomain
    };
  }

  render() {
    const {
      xDomainSet
    } = this.state;

    var chartSeriesData = series(this.props)

    var focus = <BrushFocus {...this.props} />
    var brush = <Brush xDomain= {this.setXDomain} yDomain= {this.setYDomain} {...this.props} {...this.state} brushType="bar" chartSeriesData={chartSeriesData} setDomain={this.setDomain.bind(this)} />

    return (
      <div>
        <Chart {...this.props}>
          <BarChart {...this.props} {...this.state} xDomain={xDomainSet} showBrush={true}/>
          {focus}
        </Chart>
        {brush}
      </div>
    )
  }
}
