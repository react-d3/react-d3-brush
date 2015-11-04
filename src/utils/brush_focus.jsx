"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  default as CommonProps,
} from '../commonProps';

export default class BrushFocus extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = CommonProps

  render() {

    const {
      height,
      width,
      margins,
    } = this.props;

    return (
      <defs>
        <clipPath id="react-d3-basic__brush_focus__clip">
          <rect
            width={width - margins.left - margins.right}
            height={height - margins.top - margins.bottom}
          ></rect>
        </clipPath>
      </defs>
    )
  }
}
