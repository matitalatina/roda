from rest_framework import serializers

from monitoring.models import TyreMeasurement


class TyreMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TyreMeasurement
        fields = '__all__'
