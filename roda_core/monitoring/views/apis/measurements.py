import django_filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework import filters
from rest_framework import viewsets

from monitoring.models import TyreMeasurement
from monitoring.serializers import TyreMeasurementSerializer


class TyreMeasurementFilter(FilterSet):
    timestamp_min = django_filters.IsoDateTimeFilter(name='timestamp', lookup_expr='gte')
    timestamp_max = django_filters.IsoDateTimeFilter(name='timestamp', lookup_expr='lte')

    class Meta:
        model = TyreMeasurement
        fields = ('timestamp', 'car', 'position', 'timestamp_min', 'timestamp_max')


class TyreMeasurementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TyreMeasurement.objects.all()
    serializer_class = TyreMeasurementSerializer
    permission_classes = []
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filter_class = TyreMeasurementFilter
    search_fields = ('car',)
    ordering_fields = ('timestamp',)
    ordering = ('-timestamp',)
