class Car {
  constructor({ id }) {
    this.id = id
  }

  static fromJs({ id }) {
    return new Car({ id })
  }
}

export default Car