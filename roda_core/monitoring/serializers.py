from rest_framework import serializers

from monitoring.models import TyreMeasurement


class TyreMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TyreMeasurement
        fields = '__all__'


class CarSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=255)
