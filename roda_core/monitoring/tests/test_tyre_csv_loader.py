from datetime import datetime

from django.test import TestCase

from monitoring.constants import TYRE_POSITION_FRONT_LEFT
from monitoring.loaders.tyre_csv_loader import TyreCsvLoader
from monitoring.models import TyreMeasurement
from monitoring.tests.fixtures import TEST_CSV_PATH


class TyreCsvLoaderTestCase(TestCase):
    def test_load_in_db(self):
        loader = TyreCsvLoader(file_path=TEST_CSV_PATH)
        loader.load_into_db()
        measurements = TyreMeasurement.objects.all()
        self.assertEqual(len(measurements), 8)
        measurement = measurements.get(
            timestamp=datetime(2017, 8, 8, 0, 0, 0),
            position=TYRE_POSITION_FRONT_LEFT,
            car='Fiat 500',
        )
        self.assertEqual(measurement.pressure, 2.54999995232)
        self.assertEqual(measurement.speed, 51.0111111535)
        self.assertEqual(measurement.omega, 45.4199999641)
        self.assertEqual(measurement.temperature, 9.0)
