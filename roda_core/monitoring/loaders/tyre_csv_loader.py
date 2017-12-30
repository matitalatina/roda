import csv
from datetime import datetime

from tqdm import tqdm

from monitoring import constants
from monitoring.constants import FIELD_TIMESTAMP_FORMAT
from monitoring.models import TyreMeasurement

FIELD_TIMESTAMP = 1
FIELD_PRESSURE = 2
FIELD_POSITION = 3
FIELD_TEMPERATURE = 4
FIELD_ANGULAR_VELOCITY = 5
FIELD_SPEED = 6
FIELD_CAR_ID = 7


class PositionNotValidError(Exception):
    pass


class CannotImportMeasurement(Exception):
    def __init__(self, *args, **kwargs):
        self.row = kwargs.pop('row')
        super(CannotImportMeasurement, self).__init__(*args, **kwargs)


class TyreCsvLoader(object):
    """
    Loads TyreMeasurements model from CSV file.

    Expected CSV structure:
    id (Not used),Timestamp ['%Y-%m-%d %H:%M:%S'],Press,Position,Temp,Omega,Speed,Car_id
    """
    def __init__(self, file_path, show_progress=False):
        self.file_path = file_path
        self.show_progress = show_progress

    def load_into_db(self):
        with open(self.file_path, newline='') as csvfile:
            tyre_reader = csv.reader(csvfile)
            try:
                # Skip header
                next(tyre_reader)
                if self.show_progress:
                    total_count = sum(1 for _ in open(self.file_path))
                    tyre_reader = tqdm(tyre_reader, total=total_count, desc='Reading CSV data')
                measurements = [self._translate_row(row) for row in tyre_reader]

                self._print('Saving into DB...')
                TyreMeasurement.objects.bulk_create(measurements, batch_size=10000)
                self._print('Import complete!')

            except CannotImportMeasurement as e:
                self._print('Error in row {}'.format(e.row))

    def _print(self, message):
        if self.show_progress:
            print(message)

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
                pressure=abs(float(row[FIELD_PRESSURE])) if row[FIELD_PRESSURE] else None,
                temperature=row[FIELD_TEMPERATURE] or None,
                omega=abs(float(row[FIELD_ANGULAR_VELOCITY])),
                speed=row[FIELD_SPEED],
                car=row[FIELD_CAR_ID],
            )
        except ValueError:
            raise CannotImportMeasurement(row=row)
