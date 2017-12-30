from django.contrib import admin

from monitoring.models import TyreMeasurement


@admin.register(TyreMeasurement)
class TyreMeasurementAdmin(admin.ModelAdmin):
    list_display = ('id', 'car', 'timestamp', 'position',)
    list_filter = ('car', 'position',)
    search_fields = ('car',)
    ordering = ('car', '-timestamp',)
