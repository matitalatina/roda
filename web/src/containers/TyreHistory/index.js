import React, { Component } from 'react'
import CarsService from '../../services/cars'

class TyreHistoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: {
        response: { results: [] },
      },
      tyres: {
        filters: { car: null },
        response: { results: [] },
      },
    }
  }

  componentDidMount() {
    const carsService = CarsService.fromConfig()
    return carsService.list()
      .then((response) => {
        this.setState({ ...this.state, cars: { ...this.state.cars, carsResponse: response } })
      })
  }

  render() {
    return (
      <div>
        Root
      </div>
    )
  }
}

export default TyreHistoryContainer
