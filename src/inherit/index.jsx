"use sctrict"

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  scale,
  xDomainCount,
  yDomainCount
} from 'react-d3-core';

import {
  default as CommonProps,
} from '../commonProps';

export default class BrushSet extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = CommonProps

  static propTypes = {
    data: PropTypes.array.isRequired,
    chartSeries: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.func,
    xDomain: PropTypes.array,
    xRange: PropTypes.array,
    xScale: PropTypes.string,
    xRangeRoundBands: PropTypes.object,
    y: PropTypes.func,
    yDomain: PropTypes.array,
    yRange: PropTypes.array,
    yScale: PropTypes.string,
    brushMargins: PropTypes.object,
    brushHeight: PropTypes.number,
    yBrushRange: PropTypes.array
  }

  mkXDomain() {
    return this.setXDomain = xDomainCount(this.props);
  }

  mkYDomain(stack) {
    return this.setYDomain = yDomainCount(this.props, stack);
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
