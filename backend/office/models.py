from django.db import models

class Office(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    logo = models.ImageField(upload_to='office_logos/', blank=True, null=True)

    def __str__(self):
        return self.name
