from django.db import models
from podiatrist.models import Podiatrist

class Patient(models.Model):
    name = models.CharField(max_length=150)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    podiatrist = models.ForeignKey(Podiatrist, on_delete=models.CASCADE, related_name='patients')

    def __str__(self):
        return self.name
