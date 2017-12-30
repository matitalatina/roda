from datetime import datetime

from django.db import models

from monitoring.constants import TYRE_POSITIONS


class TyreMeasurement(models.Model):

    timestamp = models.DateTimeField(
        default=datetime.now,
        verbose_name='Timestamp',
    )
    position = models.CharField(
        max_length=2,
        choices=TYRE_POSITIONS,
    )
    pressure = models.FloatField(
        verbose_name='Pressure [bar]',
        blank=True, null=True,
    )
    temperature = models.FloatField(
        verbose_name='Temperature [C˚]',
        blank=True, null=True,
    )
    omega = models.FloatField(
        verbose_name='Angular Velocity',
    )
    speed = models.FloatField(
        verbose_name='Speed [km/h]'
    )
    car = models.CharField(
        max_length=255,
        verbose_name='Car',
    )

    def __str__(self):
        return '{}, {}, {}'.format(self.car, self.timestamp, dict(TYRE_POSITIONS)[self.position])
