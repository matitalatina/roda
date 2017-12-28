import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'react-bootstrap'

const Paginator = ({
  hasPrev, hasNext, onPrev, onNext,
}) => {
  return (
    <ButtonGroup>
      <Button disabled={!hasPrev} onClick={onPrev}><i className="fa fa-angle-double-left" aria-hidden="true" /></Button>
      <Button disabled={!hasNext} onClick={onNext}><i className="fa fa-angle-double-right" aria-hidden="true" /></Button>
    </ButtonGroup>
  )
}

Paginator.propTypes = {
  hasPrev: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default Paginator
