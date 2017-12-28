import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chain } from 'lodash'
import { Well } from 'react-bootstrap'
import TyreCharts from '../../molecules/TyreCharts'
import TyreFilters from '../../molecules/TyreFilters'
import TyreMeasurement from '../../../models/TyreMeasurement'
import SelectCar from '../../molecules/SelectCar'
import Car from '../../../models/Car'

const Wrapper = styled.div``

const StackHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const TyreHistory = ({ cars, tyres }) => {
  const groupedMeasurements = chain(tyres.measurements)
    .groupBy(t => t.timestamp.format('YYYY-MM-DD HH:mm'))
    .mapValues(measurements =>
      measurements.reduce((acc, m) => {
        acc[m.position] = m
        return acc
      }, {}))
    .toPairs()
    .orderBy(([timestamp]) => timestamp)
    .value()

  const charts = TyreMeasurement.AVAILABLE_MEASUREMENTS
    .map(measurement => (
      <TyreCharts
        groupedMeasurements={groupedMeasurements}
        property={measurement}
        key={measurement}
        width={500}
      />
    ))

  return (
    <Wrapper>
      <Well bsSize="small">
        <SelectCar
          onCarSelected={cars.onSelected}
          selectedCar={cars.selected}
          availableCars={cars.available}
        />
      </Well>
      <StackHorizontal>
        {charts}
      </StackHorizontal>
    </Wrapper>
  )
}

TyreHistory.propTypes = {
  cars: PropTypes.shape({
    onSelected: PropTypes.func.isRequired,
    selected: PropTypes.instanceOf(Car),
    available: PropTypes.arrayOf(PropTypes.instanceOf(Car)).isRequired,
  }).isRequired,
  tyres: PropTypes.shape({
    hasPrev: PropTypes.bool,
    hasNext: PropTypes.bool,
    measurements: PropTypes.arrayOf(PropTypes.instanceOf(TyreMeasurement)).isRequired,
  }),
}

export default TyreHistory
