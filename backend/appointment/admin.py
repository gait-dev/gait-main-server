from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date', 'type')
    list_filter = ('date', 'type')
    search_fields = ('patient__name',)
