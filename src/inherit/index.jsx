"use sctrict"

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  scale as scale
} from 'react-d3-core';

export default class BrushSet extends Component {
  constructor(props) {
    super(props);
    const {
      xDomain,
      yDomain
    } = this.props;

    this.state = {
      xDomainSet: xDomain,
      yDomainSet: yDomain
    };
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
