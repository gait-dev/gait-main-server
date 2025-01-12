from django.contrib import admin
from .models import Patient

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'podiatrist')
    search_fields = ('name', 'email')
    list_filter = ('podiatrist',)
