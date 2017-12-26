from datetime import datetime

from monitoring import constants
from monitoring.loaders.tyre_csv_loader import TyreCsvLoader
from monitoring.models import TyreMeasurement

TEST_CSV_PATH = 'monitoring/tests/data/test_measurements.csv'


def load_tyre_measurements():
    TyreCsvLoader(file_path=TEST_CSV_PATH).load_into_db()


def load_tyre_measurement(timestamp=None, pressure=2.5, position=constants.TYRE_POSITION_FRONT_LEFT, temperature=45.7,
                          omega=41.1, speed=51.1, car='Alfa Romeo Giulia'):
    if timestamp is None:
        timestamp = datetime.utcnow()
    return TyreMeasurement.objects.create(
        timestamp=timestamp,
        pressure=pressure,
        position=position,
        temperature=temperature,
        omega=omega,
        speed=speed,
        car=car,
    )
