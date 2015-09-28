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
    if(axis === 'x'){
      // set x scale
      this.setState({
        xDomainSet: val
      })
    }else if(axis === 'y'){
      // set y scale
      this.setState({
        yDomainSet: val
      })
    }
  }
}
