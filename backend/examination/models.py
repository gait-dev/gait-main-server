from django.db import models
from appointment.models import Appointment
from patient.models import Patient

class Examination(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.SET_NULL, null=True, blank=True, related_name='examination')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='examinations')
    start = models.DateTimeField(null=True, blank=True)
    end = models.DateTimeField(null=True, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"Examination for {self.patient.name} on {self.start}"

class ExaminationStep(models.Model):
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE, related_name='steps')
    step_description = models.TextField()

    def __str__(self):
        return f"Step for Examination {self.examination.id}"