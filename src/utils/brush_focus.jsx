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
      chartId
    } = this.props;

    var id = "react-d3-basic__brush_focus__clip__" + chartId;

    return (
      <defs>
        <clipPath id={id}>
          <rect
            width={width - margins.left - margins.right}
            height={height - margins.top - margins.bottom}
          ></rect>
        </clipPath>
      </defs>
    )
  }
}
