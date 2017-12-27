import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactHighcharts from 'react-highcharts'
import TyreMeasurement from '../../../models/TyreMeasurement'

const Wrapper = styled.div``

const TyreCharts = ({ tyreMeasurements }) => {
  const chartConfig = {
    xAxis: {
      categories: tyreMeasurements.map(t => t.timestamp),
    },
    series: [{
      name: 'Pressure',
      data: tyreMeasurements.map(t => t.pressure),
      tooltip: {
        valueDecimals: 2,
      },
    }],
  }
  return (
    <Wrapper>
      <ReactHighcharts config={chartConfig} />
    </Wrapper>
  )
}

TyreCharts.propTypes = {
  tyreMeasurements: PropTypes.arrayOf(PropTypes.instanceOf(TyreMeasurement)),
}

export default TyreCharts
