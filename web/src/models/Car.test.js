import Car from './Car'

describe('Car model', () => {
  it('should instantiate by fromJs method', () => {
    const carId = 'Alfa Romeo Giulia'
    const carRaw = {
      id: carId,
    }
    const car = Car.fromJs(carRaw)
    expect(car.id).toEqual(carId)
  })
})
