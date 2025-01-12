from django.contrib import admin
from .models import Office

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ('name', 'address')  # Affiche le nom et l'adresse
