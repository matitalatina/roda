import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chain } from 'lodash'
import TyreCharts from '../TyreCharts'
import TyreMeasurement from '../../../models/TyreMeasurement'

const Wrapper = styled.div``

const TyreHistory = ({ tyres }) => {
  const groupedMeasurements = chain(tyres.measurements)
    .groupBy(t => t.timestamp)
    .mapValues(measurements =>
      measurements.reduce((acc, m) => {
        acc[m.position] = m
        return acc
      }, {}))
    .toPairs()
    .orderBy(([timestamp]) => timestamp)
    .value()

  const charts = TyreMeasurement.AVAILABLE_MEASUREMENTS
    .map(measurement => <TyreCharts groupedMeasurements={groupedMeasurements} property={measurement} key={measurement} />)
  return (
    <Wrapper>
      {charts}
    </Wrapper>
  )
}

TyreHistory.propTypes = {
  tyres: PropTypes.shape({
    hasPrev: PropTypes.bool,
    hasNext: PropTypes.bool,
    measurements: PropTypes.arrayOf(PropTypes.instanceOf(TyreMeasurement)).isRequired,
  }),
}

export default TyreHistory
