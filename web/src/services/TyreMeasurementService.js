import URI from 'urijs'
import { coreEndpoint } from '../config'
import TyreMeasurement from '../models/TyreMeasurement'

class TyreMeasurementService {
  constructor({ endpoint }) {
    this.endpoint = endpoint
  }

  list({ url = null, carId = null } = {}) {
    let callUrl
    if (!url) {
      callUrl = URI(`${this.endpoint}/api/monitoring/tyres/measurements/`)
    } else {
      callUrl = URI(callUrl)
    }
    if (carId) {
      callUrl = callUrl.setQuery('car', carId)
    }
    return fetch(callUrl)
      .then(response => response.json())
      .then((data) => {
        const transformedData = data
        transformedData.results = transformedData.results.map(t => TyreMeasurement.fromJs(t))
        return transformedData
      })
  }

  static fromConfig() {
    return new TyreMeasurementService({ endpoint: coreEndpoint })
  }
}

export default TyreMeasurementService
