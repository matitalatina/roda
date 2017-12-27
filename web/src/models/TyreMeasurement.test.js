import moment from 'moment'
import TyreMeasurement from './TyreMeasurement'
import { rawTyreMeasurement } from '../tests/fixtures'

describe('TyreMeasurement model', () => {
  it('creates TyreMeasurement from JS Object', () => {
    const measurement = TyreMeasurement.fromJs(rawTyreMeasurement)
    expect(measurement.timestamp).toEqual(moment(rawTyreMeasurement.timestamp))
  })
})
