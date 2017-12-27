import React, { Component } from 'react'
import CarService from '../../services/CarService'
import TyreMeasurementService from '../../services/TyreMeasurementService'
import TyreHistory from '../../components/molecules/TyreHistory'

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
  }

  componentDidMount() {
    const carsService = CarService.fromConfig()
    return carsService.list()
      .then((response) => {
        this.setState({ ...this.state, cars: { ...this.state.cars, carsResponse: response, selected: response.results[0] } })
        return response
      })
      .then(this.fetchMeasurements)
  }

  fetchMeasurements(carsResponse) {
    if (this.state.cars.selected) {
      const measurementService = TyreMeasurementService.fromConfig()
      return measurementService.list({ carId: this.state.cars.selected.id })
        .then((measurementsResponse) => {
          this.setState({ ...this.state, tyres: { ...this.state.tyres, response: measurementsResponse } })
        })
    }
    return carsResponse
  }

  render() {
    const tyres = {
      measurements: this.state.tyres.response.results,
    }
    return (
      <TyreHistory tyres={tyres} />
    )
  }
}

export default TyreHistoryContainer
