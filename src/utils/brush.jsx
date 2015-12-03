"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  default as ReactDOM
} from 'react-dom';

import d3 from 'd3';

import {
  Svg,
  Xaxis,
  Yaxis,
  scale
} from 'react-d3-core';

import {
  Bar,
  BarStack,
  BarGroup,
  Line,
  Area as AreaSimple,
  Scatter,
  AreaStack
} from 'react-d3-basic';

import {
  default as CommonProps,
} from '../commonProps';

export default class Brush extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xBrushScaleSet: this._mkXScale(),
      yBrushScaleSet: this._mkYScale(),
      brushSet: false
    }
  }

  static defaultProps = CommonProps

  _mkXScale() {
    const {
      xScale,
      xRange,
      xDomain,
      xRangeRoundBands,
    } = this.props;

    var newXScale = {
      scale: xScale,
      range: xRange,
      domain: xDomain,
      rangeRoundBands: xRangeRoundBands
    }

    return scale(newXScale);
  }

  _mkYScale() {
    const {
      yScale,
      yDomain,
      yRangeRoundBands,
      yBrushRange
    } = this.props;

    var newYScale = {
      scale: yScale,
      range: yBrushRange,
      domain: yDomain,
      rangeRoundBands: yRangeRoundBands
    }

    return scale(newYScale);
  }

  componentDidMount () {
    const {
      xBrushScaleSet,
      yBrushScaleSet
    } = this.state;

    const {
      brushHeight,
      brushType,
      setDomain,
      margins,
      width,
      brushMargins
    } = this.props;

    var brush = d3.svg.brush()
      .x(xBrushScaleSet)
      .on("brush", () => {
        var newDomain = brush.empty() ? xBrushScaleSet.domain() : brush.extent();

        if( brushType === 'line' ||
          brushType === 'scatter' ||
          brushType === 'area_stack') {

          if(newDomain.length) setDomain("x", newDomain);
        }else if( brushType === 'bar' ||
          brushType === 'bar_group' ||
          brushType === 'bar_stack'
        ) {
          var selected =  xBrushScaleSet.domain()
              .filter((d) => {
                return (newDomain[0] <= xBrushScaleSet(d)) &&
                  (xBrushScaleSet(d) <= newDomain[1]);
              });

          if(selected.length) setDomain("x", selected);
        }
      });

    var brushDom = d3.select(ReactDOM.findDOMNode(this.refs.brushRect))
      .call(brush)
    .selectAll('rect')
      .attr("y", -6)
      .attr("height", brushHeight - brushMargins.bottom - brushMargins.top + 7)
      .style('stroke', '#FFF')
      .style('fill-opacity', .25)
      .style('shape-rendering', 'crispEdges');

    this.setState({
      brushSet: true
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      brushSet
    } = nextState;

    if(brushSet) {
      return false;
    }else {
      return true;
    }
  }

  render() {
    const {
      xBrushScaleSet,
      yBrushScaleSet
    } = this.state;

    const {
      brushHeight,
      brushType,
      brushMargins,
      yBrushRange,
      chartSeriesData
    } = this.props;

    var {
      height,
      yRange,
      showYAxis,
      yLabel,
      margins,
      ...otherProps
    } = this.props;

    if(xBrushScaleSet && yBrushScaleSet) {
      if(brushType === 'line') {
        var brushChart = chartSeriesData.map((d, i) => {
          if(d.area) {
            // area chart
            return <AreaSimple margins={brushMargins} dataset={d} key={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
          } else {
            // simple line chart
            return <Line margins={brushMargins} dataset={d} key={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
          }
        })
      }else if(brushType === 'scatter') {
        var brushChart = chartSeriesData.map((d, i) => {
          return <Scatter margins={brushMargins} dataset={d} key={i} brushSymbol={true} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps} />
        })
      }else if(brushType === 'area_stack') {
        var brushChart = <AreaStack margins={brushMargins} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} dataset={chartSeriesData} {...otherProps} />
      }else if(brushType === 'bar') {
        var brushChart = chartSeriesData.map((d, i) => {
          return <Bar margins={brushMargins} dataset={d} key={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
        })
      }else if(brushType === 'bar_group') {
        // settings x1
        var x1 = d3.scale.ordinal();

        // mapping x1, inner x axis
        x1.domain(chartSeriesData.map((d) => { return d.field}))
          .rangeRoundBands([0, xBrushScaleSet.rangeBand()]);

        var brushChart = chartSeriesData.map((d, i) => {
          return <BarGroup margins={brushMargins} x1={x1} dataset={d} key={i} count={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps} />
        })
      }else if(brushType === 'bar_stack') {
        var brushChart = <BarStack margins={brushMargins} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} dataset={chartSeriesData} {...otherProps} />
      }
    }

    return (
      <Svg height={brushHeight} margins={brushMargins}>
        <g ref="brushComponentGroup">
          {brushChart}
          <Xaxis height={brushHeight} {...otherProps} margins={brushMargins} xLabel={false} />
          <Yaxis height={brushHeight} yRange={yBrushRange} showYAxis={false} yLabel={false} {...otherProps} margins={brushMargins}/>
          <g ref="brushRect" className="react-d3-basic__brush__rect"></g>
        </g>
      </Svg>
    )
  }
}
