from django.db import models
from django.contrib.auth.models import AbstractUser
from office.models import Office

class Podiatrist(AbstractUser):
    email = models.EmailField(unique=True)  # Champ email unique
    full_name = models.CharField(max_length=255)
    office = models.ForeignKey(Office, on_delete=models.CASCADE, related_name='podiatrists', null=True)

    USERNAME_FIELD = 'email'  # Utiliser l'email comme identifiant
    REQUIRED_FIELDS = ['username']  # Les autres champs requis lors de la création d'un superutilisateur


    def __str__(self):
        return self.email