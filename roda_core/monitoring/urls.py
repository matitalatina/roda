from monitoring.views.apis.measurements import TyreMeasurementViewSet
from roda_core.urls import router

app_name = 'monitoring'

router.register(r'monitoring/tyre/measurements', TyreMeasurementViewSet, base_name='tyre-measurements')

urlpatterns = []
