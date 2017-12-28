import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Car from '../../../models/Car'

const SelectCar = ({ onCarSelected, selectedCar, availableCars }) => {
  return (
    <Select
      name="selected-car"
      value={selectedCar && selectedCar.id}
      onChange={selectedOption => onCarSelected(selectedOption.value)}
      options={availableCars.map(c => ({ value: c.id, label: c.id }))}
      clearable={false}
    />
  )
}

SelectCar.propTypes = {
  onCarSelected: PropTypes.func.isRequired,
  selectedCar: PropTypes.instanceOf(Car),
  availableCars: PropTypes.arrayOf(PropTypes.instanceOf(Car)).isRequired,
}

export default SelectCar
