from datetime import datetime

from django.test import TestCase

from monitoring.models import TyreMeasurement
from monitoring.serializers import TyreMeasurementSerializer
from monitoring.tests.fixtures import load_tyre_measurements


class TyreMeasurementSerializerTestCase(TestCase):
    def test_representation(self):
        load_tyre_measurements()
        measurement = TyreMeasurement.objects.all().first()
        serializer_data = TyreMeasurementSerializer(measurement).data
        self.assertEqual(datetime.strptime(serializer_data['timestamp'], '%Y-%m-%dT%H:%M:%S'), measurement.timestamp)
        expected_fields = [
            'position',
            'pressure',
            'temperature',
            'omega',
            'speed',
            'car',
        ]
        for field in expected_fields:
            self.assertEqual(serializer_data[field], getattr(measurement, field))
