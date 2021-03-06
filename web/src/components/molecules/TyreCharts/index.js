import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { values, startCase } from 'lodash'
import ReactHighcharts from 'react-highcharts'
import TyreMeasurement from '../../../models/TyreMeasurement'
import TyrePositionUtils from '../../../utils/TyrePositionUtils'

const Wrapper = styled.div``

const TyreCharts = ({ groupedMeasurements, property, width }) => {
  const chartConfig = {
    title: {
      text: startCase(property),
    },
    chart: {
      width,
    },
    xAxis: {
      categories: groupedMeasurements.map(m => m[0]),
    },
    tooltip: {
      shared: true,
    },
    series: TyrePositionUtils.getAvailablePositions().map(position => ({
      name: TyrePositionUtils.getLabel(position),
      color: TyrePositionUtils.getColor(position),
      data: values(groupedMeasurements).map(m => m[1]).map(groupedTyres => groupedTyres[position] ? groupedTyres[position][property] || 0 : 0),
      tooltip: {
        valueDecimals: 2,
      },
    })),
  }
  return (
    <Wrapper>
      <ReactHighcharts config={chartConfig} isPureConfig />
    </Wrapper>
  )
}

/*
 * [[<timestamp>, {<position>: <TyreMeasurement>, ...}]]
*/
TyreCharts.propTypes = {
  groupedMeasurements: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.instanceOf(TyreMeasurement)),
  ]))).isRequired,
  property: PropTypes.oneOf(TyreMeasurement.AVAILABLE_MEASUREMENTS).isRequired,
  width: PropTypes.number,
}

TyreCharts.defaultProps = {
  width: null,
}

export default TyreCharts
