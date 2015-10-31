"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  default as ReactDOM
} from 'react-dom';

import {
  Svg as Svg,
  Xaxis as Xaxis,
  Yaxis as Yaxis,
  scale as scale
} from 'react-d3-core';

import {
  Bar as Bar,
  BarStack as BarStack,
  BarGroup as BarGroup,
  Line as Line,
  Area as AreaSimple,
  Scatter as Scatter,
  AreaStack as AreaStack
} from 'react-d3-basic';

export default class Brush extends Component {
  constructor(props) {
    super(props);

    var brushMargins = {top: 30, right: props.margins.right, bottom: 30, left: props.margins.left}
    var yBrushRange = [props.brushHeight - brushMargins.top - brushMargins.bottom, 0]
    this.yBrushRange = yBrushRange;
    this.brushMargins = brushMargins;

    this.state = {
      xBrushScaleSet: this._mkXScale(),
      yBrushScaleSet: this._mkYScale(),
      brushSet: false
    }
  }

  static defaultProps = {
  }

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
    } = this.props;

    var newYScale = {
      scale: yScale,
      range: this.yBrushRange,
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
      width
    } = this.props;

    var brushMargins = this.brushMargins;

    var brush = d3.svg.brush()
      .x(xBrushScaleSet)
      .on("brush", () => {
        var newDomain = brush.empty() ? xBrushScaleSet.domain() : brush.extent();

        if( brushType === 'line' ||
          brushType === 'scatter' ||
          brushType === 'area_stack') {
          setDomain("x", newDomain);
        }else if( brushType === 'bar' ||
          brushType === 'bar_group' ||
          brushType === 'bar_stack'
        ) {
          var selected =  xBrushScaleSet.domain()
              .filter((d) => {
                return (newDomain[0] <= xBrushScaleSet(d)) &&
                  (xBrushScaleSet(d) <= newDomain[1]);
              });

          setDomain("x", selected);
        }
      });

    d3.select(ReactDOM.findDOMNode(this.refs.brushRect))
      .call(brush)
    .selectAll('rect')
      .attr("y", -6)
      .attr("height", brushHeight - brushMargins.bottom - brushMargins.top + 7)
      .style('stroke', '#FFF')
      .style('fill-opacity', .125)
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

    var brushMargins = this.brushMargins;

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

        var stackVal = chartSeriesData[0].data.map(d => {
          return {name: d.x, y0: 0};
        })

        var brushChart = chartSeriesData.map((d, j) => {
          var stackObj = {};

          stackVal.forEach((dkey, i) => {

            var prev = (j === 0)? 0: chartSeriesData[j - 1].data[i].y;
            var newVal = dkey.y0 + prev;
            stackVal[i].y0 = newVal;

            stackObj[dkey.name]= {y: d.data[i].y, y0: newVal}
          })

          return <BarStack margins={brushMargins} stackVal={stackObj} dataset={d} key={j} count={j} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
        })
      }
    }

    return (
      <Svg height={brushHeight} margins={brushMargins}>
        <g ref="brushComponentGroup">
          {brushChart}
          <Xaxis height={brushHeight} {...otherProps} margins={brushMargins}/>
          <Yaxis height={brushHeight} yRange={this.yBrushRange} showYAxis={false} yLabel={false} {...otherProps} margins={brushMargins}/>
          <g ref="brushRect" className="react-d3-basic__brush__rect"></g>
        </g>
      </Svg>
    )
  }
}
