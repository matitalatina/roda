import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chain } from 'lodash'
import { Well, Form, FormGroup, InputGroup } from 'react-bootstrap'
import moment from 'moment'
import Datetime from 'react-datetime'
import TyreCharts from '../../molecules/TyreCharts'
import TyreMeasurement from '../../../models/TyreMeasurement'
import SelectCar from '../../atoms/SelectCar'
import Car from '../../../models/Car'
import Paginator from '../../atoms/Paginator'
import DateUtils from '../../../utils/DateUtils'

const Wrapper = styled.div``

const StackHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

const InputGroupSpaced = styled(InputGroup) `
  min-width: 150px;
  margin-right: 20px;
`

const TyreHistory = ({ cars, tyres }) => {
  const groupedMeasurements = chain(tyres.measurements)
    .groupBy(t => t.timestamp.format(DateUtils.DEFAULT_FORMAT))
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
        width={550}
      />
    ))

  return (
    <Wrapper>
      <Well bsSize="small">
        <Form inline>
          <InputGroupSpaced >
            <SelectCar
              onCarSelected={cars.onSelected}
              selectedCar={cars.selected}
              availableCars={cars.available}
            />
          </InputGroupSpaced>
          <FormGroup>
            <Datetime
              value={tyres.filters.dateMin}
              onChange={tyres.filters.onDateMinChange}
              utc
              dateFormat={DateUtils.DEFAULT_DATE_FORMAT}
              timeFormat={DateUtils.DEFAULT_TIME_FORMAT}
              inputProps={{
                placeholder: 'Timestamp Min',
              }}
            />
          </FormGroup>
          &nbsp; - &nbsp;
          <FormGroup>
            <Datetime
              value={tyres.filters.dateMax}
              onChange={tyres.filters.onDateMaxChange}
              utc
              dateFormat={DateUtils.DEFAULT_DATE_FORMAT}
              timeFormat={DateUtils.DEFAULT_TIME_FORMAT}
              inputProps={{
                placeholder: 'Timestamp Max',
              }}
            />
          </FormGroup>
          <InputGroup className="pull-right">
            <Paginator
              hasNext={tyres.hasNext}
              hasPrev={tyres.hasPrev}
              onNext={tyres.onNext}
              onPrev={tyres.onPrev}
            />
          </InputGroup>
        </Form>
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
    hasPrev: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    filters: PropTypes.shape({
      onDateMinChange: PropTypes.func.isRequired,
      onDateMaxChange: PropTypes.func.isRequired,
      dateMin: PropTypes.instanceOf(moment),
      dateMax: PropTypes.instanceOf(moment),
    }).isRequired,
    measurements: PropTypes.arrayOf(PropTypes.instanceOf(TyreMeasurement)).isRequired,
  }),
}

export default TyreHistory
