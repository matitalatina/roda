import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TyreCharts from '../TyreCharts'
import TyreMeasurement from '../../../models/TyreMeasurement'

const Wrapper = styled.div``

const TyreHistory = ({ tyres }) => {
  return (
    <Wrapper>
      <TyreCharts tyreMeasurements={tyres.measurements.filter(t => t.position === 'FL')} />
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
