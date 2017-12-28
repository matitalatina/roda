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
        response: { results: [] },
      },
    }
    this.fetchMeasurements = this.fetchMeasurements.bind(this)
    this.selectCar = this.selectCar.bind(this)
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

  fetchMeasurements(car) {
    if (car) {
      const measurementService = TyreMeasurementService.fromConfig()
      return measurementService.list({ carId: car.id })
        .then((measurementsResponse) => {
          this.setState({ ...this.state, tyres: { ...this.state.tyres, response: measurementsResponse } })
        })
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
