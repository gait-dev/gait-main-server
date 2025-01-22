from django.db import models
from patient.models import Patient

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField()
    type = models.CharField(max_length=100)

    def __str__(self):
        return f"Appointment with {self.patient.name} on {self.start}"
