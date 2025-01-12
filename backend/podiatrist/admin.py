from django.contrib import admin
from .models import Podiatrist

@admin.register(Podiatrist)
class PodiatristAdmin(admin.ModelAdmin):
    list_display = ('username', 'full_name', 'email', 'office')
    search_fields = ('username', 'full_name', 'email')
