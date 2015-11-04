"use sctrict"

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  scale as scale
} from 'react-d3-core';

import {
  default as CommonProps,
} from '../commonProps';

export default class BrushSet extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = CommonProps

  mkXDomain() {
    const {
      data,
      x,
      xScale
    } = this.props;

    if(xScale === 'ordinal') {
      return this.setXDomain = data.map((d) => { return x(d); });
    }else {
      return this.setXDomain = d3.extent(data, (d) => { return x(d); });
    }
  }

  mkYDomain(stack) {
    const {
      data,
      chartSeries,
      y
    } = this.props;

    if(stack) {
      // stack
      var max = 0;
      var min = 0;

      data.forEach((d) => {
        var totalTop = 0;
        var totalBottom = 0;

        chartSeries.forEach((sd) => {
          var field = sd.field;

          if(d[field] > 0) {
            totalTop += y(d[field]);
          }else if (d[field] < 0) {
            totalBottom += y(d[field]);
          }
        })

        if(totalTop > max) max = totalTop;
        if(totalBottom < min) min = totalBottom;
      })

      return this.setYDomain = [min, max];
    }else {
      // not stack, single
      var domainArr = chartSeries.map((d) => {
        var field = d.field;
        var extent = d3.extent(data, (dt) => { return y(dt[field]); });

        return extent;
      })

      return this.setYDomain = d3.extent([].concat.apply([], domainArr));
    }
  }

  setDomain(axis, val) {
    const {
      xScale,
      xRange,
      xDomain,
      xRangeRoundBands,
      yScale,
      yRange,
      yDomain,
      yRangeRoundBands
    } = this.props;

    if(axis === 'x'){

      var xScaleChange = {
        scale: xScale,
        range: xRange,
        domain: val,
        rangeRoundBands: xRangeRoundBands
      }

      // set x scale
      this.setState({
        xDomainSet: val,
        xScaleSet: scale(xScaleChange)
      })
    }else if(axis === 'y'){

      var yScaleChange = {
        scale: yScale,
        range: yRange,
        domain: val,
        rangeRoundBands: yRangeRoundBands
      }

      // set y scale
      this.setState({
        yDomainSet: val,
        yScaleSet: scale(yScaleChange)
      })
    }
  }
}
