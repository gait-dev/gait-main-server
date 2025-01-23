from django.db import models
from patient.models import Patient

class AppointmentType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=7)  # Hexadecimal color code, e.g., #FFFFFF

    def __str__(self):
        return self.name
    
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField(null=True, blank=True)
    type = models.ForeignKey(AppointmentType, on_delete=models.CASCADE, related_name='type')

    def __str__(self):
        return f"Appointment with {self.patient.name} on {self.start}"

