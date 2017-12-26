from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from monitoring.models import TyreMeasurement
from monitoring.serializers import CarSerializer
from monitoring.viewmodels import Car


class CarViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = TyreMeasurement.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset()).values_list('car', flat=True).distinct('car')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CarSerializer(self._to_cars(page), many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CarSerializer(self._to_cars(queryset), many=True)
        return Response(serializer.data)

    @staticmethod
    def _to_cars(queryset):
        return [Car(id=car_id) for car_id in queryset]
