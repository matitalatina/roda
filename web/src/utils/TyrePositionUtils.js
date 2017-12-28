const TYRE_POSITION_FRONT_LEFT = 'FL'
const TYRE_POSITION_FRONT_RIGHT = 'FR'
const TYRE_POSITION_REAR_LEFT = 'RL'
const TYRE_POSITION_REAR_RIGHT = 'RR'

const TYRE_POSITION_FRONT_LEFT_LABEL = 'Front Left'
const TYRE_POSITION_FRONT_RIGHT_LABEL = 'Front Right'
const TYRE_POSITION_REAR_LEFT_LABEL = 'Rear Left'
const TYRE_POSITION_REAR_RIGHT_LABEL = 'Rear Right'

const positionMap = {
  [TYRE_POSITION_FRONT_LEFT]: {
    color: '#E94858',
    label: TYRE_POSITION_FRONT_LEFT_LABEL,
  },
  [TYRE_POSITION_FRONT_RIGHT]: {
    color: '#F3A32A',
    label: TYRE_POSITION_FRONT_RIGHT_LABEL,
  },
  [TYRE_POSITION_REAR_LEFT]: {
    color: '#3CB4CB',
    label: TYRE_POSITION_REAR_LEFT_LABEL,
  },
  [TYRE_POSITION_REAR_RIGHT]: {
    color: '#16434B',
    label: TYRE_POSITION_REAR_RIGHT_LABEL,
  },
}

class TyrePositionUtils {
  static getColor(positionCode) {
    return positionMap[positionCode].color
  }
  static getLabel(positionCode) {
    return positionMap[positionCode].label
  }
}

export default TyrePositionUtils
