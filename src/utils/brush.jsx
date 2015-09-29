"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Svg as Svg,
  Xaxis as Xaxis,
  Yaxis as Yaxis,
} from 'react-d3-core';

import {
  Bar as Bar,
  BarStack as BarStack,
  BarGroup as BarGroup,
  Line as Line,
  Area as AreaSimple,
  Scatter as Scatter,
  AreaStack as AreaStack
} from 'react-d3-basics';

require('../css/brush.css');

export default class Brush extends Component {
  constructor(props) {
    super(props);

    this.setBrushScale = this.setBrushScale.bind(this)

    this.state = {
      xBrushScaleSet: null,
      yBrushScaleSet: null,
      brushSet: false
    }
  }

  setBrushScale(axis, func) {
    if(axis === 'x'){
      // set x scale
      this.setState({
        xBrushScaleSet: func
      })
    }else if(axis === 'y'){
      // set y scale
      this.setState({
        yBrushScaleSet: func
      })
    }
  }

  _mkContent (nextState) {
    const {
      xBrushScaleSet,
      yBrushScaleSet,
      brushSet
    } = nextState;

    const {
      brushHeight,
      brushType,
      setDomain,
      margins
    } = this.props;

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

    d3.select(React.findDOMNode(this.refs.brushRect))
      .call(brush)
    .selectAll('rect')
      .attr("y", -6)
      .attr("height", brushHeight - margins.bottom - margins.top + 7)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      xBrushScaleSet,
      yBrushScaleSet,
      brushSet
    } = nextState;

    if(xBrushScaleSet && yBrushScaleSet && brushSet) {
      return false;
    }

    if(xBrushScaleSet && yBrushScaleSet) {
      // x brush scale set is set
      // y brush scale set is set
      // and the brush is not set
      this._mkContent(nextState);

      this.setState({
        brushSet: true
      });
    }

    return true;
  }

  render() {
    const {
      xBrushScaleSet,
      yBrushScaleSet,
    } = this.state;

    const {
      brushHeight,
      yBrushRange,
      brushType,
      margins,
      chartSeriesData
    } = this.props;

    var {
      height,
      yRange,
      showYAxis,
      yLabel,
      ...otherProps
    } = this.props;

    if(xBrushScaleSet && yBrushScaleSet) {
      if(brushType === 'line') {
        var brushChart = chartSeriesData.map((d, i) => {
          if(d.area) {
            // area chart
            return <AreaSimple dataset={d} key={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
          } else {
            // simple line chart
            return <Line dataset={d} key={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
          }
        })
      }else if(brushType === 'scatter') {
        var brushChart = chartSeriesData.map((d, i) => {
          return <Scatter dataset={d} key={i} brushSymbol={true} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps} />
        })
      }else if(brushType === 'area_stack') {
        var brushChart = <AreaStack height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} dataset={chartSeriesData} {...otherProps} />
      }else if(brushType === 'bar') {
        var brushChart = chartSeriesData.map((d, i) => {
          return <Bar dataset={d} key={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
        })
      }else if(brushType === 'bar_group') {
        // settings x1
        var x1 = d3.scale.ordinal();

        // mapping x1, inner x axis
        x1.domain(chartSeriesData.map((d) => { return d.field}))
          .rangeRoundBands([0, xBrushScaleSet.rangeBand()]);

        var brushChart = chartSeriesData.map((d, i) => {
          return <BarGroup x1={x1} dataset={d} key={i} count={i} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps} />
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

          return <BarStack stackVal={stackObj} dataset={d} key={j} count={j} height={brushHeight} yScaleSet={yBrushScaleSet} xScaleSet={xBrushScaleSet} {...otherProps}/>
        })
      }
    }

    return (
      <Svg height={brushHeight} margins={margins}>
        <g ref="brushComponentGroup">
          {brushChart}
          <Xaxis height={brushHeight} {...otherProps} setScale={this.setBrushScale} />
          <Yaxis height={brushHeight} yRange={yBrushRange} showYAxis={false} yLabel={false} {...otherProps} setScale={this.setBrushScale}/>
          <g ref="brushRect" className="react-d3-basic__brush__rect"></g>
        </g>
      </Svg>
    )
  }
}
