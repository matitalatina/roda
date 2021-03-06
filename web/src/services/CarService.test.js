import CarsService from './CarService'
import { coreEndpoint } from '../config'

describe('CarsService', () => {
  it('should instantiate using config file', () => {
    const carsService = CarsService.fromConfig()
    expect(carsService.endpoint).toEqual(coreEndpoint)
  })
})
