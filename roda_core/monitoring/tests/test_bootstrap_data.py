from django.test import TestCase

from monitoring.management.commands.bootstrap_data import Command
from monitoring.models import TyreMeasurement
from monitoring.tests.fixtures import TEST_CSV_PATH


class BootstrapDataTestCase(TestCase):
    def test_load_data(self):
        self.assertFalse(TyreMeasurement.objects.all().exists())
        command = Command()
        command.handle(csv_path=TEST_CSV_PATH)
        self.assertTrue(TyreMeasurement.objects.all().exists())
        measurement_count = TyreMeasurement.objects.all().count()
        command.handle(csv_path=TEST_CSV_PATH)
        self.assertEqual(TyreMeasurement.objects.all().count(), measurement_count)
