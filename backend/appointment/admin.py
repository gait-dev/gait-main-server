from django.contrib import admin
from .models import Appointment, AppointmentType

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'start', 'end', 'type', 'description')
    list_filter = ('start', 'type')
    search_fields = ('patient__name',)


@admin.register(AppointmentType)
class AppointmentTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'color')
    list_filter = ('name', 'description')
    search_fields = ('neme',)