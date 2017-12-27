import moment from 'moment'

class TyreMeasurement {
  constructor({
    timestamp, position, pressure, temperature, omega, speed, car,
  }) {
    Object.assign(this, {
      timestamp, position, pressure, temperature, omega, speed, car,
    })
  }

  static fromJs({
    timestamp, position, pressure, temperature, omega, speed, car,
  }) {
    const dateTimestamp = moment(timestamp)
    return new TyreMeasurement({
      timestamp: dateTimestamp, position, pressure, temperature, omega, speed, car,
    })
  }
}

export default TyreMeasurement
