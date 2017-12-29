import React, { Component } from 'react'
import { find } from 'lodash'
import CarService from '../../services/CarService'
import TyreMeasurementService from '../../services/TyreMeasurementService'
import TyreHistory from '../../components/organisms/TyreHistory'

class TyreHistoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: {
        selected: null,
        response: { results: [] },
      },
      tyres: {
        filters: {
          dateMax: null,
          dateMin: null,
        },
        response: {
          next: null,
          previous: null,
          results: [],
        },
      },
    }
    this.fetchMeasurements = this.fetchMeasurements.bind(this)
    this.selectCar = this.selectCar.bind(this)
    this.setMeasurementResponseState = this.setMeasurementResponseState.bind(this)
    this.onNextMeasurements = this.onNextMeasurements.bind(this)
    this.onPrevMeasurements = this.onPrevMeasurements.bind(this)
    this.onPaginatorMeasurements = this.onPaginatorMeasurements.bind(this)
    this.onTyreDateMinChange = this.onTyreDateMinChange.bind(this)
    this.onTyreDateMaxChange = this.onTyreDateMaxChange.bind(this)
  }

  componentDidMount() {
    const carsService = CarService.fromConfig()
    return carsService.list()
      .then((response) => {
        this.setState({ ...this.state, cars: { ...this.state.cars, response, selected: response.results[0] } })
        return response
      })
      .then(() => this.fetchMeasurements({ carId: this.state.cars.selected.id }))
  }

  onNextMeasurements() {
    return this.onPaginatorMeasurements('previous')
  }

  onPrevMeasurements() {
    return this.onPaginatorMeasurements('next')
  }

  onTyreDateChange(property, value) {
    const tyresFilters = {
      ...this.state.filters,
      [property]: value,
    }
    return this.fetchMeasurements({ timestampMin: tyresFilters.dateMin, timestampMax: tyresFilters.dateMax })
      .then(() =>
        this.setState({
          ...this.state,
          tyres: {
            ...this.state.tyres,
            filters: tyresFilters,
          },
        }))
  }

  onTyreDateMaxChange(value) {
    return this.onTyreDateChange('dateMax', value)
  }

  onTyreDateMinChange(value) {
    return this.onTyreDateChange('dateMin', value)
  }

  onPaginatorMeasurements(property) {
    if (this.state.tyres.response[property]) {
      return TyreMeasurementService.fromConfig()
        .list({ url: this.state.tyres.response[property] })
        .then(this.setMeasurementResponseState)
    }
    return Promise.resolve(null)
  }

  setMeasurementResponseState(measurementsResponse) {
    this.setState({ ...this.state, tyres: { ...this.state.tyres, response: measurementsResponse } })
    return measurementsResponse
  }

  fetchMeasurements({
    carId = this.state.cars.selected.id,
    timestampMin = this.state.tyres.filters.dateMin,
    timestampMax = this.state.tyres.filters.dateMax,
  }) {
    if (carId) {
      const measurementService = TyreMeasurementService.fromConfig()
      const params = {
        carId,
        timestampMin,
        timestampMax,
      }
      return measurementService.list(params)
        .then(this.setMeasurementResponseState)
    }
    return Promise.resolve(null)
  }

  selectCar(carId) {
    const selectedCar = find(this.state.cars.response.results, c => c.id === carId)
    return this.fetchMeasurements({ carId: selectedCar.id })
      .then(() => this.setState({ ...this.state, cars: { ...this.state.cars, selected: selectedCar } }))
  }

  render() {
    const tyres = {
      measurements: this.state.tyres.response.results,
      hasNext: !!this.state.tyres.response.previous,
      hasPrev: !!this.state.tyres.response.next,
      onNext: this.onNextMeasurements,
      onPrev: this.onPrevMeasurements,
      filters: {
        ...this.state.filters,
        onDateMaxChange: this.onTyreDateMaxChange,
        onDateMinChange: this.onTyreDateMinChange,
      },
    }
    const cars = {
      onSelected: this.selectCar,
      selected: this.state.cars.selected,
      available: this.state.cars.response.results,
    }

    return (
      <TyreHistory
        tyres={tyres}
        cars={cars}
      />
    )
  }
}

export default TyreHistoryContainer
