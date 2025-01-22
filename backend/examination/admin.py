from django.contrib import admin
from .models import Examination, ExaminationStep

@admin.register(Examination)
class ExaminationAdmin(admin.ModelAdmin):
    list_display = ('patient', 'start', 'description')

@admin.register(ExaminationStep)
class ExaminationStepAdmin(admin.ModelAdmin):
    list_display = ('examination', 'step_description')
