from django.db import models


class TyreMeasurement(models.Model):

    timestamp = models.DateTimeField(
        auto_add_now=True,
        verbose_name='Timestamp',
    )
    position = models.CharField(
        max_length=2,
    )
    pressure = models.FloatField(
        verbose_name='Pressure [bar]',
    )
    temperature = models.FloatField(
        verbose_name='Temperature [C˚]',
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
