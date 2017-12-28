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
  }

  componentDidMount() {
    const carsService = CarService.fromConfig()
    return carsService.list()
      .then((response) => {
        this.setState({ ...this.state, cars: { ...this.state.cars, response, selected: response.results[0] } })
        return response
      })
      .then(() => this.fetchMeasurements(this.state.cars.selected))
  }

  onNextMeasurements() {
    return this.onPaginatorMeasurements('previous')
  }

  onPrevMeasurements() {
    return this.onPaginatorMeasurements('next')
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

  fetchMeasurements(car) {
    if (car) {
      const measurementService = TyreMeasurementService.fromConfig()
      return measurementService.list({ carId: car.id })
        .then(this.setMeasurementResponseState)
    }
    return car
  }

  selectCar(carId) {
    const selectedCar = find(this.state.cars.response.results, c => c.id === carId)
    this.setState({ ...this.state, cars: { ...this.state.cars, selected: selectedCar } })
    return this.fetchMeasurements(selectedCar)
  }

  render() {
    const tyres = {
      measurements: this.state.tyres.response.results,
      hasNext: !!this.state.tyres.response.previous,
      hasPrev: !!this.state.tyres.response.next,
      onNext: this.onNextMeasurements,
      onPrev: this.onPrevMeasurements,
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
