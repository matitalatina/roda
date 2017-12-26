from datetime import datetime

from django.urls import reverse
from rest_framework import status
from rest_framework.fields import DateTimeField
from rest_framework.test import APITestCase

from monitoring.models import TyreMeasurement
from monitoring.serializers import TyreMeasurementSerializer
from monitoring.tests.fixtures import load_tyre_measurements, load_tyre_measurement


class TyreMeasurementViewSetTestCase(APITestCase):
    def setUp(self):
        self.measurements = load_tyre_measurements()

    def test_get_list(self):
        response = self.client.get(reverse('tyre-measurements-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results']
        self.assertEqual(
            results,
            TyreMeasurementSerializer(TyreMeasurement.objects.all().order_by('-timestamp'), many=True).data
        )

    def test_timestamp_max_filter(self):
        old_timestamp = load_tyre_measurement(
            timestamp=datetime(2013, 1, 1)
        )
        response = self.client.get(reverse('tyre-measurements-list'),
                                   dict(timestamp_max=DateTimeField().to_representation(datetime(2013, 8, 4))))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results']
        self.assertEqual(len(results), 1)
        self.assertEqual(results, [TyreMeasurementSerializer(old_timestamp).data])

    def test_timestamp_min_filter(self):
        old_timestamp = load_tyre_measurement(
            timestamp=datetime(2030, 1, 1)
        )
        response = self.client.get(reverse('tyre-measurements-list'),
                                   dict(timestamp_min=DateTimeField().to_representation(datetime(2020, 8, 4))))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results']
        self.assertEqual(len(results), 1)
        self.assertEqual(results, [TyreMeasurementSerializer(old_timestamp).data])

    def test_car_filter(self):
        car_id = 'Alfa Romeo Giulia'
        car_measurement = load_tyre_measurement(
            car=car_id,
        )
        response = self.client.get(reverse('tyre-measurements-list'),
                                   dict(car=car_id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results']
        self.assertEqual(len(results), 1)
        self.assertEqual(results, [TyreMeasurementSerializer(car_measurement).data])

    def test_timestamp_ordering(self):
        response = self.client.get(reverse('tyre-measurements-list'),
                                   dict(ordering='timestamp'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results']
        self.assertEqual(
            results,
            TyreMeasurementSerializer(TyreMeasurement.objects.all().order_by('timestamp'), many=True).data
        )


class CarViewSetTestCase(APITestCase):
    def setUp(self):
        self.measurements = load_tyre_measurements()

    def test_get_list(self):
        response = self.client.get(reverse('cars-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_cars = set(TyreMeasurement.objects.all().values_list('car', flat=True))
        self.assertEqual({car['id'] for car in response.data['results']}, expected_cars)
