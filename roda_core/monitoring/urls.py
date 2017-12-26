from monitoring.views.apis.cars import CarViewSet
from monitoring.views.apis.measurements import TyreMeasurementViewSet
from roda_core.urls import router

app_name = 'monitoring'

router.register(r'cars', CarViewSet, base_name='cars')
router.register(r'monitoring/tyres/measurements', TyreMeasurementViewSet, base_name='tyre-measurements')

urlpatterns = []
