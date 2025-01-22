from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'start', 'type')
    list_filter = ('start', 'type')
    search_fields = ('patient__name',)
