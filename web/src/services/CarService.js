import { coreEndpoint } from '../config'
import Car from '../models/Car'

class CarsService {
  constructor({ endpoint }) {
    this.endpoint = endpoint
  }

  list({ url = null } = {}) {
    let callUrl = url
    if (!callUrl) {
      callUrl = `${this.endpoint}/api/cars/`
    }
    return fetch(callUrl)
      .then(response => response.json())
      .then((data) => {
        const transformedData = data
        transformedData.results = transformedData.results.map(t => Car.fromJs(t))
        return transformedData
      })
  }

  static fromConfig() {
    return new CarsService({ endpoint: coreEndpoint })
  }
}

export default CarsService
