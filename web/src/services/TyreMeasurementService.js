import URI from 'urijs'
import { coreEndpoint } from '../config'
import TyreMeasurement from '../models/TyreMeasurement'

class TyreMeasurementService {
  constructor({ endpoint }) {
    this.endpoint = endpoint
  }

  list({
    url = null,
    carId = null,
    timestampMax = null, timestampMin = null,
  } = {}) {
    let callUrl
    if (!url) {
      callUrl = URI(`${this.endpoint}/api/monitoring/tyres/measurements/`)
    } else {
      callUrl = URI(url)
    }
    if (carId) {
      callUrl = callUrl.setQuery('car', carId)
    }
    if (timestampMax) {
      callUrl = callUrl.setQuery('timestamp_max', timestampMax.toISOString())
    }
    if (timestampMin) {
      callUrl = callUrl.setQuery('timestamp_min', timestampMin.toISOString())
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
