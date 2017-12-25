import csv
from datetime import datetime

from monitoring import constants
from monitoring.models import TyreMeasurement

FIELD_TIMESTAMP = 'Timestamp'
FIELD_PRESSURE = 'Press'
FIELD_POSITION = 'Position'
FIELD_TEMPERATURE = 'Temp'
FIELD_ANGULAR_VELOCITY = 'Omega'
FIELD_SPEED = 'Speed'
FIELD_CAR_ID = 'Car_id'

FIELD_TIMESTAMP_FORMAT = '%Y-%m-%d %H:%M:%S'


class PositionNotValidError(Exception):
    pass


class CannotImportMeasurement(Exception):
    def __init__(self, *args, **kwargs):
        self.row = kwargs.pop('row')
        super(CannotImportMeasurement, self).__init__(*args, **kwargs)


class TyreCsvLoader(object):
    def __init__(self, file_path):
        self.file_path = file_path

    def load_into_db(self):
        with open(self.file_path, newline='') as csvfile:
            tyre_reader = csv.DictReader(csvfile)
            try:
                measurements = [self._translate_row(row) for row in tyre_reader]
                TyreMeasurement.objects.bulk_create(measurements)
            except CannotImportMeasurement as e:
                print('Error in row {}'.format(e.row.items()))

    @staticmethod
    def _translate_position(raw_position):
        position_map = {
            'Front Left': constants.TYRE_POSITION_FRONT_LEFT,
            'Front Rigth': constants.TYRE_POSITION_FRONT_RIGHT,
            'Rear Left': constants.TYRE_POSITION_REAR_LEFT,
            'Rear Rigth': constants.TYRE_POSITION_REAR_RIGHT,
        }
        position = position_map.get(raw_position)
        if not position:
            raise PositionNotValidError()
        return position

    @classmethod
    def _translate_row(cls, row):
        try:
            return TyreMeasurement(
                timestamp=datetime.strptime(row[FIELD_TIMESTAMP], FIELD_TIMESTAMP_FORMAT),
                position=cls._translate_position(row[FIELD_POSITION]),
                pressure=row[FIELD_PRESSURE] or None,
                temperature=row[FIELD_TEMPERATURE] or None,
                omega=row[FIELD_ANGULAR_VELOCITY],
                speed=row[FIELD_SPEED],
                car=row[FIELD_CAR_ID],
            )
        except ValueError:
            raise CannotImportMeasurement(row=row)
